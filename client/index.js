require('dotenv').config();
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const config = require('./webpack.config');

const { devServer } = config || {};

// Start webapp server
new WebpackDevServer(webpack(config), devServer).listen(devServer.port, '0.0.0.0', (err) => {
	if (err) {
		console.log(err);
	}

	console.log(`Webpack dev server is listening at localhost:${devServer.port}`);
});

