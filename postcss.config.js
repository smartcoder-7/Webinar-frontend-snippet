const url = require("postcss-url")
const purgecss = require("@fullhuman/postcss-purgecss")

module.exports = {
  plugins: [
    require("postcss-import"),
    url({ url: "inline" }),
    require("tailwindcss")("./tailwind.config.js"),
    require(`postcss-preset-env`)({ stage: 1 }),
    require("postcss-extend-rule"),
    // purgecss({
    //   content: ["./src/**/*.jsx", "./src/**/*.tsx"],
    // }),
  ],
}
