https://main.d19j5017lue2ck.amplifyapp.com/kouki

## Environment

- NEXT_PUBLIC_BASE_URL
  - サイトのURLを指定してください
  - 例: `http://localhost:3000`
- DATABASE_HOST
  - データベースのホストを指定してください
  - 例: `xxx.xxx.us-east-1.rds.amazonaws.com`
- DATABASE_PORT
  - データベースのポートを指定してください
  - 例: `5432`
- DATABASE_USER
  - データベースのユーザー名を指定してください
  - 例: `user`
- DATABASE_PASSWORD
  - データベースのパスワードを指定してください
  - 例: `password`
- DATABASE_NAME
  - データベースの名前を指定してください
  - 例: `postgres`
- BETTER_AUTH_SECRET
  - セッションの暗号化に使用するシークレットキーを指定してください
  - 例: `secret`
- BETTER_AUTH_URL
  - 認証後のリダイレクト先を指定してください
  - 例: `http://localhost:3000`
- GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET
  - GitHub OAuth App のクライアントIDとクライアントシークレットを指定してください
  - [ドキュメント](https://docs.github.com/ja/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)

## Development
```bash
pnpm i
pnpm dev
```

## Deployment

### データベース
- [RDS](https://us-east-1.console.aws.amazon.com/rds/home?region=us-east-1#)でデータベースを作成してください
- Postgresを選択してください
- アクセス情報を環境変数に設定してください

### ホスティング
- [Amplify](https://us-east-1.console.aws.amazon.com/amplify/apps)でアプリケーションを作成してください
- 「新しいアプリを作成」ボタンを押し、GitHubリポジトリを選択してください
- 環境変数を設定してください
- 基本そのまま指示に従えばデプロイできますが、「ビルドの設定」で`preBuild`は以下のように設定する必要があります
  ```yml
  version: 1
  frontend:
    phases:
      preBuild:
        commands:
          - npm install -g pnpm
          - pnpm i
      build:
        commands:
          - env | grep -e DATABASE_HOST -e DATABASE_PORT -e DATABASE_USER -e DATABASE_PASSWORD -e DATABASE_NAME -e BETTER_AUTH_SECRET -e BETTER_AUTH_URL -e GITHUB_CLIENT_ID -e GITHUB_CLIENT_SECRET >> .env.production
          - env | grep -e NEXT_PUBLIC_ >> .env.production
          - pnpm run build
    artifacts:
      baseDirectory: .next
      files:
        - '**/*'
    cache:
      paths:
        - node_modules/**/*
        - .next/cache/**/*
  ```
