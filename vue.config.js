module.exports = {
    devServer: {
        proxy: 'http://metropolitano.atspace.cc'
    },
    css: {
        extract: {
            filename: "[name].css",
            chunkFilename: "css/[name].css",
        },
    },
    publicPath: './'
};