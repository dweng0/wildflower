var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var TypedocWebpackPlugin = require('typedoc-webpack-plugin');
var path = require('path');

var webpack = require('webpack');
var pjson = require('./package.json');

module.exports = {
    entry: "./source/game.ts",
    output: {
        filename: "static/bundle.js",
        path: __dirname + "/lib"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
      "babylonjs": "BABYLON"
    },


      plugins: [
        new HtmlWebpackPlugin({
            "title":"WildFlower "+pjson.version,
            "template":"source/index.ejs",
            "cache": false
        }),
        new CopyWebpackPlugin([
             {from:"node_modules/babylonjs/dist/preview release/babylon.max.js", to:"vendors/babylon.js"},
             {from:"node_modules/babylonjs/dist/preview release/oimo.js", to:"vendors/oimo.js"},
            {from:"lib/static", to:"D:/old/edgroundwars/EDWars/Scripts/wildflower/static", force: true},
             {from:"assets", to:"D:/old/edgroundwars/EDWars/assets", force: true},
              
        ]),
        new TypedocWebpackPlugin({
            name: "WildFlower",
            mode: 'file',
            includeDeclarations: false,
            ignoreCompilerErrors: true,
            out: '../.documentation'
        }, ['./source'])
        ]
};