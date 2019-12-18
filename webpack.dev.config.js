var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  module: {
    rules: [
      // Закидывает все картинки в папку dist
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          outputPath: "images",
          name: "[name].[ext]"
        }
      },

      // преобразует scss в css и подключается в main.js (для быстрой разработки в dev режиме)
      {
        test: /\.scss$/i,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
    ]
  },
  plugins: [

    // собирает index.html в папке dist
    new HtmlWebpackPlugin({
      template: "index.html"
    }),
  ],

  // настройка webpack-dev-server
  devServer: {
    open: true,
  }
};
