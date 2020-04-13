const merge = require("webpack-merge");
const webpack = require("webpack");
const common = require("./webpack.config");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
    mode: "production",
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production"),
            },
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.prod.html",
            filename: "index.html"
        }),
    ]
});
