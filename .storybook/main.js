const createCompiler = require("@storybook/addon-docs/mdx-compiler-plugin")
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin")
const path = require("path")
new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })

module.exports = {
  stories: ["../src/**/*.stories.tsx"],
  // 1. register the docs panel (as opposed to '@storybook/addon-docs' which
  //    will configure everything with a preset)
  addons: ["@storybook/addon-docs/register"],
  // 2. manually configure webpack, since you're not using the preset
  webpackFinal: async config => {
    config.module.rules.push({
      // 2a. Load `.stories.mdx` / `.story.mdx` files as CSF and generate
      //     the docs page from the markdown
      test: /\.(stories|story)\.mdx$/,
      use: [
        {
          loader: "babel-loader",
          // may or may not need this line depending on your app's setup
          options: {
            plugins: ["@babel/plugin-transform-react-jsx"],
          },
        },
        {
          loader: "@mdx-js/loader",
          options: {
            compilers: [createCompiler({})],
          },
        },
      ],
    })
    // 2b. Run `source-loader` on story files to show their source code
    //     automatically in `DocsPage` or the `Source` doc block.

    // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
    config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/]
    // use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
    config.module.rules[0].use[0].loader = require.resolve("babel-loader")
    // use @babel/preset-react for JSX and env (instead of staged presets)
    config.module.rules[0].use[0].options.presets = [
      require.resolve("@babel/preset-react"),
      require.resolve("@babel/preset-env"),
    ]
    config.module.rules[0].use[0].options.plugins = [
      // use @babel/plugin-proposal-class-properties for class arrow functions
      require.resolve("@babel/plugin-proposal-class-properties"),
      // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
      require.resolve("babel-plugin-remove-graphql-queries"),
    ]
    // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
    config.resolve.mainFields = ["browser", "module", "main"]

    config.module.rules.push({
      test: /\.(ts|tsx)$/,

      use: [
        {
          loader: require.resolve("gatsby/dist/utils/babel-loader"),
          options: {
            stage: "develop",
            configFile: false,
            compact: true,
            presets: [["react-app", { flow: false, typescript: true }]],
            plugins: [
              require.resolve("@babel/plugin-proposal-class-properties"),
              // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
              require.resolve("babel-plugin-remove-graphql-queries"),
              {
                name: "babel-plugin-tailwind-components",
                options: { config: "./tailwind.config.js" },
              },
            ],
          },
        },
        {
          loader: require.resolve("react-docgen-typescript-loader"),
          options: {
            tsconfigPath: path.resolve(__dirname, "../tsconfig.json"),
          },
        },
      ],
    })

    config.module.rules.push({
      test: /\.(stories|story)\.[tj]sx?$/,
      loader: require.resolve("@storybook/source-loader"),
      exclude: [/node_modules/],
      enforce: "pre",
    })

    config.module.rules.push({
      test: /\.css$/,
      use: [
        {
          loader: "postcss-loader",
          options: {
            /* 
              Enable Source Maps
             */
            sourceMap: true,
            /*
              Set postcss.config.js config path && ctx 
             */
            config: {
              path: path.resolve(__dirname, "../postcss.config.js"),
            },
          },
        },
      ],
      exclude: [/node_modules/],
      include: path.resolve(__dirname, "../"),
    })

    config.module.rules.push({
      test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|cur|ani)(\?.*)?$/,
      loader: "file-loader",
      include: path.resolve(__dirname, "../"),
      query: { name: "static/media/[name].[hash:8].[ext]" },
    })

    config.module.rules.push({
      test: /\.(woff|woff2)(\?.*)?$/,
      loader: "url-loader",
      include: path.resolve(__dirname, "../"),
      query: { name: "static/media/[name].[hash:8].[ext]" },
    })

    config.module.rules.push({
      test: /\.svg$/,
      // include: pathToInlineSvg,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            icon: true,
          },
        },
      ],
    })

    config.resolve.extensions.push(".ts", ".tsx")
    config.resolve.plugins = [
      new TsconfigPathsPlugin({ configFile: "./tsconfig.json" }),
    ]

    return config
  },
}
