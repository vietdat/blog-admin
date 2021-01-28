const mongoose = require('mongoose');
const Middleware = require('./middleware');
const { capitalize } = require('./utils');
const { UserInputError } = require('apollo-server-express');

class Composer {
	constructor(modelName, schema) {
		this._modelName = modelName;
		this._schema = schema;
		this._extendFields = {};
		this._customQueries = {};
		this._customMutations = {};
		this.beforeFindById = new Middleware();
		this.afterFindById = new Middleware();
		this.afterCreateOne = new Middleware();
	}

	static get typeMapping() {
		return {
			String: 'String',
			ObjectID: 'ID',
			Date: 'DateTime',
			Number: 'Float',
			Mixed: 'JSON',
		};
	}

	static _mongooseSchemaToGraphQlType(schema, isInput = false, fields = []) {
		const paths = schema.paths;
		const result = Object.keys(paths).reduce((prev, key) => {
			// ignore _id if input
			if (
				key === '__v' ||
				(isInput && key.charAt(0) === '_') ||
				fields.includes(key)
			) {
				return prev;
			}

			const value = paths[key];
			const type = value.instance;
			let newType = Composer.typeMapping[type];
			if (type === 'Array') {
				const casterType = Composer.typeMapping[value.caster.instance];
				newType = `[${casterType}]`;
			}
			const rs = `${key}: ${newType || type}\n`;

			return prev + rs;
		}, '');

		return result;
	}

	_addExtendFieldsToGraphQlType() {
		let rs = '';
		const fields = Object.keys(this._extendFields);
		if (fields && fields.length) {
			fields.forEach((field) => {
				const type = this._extendFields[field].type;
				const newType = Composer.typeMapping[type];
				rs += `${field}: ${newType || type}\n`;
			});
		}
		return rs;
	}

	_generateInput(input) {
		let rs = '';
		const args = Object.keys(input);
		if (args) {
			rs = args.map((key) => `${key}: ${input[key]}`).join(', ');
		}
		return `(${rs})`;
	}

	_addCustomMutationsToGraphQlMutation() {
		let rs = '';
		const mutations = Object.keys(this._customMutations);
		if (mutations && mutations.length) {
			mutations.forEach((key) => {
				const mutation = this._customMutations[key];
				const type = mutation.type;
				const newType = Composer.typeMapping[type];
				rs += `${key}${this._generateInput(mutation.args)}: ${
					newType || type
				}\n`;
			});
		}
		return rs;
	}

	_addCustomQueriesToGraphQlQuery() {
		let rs = '';
		const queries = Object.keys(this._customQueries);
		if (queries && queries.length) {
			queries.forEach((key) => {
				const query = this._customQueries[key];
				const type = query.type;
				const newType = Composer.typeMapping[type];
				rs += `${key}${this._generateInput(query.args)}: ${newType || type}\n`;
			});
		}
		return rs;
	}

	addFields(fields) {
		this._extendFields = { ...this._extendFields, ...fields };
	}

	addCustomQueries(queries) {
		this._customQueries = {
			...(this._customQueries || {}),
			...queries,
		};
	}

	addCustomMutations(mutations) {
		this._customMutations = {
			...(this._customMutations || {}),
			...mutations,
		};
	}

	get schema() {
		return this._schema;
	}

	get model() {
		return this._model;
	}

	generateGraphqlSchema(schemaName, config) {
		this._model = mongoose.model(this._modelName, this._schema);

		const { id, one, many } = config;
		const typeDef = `
			type ${schemaName} {
				${Composer._mongooseSchemaToGraphQlType(
					this._schema,
					false,
					Object.keys(this._extendFields || {})
				)}
				${this._addExtendFieldsToGraphQlType()}
			}

			input ${schemaName}Input {
				${Composer._mongooseSchemaToGraphQlType(this._schema, true)}
			}

			extend type Query {
				${id}(id: ID): ${schemaName}
				${one}: ${schemaName}
				${many}: [${schemaName}!]!
				count${capitalize(many)}(filter: JSON, sort: JSON): Float!
				${this._addCustomQueriesToGraphQlQuery()}
			}

			extend type Mutation {
				create${capitalize(one)}(input: ${schemaName}Input): ${schemaName}
				${this._addCustomMutationsToGraphQlMutation()}
			}
		`;

		const query = {
			[id]: async (obj, args, ctx) => {
				await this.beforeFindById.go(args, ctx);
				const filter = {
					_id: args.id,
					...(args.filter || {}),
				};

				const doc = await this._model.findOne(filter);
				const result = {
					doc,
					ctx,
					args,
				};
				await this.afterFindById.go(result);

				return result.doc;
			},
			[one]: async (obj, args, ctx) => {
				// await this.beforeFindOne.go(args, ctx);
				const filter = args.filter || {};
				const sort = args.sort || {};

				const doc = await this._model.findOne(filter, null, { sort });
				const result = {
					doc,
					ctx,
					args,
				};
				// await this.afterFindOne.go(result);

				return result.doc;
			},
			[many]: async (obj, args, ctx) => {
				const filter = args.filter || {};
				const sort = args.sort || {};
				const limit = args.limit;
				let docs = await this._model.find(filter, null, { sort, limit });
				let result = {
					docs,
					ctx,
					args,
				};

				return result.docs;
			},
			[`count${capitalize(many)}`]: async (obj, args) => {
				const filter = args.filter || {};
				return await this._model.countDocuments(filter);
			},
		};

		const mutation = {
			[`create${capitalize(one)}`]: async (parent, args, ctx) => {
				const { input } = args;

				try {
					const newItem = new this._model(input, false);
					await newItem.save();

					await this.afterCreateOne.go(newItem, args, ctx);
					return newItem;
				} catch (error) {
					console.log(error);
					throw new UserInputError(error.message);
				}
			},
		};

		const queries = Object.keys(this._customQueries);
		if (queries && queries.length) {
			queries.forEach((key) => {
				if (!mutation[key]) {
					query[key] = this._customQueries[key].resolver;
				}
			});
		}

		const mutations = Object.keys(this._customMutations);
		if (mutations && mutations.length) {
			mutations.forEach((key) => {
				if (!mutation[key]) {
					mutation[key] = this._customMutations[key].resolver;
				}
			});
		}

		const typeResolver = {};
		const fields = Object.keys(this._extendFields);
		if (fields && fields.length) {
			typeResolver[`${schemaName}`] = {};
			fields.forEach((field) => {
				typeResolver[`${schemaName}`] = {
					...typeResolver[`${schemaName}`],
					[field]: this._extendFields[field].resolver,
				};
			});
		}

		return {
			typeDef,
			query,
			mutation,
			typeResolver,
			model: this._model,
		};
	}
}

module.exports = exports = Composer;
