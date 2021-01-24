const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');

const Composer = require('../helpers/composer');
const { emailFormat } = require('../helpers/constants');
const { AddCreatedAt } = require('./mixins');
const config = require('../config');

const { Types } = mongoose.Schema;

// mongoose schema definition
const userSchema = new mongoose.Schema({
	email: {
		type: String,
		trim: true,
		required: true,
		minlength: 1,
		match: emailFormat,
	},
	password: { type: String, required: true, minlength: 1 },
	firstName: { type: String, trim: true, required: true, minlength: 1 },
	lastName: { type: String, trim: true, required: true, minlength: 1 },
	hearFrom: { type: String, trim: true },
	token: { type: String },
});

// Create Composer
const composer = new Composer('user', userSchema);

// mixins
AddCreatedAt(composer);

composer.addCustomMutations({
	signUp: {
		type: 'User',
		args: {
			input: 'UserInput!',
		},
		resolver: async (parent, args, ctx) => {
			const { input } = args;
			if (!input) {
				return Error('Input is required');
			}

			const { email, password, firstName, lastName, hearFrom } = input;
			if (!email || !password || !firstName || !lastName) {
				return Error('Input is required');
			}

			// finding exist user
			let user = await composer.model.findOne({ email: email });
			if (user) {
				return Error('Email has already been registered.');
			}

			// hashedPassword
			const hashedPassword = await argon2.hash(password);

			try {
				user = await composer.model.create({
					email,
					password: hashedPassword,
					firstName: firstName,
					lastName: lastName,
					hearFrom: hearFrom
				});
			} catch (error) {
				console.log(error);
				return Error('Something wrong. Please try again!');
			}

			const token = user.generateAuthToken();
			user.token = token;
			return user;
		},
	},
});

// schema methods
composer.schema.methods.generateAuthToken = function (expiresIn) {
	const options = {};
	if (expiresIn) {
		options.expiresIn = expiresIn;
	}
	const token = jwt.sign(
		{
			_id: this._id,
			firstName: this.firstName,
			email: this.email,
			companyId: this.companyId,
		},
		config.secretKey,
		options
	);
	return token;
};

composer.beforeFindById.use(async (args, ctx) => {
	if (args.id === 'me') {
		if (ctx.user && ctx.user._id) {
			args.id = ctx.user._id;
		} else {
			args.id = null;
		}
	}
});

composer.afterFindById

// parsing mongoose schema to graphql schema
const graphqlSchema = composer.generateGraphqlSchema('User', {
	id: '_user',
	one: 'user',
	many: 'users',
});

exports = module.exports = graphqlSchema;
