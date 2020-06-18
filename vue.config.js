const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

// Generate pages object
const pagesObj = {};

const chromeName = ["popup", "options"];

chromeName.forEach(name => {
  pagesObj[name] = {
    entry: `src/${name}/index.js`,
    template: "public/index.html",
    filename: `${name}.html`
  };
});

const DIST_PATH = path.resolve("dist");

const plugins =
  process.env.NODE_ENV === "production"
    ? [
        {
          from: path.resolve("src/manifest.production.json"),
          to: DIST_PATH + "/manifest.json"
        }
      ]
    : [
        {
          from: path.resolve("src/manifest.development.json"),
          to: DIST_PATH + "/manifest.json"
        }
      ];

module.exports = {
  pages: pagesObj,
  configureWebpack: {
    plugins: [CopyWebpackPlugin(plugins.concat([
        {
            from: path.resolve("src/assets"),
            to: DIST_PATH + "/images",
            ignore: ['folder.png']
        },
        {
            from: path.resolve("src/_locales"),
            to: DIST_PATH + "/_locales"
        },
        {
            from: path.resolve("src/common"),
            to: DIST_PATH + "/js/common"
        }
    ]))]
  }
};
