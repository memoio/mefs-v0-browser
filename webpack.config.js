let root = __dirname,
ExtractTextPlugin = require('extract-text-webpack-plugin'),
OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

/*
 编译scss
 合并js
 处理html中的ssi
 压缩html js css
*/
module.exports = {
  // 入口文件
  entry: root  + '/app.js',
  output: {
    // 打包后文件存放的地方
    path: root + '/dist',
    // 打包后输出文件的文件名
    filename: 'js/index.js',
  },
  module:{
    rules: [
      // 编译scss
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader','sass-loader']
        })
      },
      // 处理SSI
      {
        test: /\.html$/,
        use: [{
          loader:`${root}/src/webpack/loader/ssi-loader/index.js`,
          options:{
            root:`${root}/src/`,
            out:`${root}/dist/index.html`,
          },
        }],
      }
    ]
  },
  plugins: [
    // 导出css
    new ExtractTextPlugin({
      filename:'css/index.css',
    }),
    // 压缩css
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
      canPrint: true
    }),
  ],
}