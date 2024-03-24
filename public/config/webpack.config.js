"use strict";
var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CopyPligin = require("copy-webpack-plugin");
var BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
module.exports = {
    mode: "development",
    entry: "./src/index.tsx",
    output: {
        filename: "./assets/script.min.js",
        path: path.join(process.cwd(), "./public"),
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".scss"],
        alias: {
            "~": path.resolve(__dirname, "../../src"),
        },
    },
    module: {
        rules: [
            {
                test: /\.[jt]sx?/,
                loader: "esbuild-loader",
                options: {
                    target: "es2015",
                },
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "../../",
                        },
                    },
                    "css-loader",
                    "sass-loader",
                ],
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(process.env),
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(process.cwd(), "./index.html"),
            minify: false,
        }),
        new MiniCssExtractPlugin({ filename: "./assets/style.min.css" }),
        // new CopyPligin({
        //   patterns: [
        //     { from: "./src/server", to: "./server" },
        //     { from: "./src/server.js", to: "./" },
        //   ],
        // }),
        new BundleAnalyzerPlugin({
            analyzerMode: "static",
            reportFilename: "bundle-repost.html",
            openAnalyzer: false,
            excludeAssets: [/node_modules/],
        }),
    ],
};
