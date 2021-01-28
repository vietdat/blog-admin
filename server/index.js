const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { buildFederatedSchema } = require('@apollo/federation');
const {
	GraphQLDate,
	GraphQLTime,
	GraphQLDateTime,
} = require('graphql-iso-date');
const GraphQLJSON = require('graphql-type-json');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { json } = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const schemas = require('./models/_schemas');
const config = require('./config');

const PORT = process.env.PORT || 3001;

mongoose
	.connect(config.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Connect to MongoDB @', config.MONGO_URI, ' successfully.');
	})
	.catch((err) => {
		console.log(err);
	});

// Construct a schema, using GraphQL schema language
const typeDefs = gql(
	`
		scalar Date
		scalar Time
		scalar DateTime
		scalar JSON

		type Query {
			_: Boolean
			constants: JSON
		}

		type Mutation {
			_: Boolean
		}

		${schemas.typeDefs}
	`
);

// Provide resolver functions for your schema fields
const resolvers = {
	...schemas.resolvers,
	Date: GraphQLDate,
	Time: GraphQLTime,
	DateTime: GraphQLDateTime,
	JSON: GraphQLJSON,
};

const server = new ApolloServer({
	schema: buildFederatedSchema([{ typeDefs, resolvers }]),
	context: async ({ req }) => {
		let result = {
			user: null,
		};
		if (req.headers && req.headers.authorization) {
			try {
				const token = req.headers.authorization.replace('Bearer ', '');
				const data = jwt.verify(token, config.secretKey);
				result.user = data;
			} catch (error) {
				console.log(error);
			}
		}

		return result;
	},
});

const app = express();

// cors
app.use(cors({ credentials: true }));

// parsers
app.use(cookieParser());
app.use(json());

// middlewares loading
const middlewares = fs.readdirSync(path.join(__dirname, './middleware'));
middlewares.forEach((file) => {
	const middleware = require(`./middleware/${file}`);
	middleware(app);
});

server.applyMiddleware({ app });

const listeningServer = require('http').createServer(app);

listeningServer.listen({ port: PORT }, () =>
	console.log(`🚀 Server ready at http://localhost:${PORT}`)
);
