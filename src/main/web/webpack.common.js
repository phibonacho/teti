const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {VueLoaderPlugin} = require("vue-loader");

module.exports = {
    context: path.resolve(__dirname, '.'),
    entry : {
        index : './js/index.js',
        login : './js/login.js',
        admin : './js/admin.js',
        admin_detail : './js/admin_detail.js',
        invoice_subjects : './js/invoice_subjects.js'
    },
    output: {
        path: path.resolve(__dirname, '../resources/static'),
        publicPath: "./",
        filename: "js/[name].js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".vue"],
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        presets: [["@babel/preset-env", {modules: false}]],
                        plugins: ["@babel/plugin-syntax-dynamic-import"],
                    }
                }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            // compilazione dei scss, immagini e font:
            {
                test: /_component\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [':data-src']
                    }
                }
            },
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url : (url)=> url.match(/\.(woff|woff2|eot|ttf|otf)$/),
                            importLoaders: 2,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')(),
                            ],
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'img/[name].[ext]'
                    }
                }
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[ext]'
                    }
                }
            },
            { // VUE-LOADER: new rule in module section for VUE module
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new webpack.ProvidePlugin({
            Vue : 'vue',
            Popper: ['popper.js', 'default'],
            // In case you imported plugins individually, you must also require them here:
        }),
        new MiniCssExtractPlugin({
            filename : 'css/[name].css'
        }),
        new CopyWebpackPlugin([
            {
                from: 'img',
                to: 'img',
            },
            {
                from : 'img/teti_favicon.ico',
                to : 'favicon.ico'
            }
        ]),
    ],
    stats : true,
    optimization: {
        splitChunks: {
            minSize: 1,
            cacheGroups: {
                js: {
                    test: /\.js$/,
                    name: "common",
                    chunks: "all",
                    minChunks: 2,
                },
                css: {
                    test: /\.s?css$/,
                    name: "common",
                    chunks: "all",
                    minChunks: 2,
                },
            }
        }
    }
};
