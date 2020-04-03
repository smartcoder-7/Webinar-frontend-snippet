const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

// exports.onCreateBabelConfig = ({ actions: { setBabelPlugin } }) => {
//   setBabelPlugin({
//     name: "babel-plugin-tailwind-components",
//     options: { config: "./tailwind.config.js" },
//   })
// }

exports.onCreateWebpackConfig = ({ actions, stage, loaders }) => {
  actions.setWebpackConfig({
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
      plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
    },
  });

  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /@firebase/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;
  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/portal/)) {
    page.matchPath = '/portal/*';
    // Update the page.
    createPage(page);
  }

  if (page.path.match(/^\/webinar/)) {
    page.matchPath = '/webinar/*';
    // Update the page.
    createPage(page);
  }

  if (page.path.match(/^\/profile/)) {
    page.matchPath = '/profile/*';
    // Update the page.
    createPage(page);
  }

  if (page.path.match(/^\signup/)) {
    page.matchPath = '/signup/*';
    // Update the page.
    createPage(page);
  }

  if (page.path.match(/^\/verification/)) {
    page.matchPath = '/verification/*';
    // Update the page.
    createPage(page);
  }
};
