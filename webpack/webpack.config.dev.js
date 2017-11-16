const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
    inject: 'body'
})

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'index_bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: [path.resolve(__dirname, '../src'), path.resolve(__dirname)],
                use: 'babel-loader',
            },
            {
                test: /\.s?css$/,
                loaders: [
                    'style-loader',
                    'css-loader?sourceMap',
                    'resolve-url-loader',
                    'postcss-loader?sourceMap',
                    'sass-loader?sourceMap',
                ],
            },
            {
                test: /\.(eot|ttf|woff|woff2|otf)$/,
                loader: 'base64-font-loader',
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader?limit=10000',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '***REMOVED*** — Beyond the Numbers',
            template: 'webpack/template.html',
            inject: false,
        }),
        HtmlWebpackPluginConfig
    ]
}
