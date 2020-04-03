const path = require("path")

module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "<rootDir>/.jest/jest-preprocess.js",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.([tj]sx?)$",
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": "identity-obj-proxy",
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/.jest/file-mock.js",
    "^@src/(.*)$": "<rootDir>/src/$1",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testPathIgnorePatterns: ["node_modules", ".cache"],
  transformIgnorePatterns: ["node_modules/(?!(gatsby)/)"],
  globals: {
    __PATH_PREFIX__: "",
    "ts-jest": {
      tsConfig: "<rootDir>/tsconfig.json",
      babelConfig: {
        presets: [
          ["react-app", { flow: false, typescript: true }],
          "@emotion/babel-preset-css-prop",
        ],
        plugins: [
          "@babel/plugin-syntax-object-rest-spread",
          "macros",
          [
            "tailwind-components",
            { config: path.resolve(__dirname, "./tailwind.config.js") },
          ],
        ],
      },
    },
  },
  testURL: "http://localhost",
  setupFiles: ["<rootDir>/.jest/loadershim.js"],
  rootDir: path.resolve(__dirname, "./"),
}
