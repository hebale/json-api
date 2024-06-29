const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CopyPligin = require("copy-webpack-plugin");
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const webpackConfig = (() => {
  dotenv.config({ path: path.join(process.cwd(), '.env') });

  return {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
      filename: './assets/script.min.js',
      path: path.join(process.cwd(), './public'),
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss'],
      alias: {
        '~': path.resolve(__dirname, '../../src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?/,
          loader: 'esbuild-loader',
          options: {
            target: 'es2015',
          },
        },
        {
          test: /\.s[ac]ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../../',
              },
            },
            'css-loader',
            'sass-loader',
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env),
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(process.cwd(), './index.html'),
        minify: false,
      }),
      new MiniCssExtractPlugin({ filename: './assets/style.min.css' }),
      // new CopyPligin({
      //   patterns: [
      //     { from: "./src/server", to: "./server" },
      //     { from: "./src/server.js", to: "./" },
      //   ],
      // }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: 'bundle-repost.html',
        openAnalyzer: false,
        excludeAssets: [/node_modules/],
      }),
    ],
  };
})();

module.exports = webpackConfig;
