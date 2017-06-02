const webpack = require('webpack');
const path = require('path');

const sourcePath = path.join(__dirname);

module.exports = function (env) {
    const nodeEnv = env && env.prod ? 'production' : 'development';
    const isProd = nodeEnv === 'production';

    const plugins = [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
            filename: 'vendor-bundle.js'
        }),
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: JSON.stringify(nodeEnv)}
        }),
        new webpack.NamedModulesPlugin()
    ];

    if (isProd) {
        plugins.push(
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: isProd,
                compress: {
                    warnings: false,
                    screw_ie8: true,
                    conditionals: true,
                    unused: true,
                    comparisons: true,
                    sequences: true,
                    dead_code: true,
                    evaluate: true,
                    if_return: true,
                    join_vars: true
                },
                output: {
                    comments: false
                }
            })
        );
    }

    return {
        devtool: isProd ? 'source-map' : 'eval',
        context: sourcePath,
        entry: {
            js: './index.js'
        },
        output: {
            filename: 'browser-bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.html$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'file-loader',
                        query: {
                            name: '[name].[ext]'
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader'
                    ]
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: [
                        'babel-loader'
                    ]
                }
            ]
        },

        resolve: {
            extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],

            modules: [
                path.resolve(__dirname, 'node_modules'),
                sourcePath
            ],

            alias: {
                Common: path.resolve(__dirname, 'common/'),
            },
        },

        plugins,

        performance: isProd && {
            maxAssetSize: 100,
            maxEntrypointSize: 300,
            hints: 'warning'
        },

        stats: {
            colors: {
                green: '\u001b[32m'
            }
        }
    }
};