const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    target: 'node',
    entry: './src/server.ts',
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, './dist/production'),
        clean: {
            dry: true, // hiển thị những file sẽ xoá thay vì xoá nó
            // keep: /\.css/
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$|\.ts?$|\.js?$/,
                use: 'ts-loader',
                exclude: ['/node_modules/']
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                '**/*', // mặc định là '**/*'
                path.join(process.cwd(), 'build/**/*')
            ]
        }),
    ],
    optimization: {
        minimize: true
    },
}