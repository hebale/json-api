const webpack = require("webpack");
const path = require("path");
const dotenv = require("dotenv");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

dotenv.config({ path: path.join(__dirname, "../..", ".env") });

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "./assets/script.min.js",
    path: path.join(__dirname, "./public"),
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".scss"],
    alias: {
      "~": path.join(__dirname, "./src"),
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
  devServer: {
    host: "localhost",
    port: 8080,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
    new HtmlWebpackPlugin({ template: "./index.html" }),
    new MiniCssExtractPlugin({ filename: "./assets/style.min.css" }),
    new ModuleFederationPlugin({
      name: "mainApp",
      remotes: {
        listApp: "listApp@http://localhost:8082/remoteEntry.js",
        formApp: "formApp@http://localhost:8083/remoteEntry.js",
      },
    }),
    // new MonacoWebpackPlugin(),
  ],
};
