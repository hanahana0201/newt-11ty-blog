const { createClient } = require('newt-client-js')
require('dotenv').config()

// Newtクライアントの初期化
const client = createClient({
  spaceUid: process.env.NEWT_SPACE_UID,
  token: process.env.NEWT_CDN_API_TOKEN,
})

module.exports = async function () {
  // Newtからコンテンツを取得（_sysフィールドを含める）
  const articles = await client.getContents({
    appUid: process.env.NEWT_APP_UID,
    modelUid: process.env.NEWT_MODEL_UID,
    query: {
      select: ['title', 'slug', 'body', '_sys', 'tags'],
      order: ['-_sys.raw.publishedAt'] // 公開日時で並べ替え
    }
  })

  // _sys.raw.publishedAtをpublishedAtとして使用
  const formattedArticles = articles.items.map(article => {
    // システムフィールドから公開日時を取得
    const publishedAt = article._sys?.raw?.publishedAt || article._sys?.createdAt;

    return {
      ...article,
      publishedAt: publishedAt
    };
  });

  console.log('最初の記事の公開日時:', formattedArticles[0]?.publishedAt);

  return formattedArticles;
}

