var path = require("path");
var webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin')//this plugin helps to create the html files with the script chunks
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin')  //use this plugin to minify and mangle scripts for production grade build

var basePath = __dirname;

module.exports = {
    entry: {
        vendor: ["jquery", "bootstrap", "bootstrap/dist/css/bootstrap.css", "font-awesome/css/font-awesome.css", "./src/style.css"],
        app: "./src/bootstrapper.js"
    },
    output: {
        path: path.join(basePath, "build"),
        filename: "bundle.js"
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js",'.jsx']
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: ["env", "react"]
                }
            },
            {
                test: /\.jsx$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                // query: {
                //     presets: ["env", "react"] // this is needed only if there is no .babelrc
                // }
            },
            {
                test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
                use: [{
                    loader: "file-loader"
                }]
            },
            {
                test: /\.css$/,
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { minimize: true } }
                    ]
                }))
            }
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new ExtractTextPlugin('styles.bundle.css'),
        new webpack.ProgressPlugin(),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new HtmlWebpackPlugin({
            filename: "index.html", //Name of file in ./dist
            template: "index.html", //Name of template in ./src
            favicon: "favicon.ico",
            hash: true,
            inject: 'body'
        }),
        // new UglifyJsPlugin({ //use this plugin to minify and mangle scripts for production grade build
        //     uglifyOptions: {
        //         minimize:true,
        //         mangle: true,
        //         output: {
        //             comments: false
        //         }
        //     },
        //     sourceMap: true,
        //     exclude: [/\.min\.js$/gi]

        // })
    ]
};
