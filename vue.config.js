const path = require('path')
const resolve = dir => path.join(__dirname, dir)
// 代码压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin')
module.exports = {
  chainWebpack: config => {
    // 修复 HMR(热更新)失效
    config.resolve.symlinks(true);
    /*
     *压缩图片
     *npm i -D image-webpack-loader
     */
    // ============压缩图片 start============
    config.module
      .rule("images")
      .use("image-webpack-loader")
      .loader("image-webpack-loader")
      .options({ bypassOnDebug: true })
      .end()
    // ============压缩图片 end============
  },

  configureWebpack: config => {
    if (process.env.NODE_ENV == 'production') {
      /**
       * 为生产环境修改配置
       */
      config.mode = 'production'
      /**
       * gzip压缩
       */
      const productionGzipExtensions = ["js", "css", "svg", "woff", "ttf", "json", "html"];
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          // test: productionGzipExtensions,
          test: new RegExp(
            '\\.(' + productionGzipExtensions.join('|') + ')$'
          ),
          threshold: 10240, // 只有大小大于该值的资源会被处理 10kb
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false  // 删除原文件
        }),
      );
      /**
       * 代码压缩
       */
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            //生产环境自动删除console
            compress: {
              // warnings: false, // 若打包错误，则注释这行
              drop_debugger: true,
              drop_console: true,
              pure_funcs: ['console.log']
            }
          },
          //记得在使用 UglifyJSPlugin 时，必须使用 sourceMap 选项。
          sourceMap: false,//不输出map文件
          //Para️并行化可以显着加快构建速度，因此强烈建议
          parallel: true
        })
      )
      /**
       *  performance就是关闭每次打包之后的文件过大警告
       * 关闭文件过大提示，利于打包加快速度
       */
      config.performance = {
        hints: false,
        //入口起点的最大体积 整数类型(int)（以字节(bytes)为单位 200k）
        maxEntrypointSize: 204800,
        //生成文件的最大体积 整数类型(int)（以字节(bytes)为单位 200k）
        maxAssetSize: 204800,
      }
      /**
       * 公共代码抽离和代码分割，避免单个js文件过大
       */
      config.optimization = {
        splitChunks: {
          cacheGroups: {
            vendor: {
              chunks: "all",
              test: /node_modules/,
              name: "vendor",
              minChunks: 1,
              maxInitialRequests: 5,
              minSize: 30000,
              priority: 100
            },
            common: {
              chunks: "all",
              test: /[\\/]src[\\/]js[\\/]/,
              name: "common",
              minChunks: 3,
              maxInitialRequests: 5,
              minSize: 30000,
              priority: 60
            },
            styles: {
              name: "styles",
              test: /\.(sa|sc|c)ss$/,
              chunks: "all",
              enforce: true
            },
            runtimeChunk: {
              name: "manifest"
            }
          }
        }
      }

    } else {
      // 为开发环境修改配置
      config.mode = 'development'
    }
  },

  /** 配置 proxy 代理解决跨域问题
   *  反向代理- 它支持webPack - dev - server的所有选项 
   */
  devServer: {
    // 让浏览器 overlay 同时显示警告和错误
    // overlay: {
    //   warnings: true,
    //   errors: true
    // },
    // open: false, // 是否启动完毕自动在浏览器打开
    // host: "localhost",
    // port: "8080", // 代理断就
    // https: false,// https:{type:Boolean}
    // hotOnly: false, // 热更新
    /* proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
     * 下面是配置多个代理 
    */
    proxy: {
      '/api': {
        target: 'https://api.zzjtnb.com', // 目标代理接口地址
        secure: false,
        changeOrigin: true, // 是否跨域 开启代理，在本地创建一个虚拟服务端
        // ws: true, // 是否启用websockets
        pathRewrite: {
          '^/api': '/'
        }
      },
      '/github': {
        target: 'https://api.github.com', // 目标代理接口地址
        secure: false,
        changeOrigin: true, // 是否跨域 开启代理，在本地创建一个虚拟服务端
        // ws: true, // 是否启用websockets
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },

  // 配置pwa
  pwa: {
    name: "争逐",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "blue",
    themeColor: "#50E3C2",
    msTileColor: "#4A90E2"
  },

  runtimeCompiler: true,
  productionSourceMap: false,

  css: {
    extract: false,
  }
};
