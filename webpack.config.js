var webpack = require("webpack");

var PROD = process.env.NODE_ENV || false;
console.log("process.env.NODE_ENV: ", process.env.NODE_ENV);

module.exports = {
    context: __dirname + "/public",
    entry: {
        app: "./javascripts/app/app.module.js"
    },
    output: {
        path: __dirname + "/public/javascripts",
        filename: PROD ? "app.min.js" : "app.js"
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        })

    ]
};