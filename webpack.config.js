var HtmlWebpackPlugin = require("html-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env = {}) => {
  const { mode = "development" } = env;

  const isProd = mode === "production";
  const isDev = mode === "development";

  const getStyleLoaders = () => {
    return [
      isProd ? MiniCssExtractPlugin.loader : "style-loader",
      "css-loader"
    ];
  };

  const getPlugins = () => {
    const plugins = [
      // собирает index.html в папке dist
      new HtmlWebpackPlugin({
        template: "index.html"
      })
    ];

    if (isProd) {
      plugins.push(
        // собирает index.html в папке dist
        new MiniCssExtractPlugin({
          filename: "[name].css"
        })
      );
    }

    return plugins;
  };

  return {
    mode: isProd ? "production" : "development",
    output: {
      filename: isProd ? "main-[hash:8].js" : undefined
    },
    module: {
      rules: [
        // Проходится babelem по js файлам
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-object-rest-spread"]
          }
        },

        // Закидывает все картинки в папку dist
        {
          test: /\.(png|jpe?g|gif)$/i,
          loader: "file-loader",
          options: {
            outputPath: "images",
            name: "[name].[ext]"
          }
        },

        // Загрузка шрифтов в папку fonts
        {
          test: /\.(ttf|otf|eot|woff|woff2)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "fonts",
                name: "[name].[ext]"
              }
            }
          ]
        },

        // преобразует css и подключается в main.js (для быстрой разработки)
        {
          test: /\.scss$/i,
          use: getStyleLoaders()
        },

        // преобразует scss в css и собирает все в main.css (для билда)
        {
          test: /\.css$/i,
          use: [...getStyleLoaders(), "sass-loader"]
        }
      ]
    },
    plugins: getPlugins(),

    // настройка webpack-dev-server
    devServer: {
      open: true
    }
  };
};
