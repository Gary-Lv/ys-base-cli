const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin"); // gzip压缩 优化加载速度
const WebpackBundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin; // 打包可视化工具 可以查看打包后的压缩包具体情况
const UglifyJsPlugin = require("uglifyjs-webpack-plugin"); // 去除console.log打印和注释
const { HashedModuleIdsPlugin } = require("webpack"); // 只打包改变的文件

const resolve = (dir) => {
  return path.join(__dirname, dir);
};

// CDN预加载
const externals = {};

// "https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js",
// "https://cdn.jsdelivr.net/npm/vue-router@3.2.0/dist/vue-router.min.js",
// "https://cdn.jsdelivr.net/npm/vuex@3.4.0/dist/vuex.min.js",
const cdn = {
  // 开发环境
  dev: {
    css: [],
    js: ["https://cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js"],
  },
  // 生产环境
  build: {
    css: [],
    js: ["https://cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js"],
  },
};

module.exports = {
  lintOnSave: false,
  publicPath: "./",
  // 输出文件目录
  outputDir: "dist",
  // 放置静态资源的地方 (js/css/img/font/...)
  assetsDir: "assets",
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  chainWebpack: (config) => {
    // 路径别名配置
    config.resolve.alias
      .set("@", resolve("src"))
      .set("_c", resolve("src/components"));

    // webpack 会默认给commonChunk打进chunk-vendors，所以需要对webpack的配置进行delete
    config.optimization.delete("splitChunks");
    config.plugin("html").tap((args) => {
      if (process.env.NODE_ENV === "production") {
        args[0].cdn = cdn.build;
      }
      if (process.env.NODE_ENV === "development") {
        args[0].cdn = cdn.dev;
      }
      return args;
    });
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  configureWebpack: (config) => {
    const plugins = [];
    // 生产环境
    if (process.env.NODE_ENV === "production") {
      // 使用gzip进行压缩
      plugins.push(
        new CompressionPlugin({
          algorithm: "gzip",
          test: /\.js$|\.json$|\.css/, // 匹配文件名
          threshold: 10240, // 对超过10240k的数据压缩
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: true, // 是否删除源文件
        })
      );
      // 删除console.log 和 注释
      plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            output: {
              comments: false, // 去掉注释
            },
            warnings: false,
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ["console.log"], //移除console
            },
          },
        })
      );
      // 用于根据模块的相对路径生成 hash 作为模块 id, 一般用于生产环境
      plugins.push(new HashedModuleIdsPlugin());

      // 开启打包分离
      config.optimization = {
        runtimeChunk: "single",
        splitChunks: {
          chunks: "all", // 默认作用于异步chunk，值为all/initial/async/function(chunk),值为function时第一个参数为遍历所有入口chunk时的chunk模块，chunk._modules为chunk所有依赖的模块，通过chunk的名字和所有依赖模块的resource可以自由配置,会抽取所有满足条件chunk的公有模块，以及模块的所有依赖模块，包括css
          maxAsyncRequests: 5, //所有异步请求不得超过5个
          maxInitialRequests: Infinity, //初始话并行请求不得超过3个
          minSize: 1000 * 30, //表示在压缩前的最小模块大小,默认值是30kb
          automaticNameDelimiter: "~", //名称分隔符，默认是~
          cacheGroups: {
            //设置缓存组用来抽取满足不同规则的chunk,
            vendors: {
              test: /[\\/]node_modules[\\/]/, //可以为字符串，正则表达式，函数，以module为维度进行抽取，只要是满足条件的module都会被抽取到该common的chunk中，为函数时第一个参数是遍历到的每一个模块，第二个参数是每一个引用到该模块的chunks数组
              priority: 1, //优先级，一个chunk很可能满足多个缓存组，会被抽取到优先级高的缓存组中
              reuseExistingChunk: true, //  如果该chunk中引用了已经被抽取的chunk，直接引用该chunk，不会重复打包代码
              name(module) {
                // 排除node_modules 然后吧 @ 替换为空 ,考虑到服务器的兼容
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )[1];
                return `npm.${packageName.replace("@", "")}`;
              },
            },
            styles: {
              name: "styles",
              test: /\.(sa|sc|c|le)ss$/,
              priority: 1,
            },
          },
        },
      };

      // 压缩图片
      config.module
        .rule("images")
        .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
        .use("image-webpack-loader")
        .loader("image-webpack-loader")
        .options({ bypassOnDebug: true });

      // 取消webpack打包警告
      config.performance = {
        hints: "warning",
        //入口起点的最大体积
        maxEntrypointSize: 1000 * 500,
        //生成文件的最大体积
        maxAssetSize: 1000 * 1000,
        //只给出 js 文件的性能提示
        assetFilter: function(assetFilename) {
          return assetFilename.endsWith(".js");
        },
      };
    } else {
      // 开启打包可视化
      plugins.push(new WebpackBundleAnalyzerPlugin());
    }
    // 打包时npm包转CDN
    config.externals = externals;

    return { plugins };
  },
  devServer: {
    open: true,
    host: "0.0.0.0",
    port: 52526,
    https: false,
    hotOnly: false,
    // proxy: {
    //   // 配置跨域
    //   "/api": {
    //     target: "http://www.baidu.com", //配置开发环境跨域请求服务地址
    //     changeOrigin: true, //改变源
    //     ws: true, //是否代理websockets
    //     pathRewrite: {
    //       "^/api": "",
    //     },
    //   },
    //   before: (app) => {},
    // },
  },
};
