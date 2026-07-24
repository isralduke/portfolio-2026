module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("_input/assets");

  return {
    dir: {
      input: "_input",
      output: "docs",
      includes: "_includes",
      layouts: "_layouts",
    },
  };
};
