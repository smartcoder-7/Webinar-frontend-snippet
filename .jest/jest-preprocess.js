const babelOptions = {
  presets: ["babel-preset-gatsby"],
  plugins: [
    "babel-plugin-macros",
    ["tailwind-components", { config: "./tailwind.config.js" }],
  ],
}
module.exports = require("babel-jest").createTransformer(babelOptions)
