const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CopyPligin = require("copy-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

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
      "@Components": path.resolve(__dirname, "../components"),
      "@Contexts": path.resolve(__dirname, "../contexts"),
      "@Layout": path.resolve(__dirname, "../layout"),
      "@Hooks": path.resolve(__dirname, "../hooks"),
      "@Assets": path.resolve(__dirname, "../Assets"),
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
