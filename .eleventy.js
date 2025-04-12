const { DateTime } = require("luxon");
const striptags = require('striptags');

module.exports = function (eleventyConfig) {
  // 日付フォーマットフィルターの追加
  eleventyConfig.addFilter("date", function (dateObj) {
    if (!dateObj) return "日付なし";

    try {
      // ISO形式の日付文字列をフォーマット
      return DateTime.fromISO(dateObj).toFormat("yyyy年MM月dd日");
    } catch (e) {
      console.error("日付変換エラー:", e);
      return "日付エラー";
    }
  });

  // 静的ファイルのコピー
  eleventyConfig.addPassthroughCopy("src/css");

  // htmlタグを取り除く
  eleventyConfig.addFilter("striptags", striptags);

  //  年月日の整形 
  eleventyConfig.addFilter("date", function (dateObj) {
    return DateTime.fromISO(dateObj).toFormat("yyyy年MM月dd日");
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    }
  };
};

