const yaml = require("js-yaml");

module.exports = function (eleventyConfig) {
  eleventyConfig.addDataExtension("yaml,yml", (contents) => yaml.load(contents));
  eleventyConfig.addPassthroughCopy("_input/assets");
  eleventyConfig.addPassthroughCopy("_input/images");

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
