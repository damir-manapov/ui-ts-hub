const withTypescript = require("@zeit/next-typescript");
const withLess = require("@zeit/next-less");

module.exports = withTypescript(
  withLess({
    distDir: "../.next",
    debug: true,
    cssLoaderOptions: {},
    lessLoaderOptions: {
      javascriptEnabled: true,
    }
  })
);
