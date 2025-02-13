const path = require("path")
const webpack = require("webpack")
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
     entry: './src/client/index.js',
     mode: 'production',
     output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'var',
        library: 'Client'
    },
    optimization: {
        minimizer: [new TerserPlugin({}), new CssMinimizerPlugin({})],
        },
     module: {
        rules: [
                {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
                },
                {
                    test: /\.scss$/,
                    use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
    }
        ]
},
plugins: [
    new HtmlWebPackPlugin({
        template: "./src/client/views/index.html",
        filename: "./index.html",
    }),
    new MiniCssExtractPlugin({ filename: "[name].css" }),
    new WorkboxPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true
    })
    
]

}