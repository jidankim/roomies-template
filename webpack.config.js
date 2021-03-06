var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        'babel-polyfill',
        './src/index.js',
    ],

    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loaders: ['babel-loader?' + JSON.stringify({
                    cacheDirectory: true,
                    presets: ['es2015', 'react', 'stage-2']
                })],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },

//    plugins: [
//        new webpack.DefinePlugin({
//            'process.env': {
//                'NODE_ENV': JSON.stringify('production')
//            }
//        }),
//        new webpack.optimize.UglifyJsPlugin({
//            compress: {
//                warnings: true
//            }
//        })
//    ],
    
    resolve: {
        modules: [path.resolve(__dirname, "src"), "node_modules"]
    }
};
