https://main.d19j5017lue2ck.amplifyapp.com/kouki

## Environment

- DATABASE_URL
  - データベースのURL
  - 例：mysql://user:password@database.xxx.us-east-1.rds.amazonaws.com:3306/database


## Development
```bash
pnpm i
pnpm dev
```

## Deployment

### データベース
- [RDS](https://us-east-1.console.aws.amazon.com/rds/home?region=us-east-1#)でデータベースを作成してください
- MySQLを選択してください
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
          - env | grep -e DATABASE_URL >> .env.production
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
