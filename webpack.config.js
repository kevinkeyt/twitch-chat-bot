const path = require('path');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');

const { NODE_ENV = 'production'} = process.env;

module.exports = {
    watch: NODE_ENV === 'development',
    entry: './src/server/index.ts',
    mode: NODE_ENV,
    target: 'node',
    plugins: [
        new WebpackShellPlugin({
          onBuildEnd: ['npm run run:dev']
        })
      ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    resolve: {
        extensions: ['.ts']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    'ts-loader'
                ]
            }
        ]
    },
    externals: [nodeExternals()]
}