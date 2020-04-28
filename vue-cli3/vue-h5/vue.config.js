const path = require('path');//引入path模块
function resolve(dir) {
  return path.join(__dirname, dir)//path.join(__dirname)设置绝对路径
}

module.exports = {
  runtimeCompiler: true, //引入的vue具有编译的包
  chainWebpack: config => {
    //set第一个参数：设置的别名，第二个参数：设置的路径;
    config.resolve.alias
        .set('@', resolve('./src'));
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
          .use('sass-resources-loader')
          .loader('sass-resources-loader')
          .options({
            // Provide path to the file with resources
            // resources: './path/to/resources.scss',

            // Or array of paths
            resources: ['./src/styles/vars.scss', './src/styles/mixins.scss']
          })
          .end()
    })
  }
}