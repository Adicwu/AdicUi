const path = require('path');
const resolve = dir => path.join(__dirname, dir);
module.exports = {
    pages: {
        index: {
            entry: 'examples/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        }
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@src', resolve('./src'))
            .set('@theme', resolve('./packages/ThemeChalk/src'))
            .set('@packages', resolve('./packages'))
        // 	.set('static', resolve('./src/assets'))
        // 	.set('comps', resolve('./src/components'));
        config.module
            .rule('js')
            .include
            .add(resolve('packages'))
            .end()
            .use('babel')
            .loader('babel-loader')
            .tap(options => options)
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                // 全局变量路径，不能使用路径别名
                path.resolve(__dirname, 'packages/ThemeChalk/src/base.less')
            ]
        }
    }
}