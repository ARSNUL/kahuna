const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
				exclude: /node_modules/,
            },
            {
                test: /\.scss/,
                loaders: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.css/,
                loaders: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader?limit=10000',
            },
        ],
    },
	resolve: {
		extensions: ['.js', '.jsx'],
	},
    plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({ template: './public/index.html' }),
    ],
};
