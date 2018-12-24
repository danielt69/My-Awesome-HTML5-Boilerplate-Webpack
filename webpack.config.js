const webpack = require('webpack');
const glob = require('glob');
const path = require('path');
const fetch = require('unfetch');

const config = {
    devtool: 'source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist')
    },
    entry: { 'affirmative_consent_notice' : glob.sync('./src/**/*.js*') },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].min.js',
        sourceMapFilename: '[name].map'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    "file-loader",
                    "extract-loader",
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')({
                                    'browsers': ['> 1%', 'last 2 versions', 'ie >= 11']
                                })
                            ]    
                        }
                    }
                ],
                include: [path.resolve(__dirname, "src") ],
                exclude: [path.resolve(__dirname, "node_modules") ]
            }
            ,
            // Babel loader compiles ES2015 into ES5 for
            // complete cross-browser support
            {
                loader: 'babel-loader',
                test: /\.js$/,
                // only include files present in the `src` subdirectory
                include: [path.resolve(__dirname, "src") ],
                // exclude node_modules, equivalent to the above line
                exclude: [path.resolve(__dirname, "node_modules") ],
                query: {
                    // Use the default ES2015 preset
                    // to include all ES2015 features
                    presets: [
                        ["@babel/preset-env", {
                            "targets": {
                                "browsers": ["last 2 versions", "ie >= 11"]
                            }
                        }]
                    ],
                    plugins: ['@babel/plugin-transform-runtime']
                }
            }
        ]
    }
}

module.exports = config;