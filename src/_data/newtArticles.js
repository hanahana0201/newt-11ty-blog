const { createClient } = require('newt-client-js')
require('dotenv').config()

// Newtクライアントの初期化
const client = createClient({
  spaceUid: process.env.NEWT_SPACE_UID,
  token: process.env.NEWT_CDN_API_TOKEN,
})

module.exports = async function () {
  // Newtからコンテンツを取得
  const articles = await client.getContents({
    appUid: process.env.NEWT_APP_UID,
    modelUid: process.env.NEWT_MODEL_UID,
    query: {
      select: ['title', 'slug', 'body', 'publishedAt', 'tags'],
      order: ['-publishedAt']
    }
  })

  return articles.items
}
