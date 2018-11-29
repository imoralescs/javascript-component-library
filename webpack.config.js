const path = require('path');
const fs = require('fs');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const MODE = 'development';

const systemjs = {
    parser: { system: false },
};

const pug = {
    test: /\.pug$/,
    use:[{
        loader: 'html-loader',
        options: {
            minimize: false,
            removeComments: false,
            collapseWhitespace: false
        }
    },
    {
        loader: 'pug-html-loader'
    }]
};

const sass = {
    test: /\.scss/,
    use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
            loader: 'css-loader',
            options: {
                url: false,
            },
        },
        {
            loader: 'sass-loader',
            options: {},
        }],
    }),
};

const babel = {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader',
    },
};

const eslint = {
    test: /\.js$/,
    exclude: /node_modules/,
    use: 'eslint-loader',
};

// Generate list of
const jsList = fs
    .readdirSync(path.resolve(__dirname, 'src/js'))
    .filter(fileName => fileName.endsWith('.js'));

const jsListObject = jsList.map((js) => {
    const temp = js.split('.').slice(0, -1).join('.');
    const tempObj = {};
    tempObj[temp] = `./src/js/${js}`;
    return tempObj;
});

const entries = Object.assign(...jsListObject);

// Generate list page of HtmlWebpackPlugin
const pages = fs
    .readdirSync(path.resolve(__dirname, 'src/pug'))
    .filter(fileName => fileName.endsWith('.pug'));

const config = {
    mode: MODE,
    entry: entries,
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [systemjs, pug, sass, babel, eslint],
    },
    plugins: [
        ...pages.map((page) => {
            const temp = page.split('.').slice(0, -1).join('.');
            return new HtmlWebpackPlugin({
                filename: `../${temp}.html`,
                template: `src/pug/${page}`,
                inject: false,
                minify: false
            });
        }),
        new ExtractTextPlugin('../css/style.css'),
        new CleanWebpackPlugin(['dist']),
    ],
};

module.exports = config;
