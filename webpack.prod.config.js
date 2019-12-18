var HtmlWebpackPlugin = require("html-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",
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

      // преобразует scss в css и собирает все в main.css (для билда в prod режиме)
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [

    // собирает index.html в папке dist
    new HtmlWebpackPlugin({
      template: "index.html"
    }),
    
    // собирает main.css в папке dist и подключает в index.html
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ],

  // настройка webpack-dev-server
  devServer: {
    open: true,
  }
};
