module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("_input/assets");

  return {
    dir: {
      input: "_input",
      output: "_output",
      includes: "_includes",
      layouts: "_layouts",
    },
  };
};
