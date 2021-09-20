const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { ApolloGateway, RemoteGraphQLDataSource } = require("@apollo/gateway");
const mongoose = require('mongoose');
const { json } = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const config = require('./config');

const PORT = process.env.PORT || 3000;

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


const gateway = new ApolloGateway({
	serviceList: [{ name: "users", url: "http://localhost:3001/graphql" }],
	buildService({ name, url }) {
		console.log('url ', url);
		return new RemoteGraphQLDataSource({
			url,
			willSendRequest({ request, context }) {
				request.http.headers.set(
					"authorization",
					context.token ? context.token : null
				);
			}
		});
	}
});

const server = new ApolloServer({
	gateway,
	subscriptions: false,
	context: ({ req }) => {
		const user = req.user || null;
		return { token: req.headers.authorization };
	}
});

const app = express();

// cors
app.use(cors({ credentials: true }));

// parsers
app.use(cookieParser());
app.use(json());


server.applyMiddleware({ app });

const listeningServer = require('http').createServer(app);

listeningServer.listen({ port: PORT }, () =>
	console.log(`🚀 Server ready at http://localhost:${PORT}`)
);
