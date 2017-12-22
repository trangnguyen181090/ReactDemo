// var config = {
//     entry: './main.js',
//     output: {
//         path: '/',
//         filename: 'index.js',
//     },
//     devServer: {
//         inline: true,
//         port: 8080
//     },
//     module: {
//         loaders: [{
//             test: /\.jsx?$/,
//             exclude: /node_modules/,
//             loader: 'babel-loader',
//             query: {
//                 presets: ['es2015', 'react']
//             }
//         }]
//     }
// }
// module.exports = config;


var path = require('path');

var DIST_PATH = path.resolve(__dirname, 'dist');
var SOURCE_PATH = path.resolve(__dirname, 'src');

module.exports = {
    entry: './main.js',
    output: {
        path: DIST_PATH,
        filename: 'app.dist.js',
        publicPath: '/app/'
    },
    devServer: {
        inline: true,
        port: 8080
    },
    module: {
        loaders: [{
            test: /.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: [
                    'es2015',
                    'react'

                ]
            }
        }]
    }
};