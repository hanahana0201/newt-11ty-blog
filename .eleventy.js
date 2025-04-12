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

  // タグリストとタグ別記事コレクションを作成
  eleventyConfig.addCollection("tagList", function (collectionApi) {
    const articles = collectionApi.getAll()[0].data.newtArticles;
    const tagMap = {};

    // すべての記事からタグを抽出
    articles.forEach(article => {
      if (article.tags && article.tags.length) {
        article.tags.forEach(tag => {
          if (!tagMap[tag._id]) {
            tagMap[tag._id] = tag;
          }
        });
      }
    });

    return Object.values(tagMap);
  });

  eleventyConfig.addCollection("tagArticles", function (collectionApi) {
    const articles = collectionApi.getAll()[0].data.newtArticles;
    const tagArticles = {};

    // タグごとに記事をグループ化
    articles.forEach(article => {
      if (article.tags && article.tags.length) {
        article.tags.forEach(tag => {
          if (!tagArticles[tag.slug]) {
            tagArticles[tag.slug] = [];
          }
          tagArticles[tag.slug].push(article);
        });
      }
    });

    return tagArticles;
  });

  // 著者リストと著者別記事コレクションを作成
  eleventyConfig.addCollection("authorList", function (collectionApi) {
    const articles = collectionApi.getAll()[0].data.newtArticles;
    const authorMap = {};

    // すべての記事から著者を抽出
    articles.forEach(article => {
      if (article.author) {
        if (!authorMap[article.author._id]) {
          authorMap[article.author._id] = article.author;
        }
      }
    });

    return Object.values(authorMap);
  });

  eleventyConfig.addCollection("authorArticles", function (collectionApi) {
    const articles = collectionApi.getAll()[0].data.newtArticles;
    const authorArticles = {};

    // 著者ごとに記事をグループ化
    articles.forEach(article => {
      if (article.author) {
        if (!authorArticles[article.author.slug]) {
          authorArticles[article.author.slug] = [];
        }
        authorArticles[article.author.slug].push(article);
      }
    });

    return authorArticles;
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

