# Newt + 11ty ブログ

ヘッドレスCMS「Newt」と静的サイトジェネレーター「Eleventy (11ty)」を組み合わせたブログサイトベースです。

## 機能

- Newtによるコンテンツ管理
- Eleventyによる静的サイト生成
- ブログ記事の一覧表示と詳細表示

## 必要条件

- Node.js 14.x以上
- Newtアカウントとスペース

## セットアップ

1. リポジトリをクローン
   ```
   git clone [リポジトリURL]
   cd newt-11ty-blog
   ```

2. 依存関係をインストール
   ```
   npm install
   ```

3. 環境変数の設定
   `.env.example`ファイルを`.env`にコピーし、Newtの認証情報を設定してください：
   ```
   NEWT_SPACE_UID=あなたのスペースUID
   NEWT_CDN_API_TOKEN=あなたのCDN APIトークン
   NEWT_APP_UID=あなたのアプリUID
   NEWT_MODEL_UID=あなたのモデルUID
   ```

## 開発

開発サーバーを起動：
```
npm start
```

ブラウザで http://localhost:8080 を開いてサイトを確認できます。

## ビルド

本番用にサイトをビルド：
```
npm run build
```

ビルドされたファイルは`_site`ディレクトリに出力されます。

## Newtの設定

このプロジェクトでは、Newtに以下のモデルを作成する必要があります：

- モデル名: `Article`
- フィールド:
  - `title`: テキスト（タイトル）
  - `slug`: テキスト（URLスラッグ）
  - `body`: リッチテキスト（本文）
  - `publishedAt`: 日時（公開日）
  - `tags`: 複数選択（タグ）

## ライセンス

MIT

## 作者

[Masatoshi Hanai]
