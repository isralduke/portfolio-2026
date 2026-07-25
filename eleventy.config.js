const yaml = require("js-yaml");

module.exports = function (eleventyConfig) {
  eleventyConfig.addDataExtension("yaml,yml", (contents) => yaml.load(contents));
  eleventyConfig.addPassthroughCopy("_input/assets");
  eleventyConfig.addPassthroughCopy("_input/images");

  eleventyConfig.addCollection("product-design", function (collectionApi) {
    return collectionApi.getFilteredByGlob("_input/product-design/*.md").filter(
      (item) => item.inputPath !== "./_input/product-design/index.md"
    );
  });

  return {
    markdownTemplateEngine: "njk",
    dir: {
      input: "_input",
      output: "docs",
      includes: "_includes",
      layouts: "_layouts",
    },
  };
};
