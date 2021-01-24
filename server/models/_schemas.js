const fs = require('fs');
const path = require('path');
const files = fs.readdirSync(path.join(__dirname, '../models'));

const typeDefs = [];
let resolvers = {
	Query: {},
	Mutation: {}
};

files.forEach(file => {
	if (file !== 'schemas.js') {
		const schema = require(`../models/${file}`);
		typeDefs.push(schema.typeDef);
		resolvers.Query = {
			...resolvers.Query,
			...schema.query
		};
		resolvers.Mutation = {
			...resolvers.Mutation,
			...schema.mutation
		};
		resolvers = {
			...resolvers,
			...schema.typeResolver
		};
	}
});

exports = module.exports = {
	typeDefs: typeDefs.join('\n'),
	resolvers
};
