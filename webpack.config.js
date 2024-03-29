const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const IgnoreNotFoundExportPlugin = require("ignore-not-found-export-webpack-plugin")

module.exports = {
    mode: "development",
    entry: "./src/index.tsx",
    devtool: "inline-source-map",
    devServer: {
        static: {
            directory: "dist",
            watch: true,
        },
    },
    watchOptions: {
        ignored: ["node_modules", "spec"],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".scss", ".js", ".json"],
    },
    output: {
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "RTT app",
            meta: {viewport: "width=device-width, height=device-height, initial-scale=1, maximum-scale=1"},
        }),
        new IgnoreNotFoundExportPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.[tj]sx?$/,
                loader: "ts-loader",
                options: {
                    compilerOptions: {
                        module: "esnext",
                    },
                    transpileOnly: true,
                },
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
                exclude: /node_modules/,
            }
        ],
    },
}
