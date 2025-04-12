const { createClient } = require('newt-client-js')
require('dotenv').config()

// Newtクライアントの初期化
const client = createClient({
  spaceUid: process.env.NEWT_SPACE_UID,
  token: process.env.NEWT_CDN_API_TOKEN,
})

module.exports = async function () {
  // 記事データを取得（著者とタグの情報も含める）
  const articles = await client.getContents({
    appUid: process.env.NEWT_APP_UID,
    modelUid: 'article',
    query: {
      select: ['title', 'slug', 'body', '_sys', 'coverImage', 'author', 'tags'],
      populate: ['author', 'tags']  // 著者とタグの情報を展開
    }
  })

  // 整形したデータを返す
  const formattedArticles = articles.items.map(article => {
    return {
      ...article,
      publishedAt: article._sys?.raw?.publishedAt || article._sys?.createdAt
    };
  });

  return formattedArticles;
}

