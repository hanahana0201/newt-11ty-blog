const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // 日付フォーマットフィルターの追加
  eleventyConfig.addFilter("date", function (dateObj, format) {
    return DateTime.fromISO(dateObj).toFormat(format);
  });

  // 静的ファイルのコピー
  eleventyConfig.addPassthroughCopy("src/css");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    }
  };
};

