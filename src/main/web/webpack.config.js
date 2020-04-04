const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MakeDirWebpackPlugin = require('make-dir-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CopyPkgJsonPlugin = require("copy-pkg-json-webpack-plugin");

module.exports = {
    context: path.resolve(__dirname, '.'),
    entry : {
        index : './js/index.js',
        login : './js/login.js',
        admin : './js/admin.js'
    },
    output: {
        path: path.resolve(__dirname, '../resources/static'),
        publicPath: "./",
        filename: "js/[name].js"
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"]
    },
    mode: "development",
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
        ]
    },
    plugins: [
        /*new HtmlWebpackPlugin({
            title: "Truth Or Drink",
            template: "assets/index.html",
            chunks:  ['index'],
            inject: 'head'
        }),
        new HtmlWebpackPlugin({
            title: "MAGMAMEMORIA",
            template: "assets/magmamemoria.html",
            filename: "magmamemoria.html",
            chunks:  ['magma'],
            inject: 'head'
        }),*/
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
            // In case you imported plugins individually, you must also require them here:
            Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
            Toast: "exports-loader?Toast!bootstrap/js/dist/toast",
            Button: "exports-loader?Button!bootstrap/js/dist/button",
            Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
            Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
            Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
            Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
            Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
            Scrollspy: "exports-loader?Scrollspy!bootstrap/js/diost/scrollspy",
            Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
            Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
            // common: "common"
        }),
        new MiniCssExtractPlugin({
            filename : 'css/[name].css'
        }),
        new CopyWebpackPlugin([
            {
                from: 'fonts',
                to: 'fonts',
            }
        ]),
/*        new CopyPkgJsonPlugin({
            remove: ['devDependencies'],
        })*/
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
                    minChunks: 3,
                },
                css: {
                    test: /\.s?css$/,
                    name: "common",
                    chunks: "all",
                    minChunks: 3,
                },
            }
        }
    }
};
