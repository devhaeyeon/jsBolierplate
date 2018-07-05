const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const uglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
    entry : './src/js/index.js',
    devServer : {
        contentBase:path.join(__dirname,'dist'),
        compress:true,
        port:7777
    },
    output : {
        path:path.join(__dirname,'/dist'),
        filename:'index.js'
    },
    module : {
        rules :[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:['babel-loader']
            },
            {
                test:/\.css$/,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:[{loader:'css-loader',
                    options: { minimize: true }}],
                    
                })
                /*use : [
                    'style-loader',
                    {   loader:'css-loader',
                        options:{importLoaders:1}
                    },
                    'postcss-loader'
                ]*/
            },
            {
                test:/\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader:'url-loader',
                options:{
                    name:'[hash].[ext]',
                    limit:10000,
                }
            }
        ]
    },
    plugins:[
       // new uglifyJsPlugin(),
        new HTMLWebpackPlugin({
            template:path.resolve(__dirname,'index.html')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({url : 'http://localhost:7777'}),
        new ExtractTextPlugin({
            filename:'app.css',
        }),
        new CopyWebpackPlugin([{from: './src/img/**', to: './img', flatten: true}])
    ]
}

module.exports = config;