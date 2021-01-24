const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const PORT = process.env.PORT || 8080;
const PRODUCTION = process.env.NODE_ENV === 'production';
const buildPath = PRODUCTION ? 'www/' : 'src/';

let optimization = {};
if (PRODUCTION) {
	optimization = {
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					chunks: 'initial',
					name: 'vendor',
					enforce: true,
				},
			},
		},
	};
}

const config = {
	devServer: {
		port: PORT,
		publicPath: '',
		hot: true,
		historyApiFallback: true,
		contentBase: 'src/',
		proxy: {
			'/graphql': 'http://localhost:3000',
			'/api': 'http://localhost:3000',
		},
		stats: 'errors-only',
	},
	entry: [path.join(__dirname, './src/scripts/index.js')],
	output: {
		filename: '[name].[hash].js',
		path: path.join(__dirname, buildPath),
		publicPath: '',
	},
	optimization,
	module: {
		rules: [
			{
				test: /\.s?css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: path.join(__dirname, buildPath, './styles'),
							hmr: process.env.NODE_ENV === 'development',
						},
					},
					{
						loader: 'css-loader',
						options: {
							url: false,
							modules: false,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: !PRODUCTION,
							plugins: () => [autoprefixer()],
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: !PRODUCTION,
						},
					},
				],
			},
			{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							cacheDirectory: true,
						},
					},
				],
				exclude: /node_modules/,
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'babel-loader',
					},
					{
						loader: '@svgr/webpack',
						options: {
							babel: false,
							icon: true,
						},
					},
				],
			},
		],
	},
	devtool: 'source-map',
	plugins: [
		new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /vi/),
		new HtmlWebPackPlugin({
			template: './src/index.html',
			filename: './index.html',
		}),
		new MiniCssExtractPlugin({
			filename: 'styles/styles-[name].css',
			chunkFilename: 'styles/styles-[id].css',
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: 'src/images', to: 'images' },
				{ from: 'src/favicon.ico' },
			],
		}),
		// new BundleAnalyzerPlugin(),
	],
	mode: process.env.NODE_ENV || 'development',
};

console.log('NODE_ENV:', process.env.NODE_ENV);

module.exports = config;
