# 環境構築

1. Node.js のインストール (https://nodejs.org/ja)
   1. LTSを選択  
2. Git のインストール (https://git-scm.com/)
3. Visual Studio Code のインストール (https://code.visualstudio.com/)
4. VSCode 拡張機能のインストール
   1. [npm Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense)
   2. [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
   3. [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)
   4. 他は任意で
5. 任意のディレクトリで `git clone https://github.com/SmileStudyKasukabe/smilestudy-calendar-app.git` を実行
6. 作成されたフォルダを VSCode で開く
7. `package.json` があるディレクトリで `npm install` を実行（`node_modules` が作成される）
8. `npm run dev` を実行して `localhost:3000` でページが開ければOK
   1. 開かれたページ自体は本番環境ではなく、常にロード中であるような状態になる
   2. `src/client/CalendarApp.svelte` の22行目を `false` に指定すると解除される
9. 環境更新用のファイルを配置する
   1.  塾長に環境更新用のファイルを渡しておくので、そのファイルをもらったら `.gitignore` があるフォルダに中身を展開する

  
## 環境の切り替え

デフォルトでは講師が使うカレンダーの環境になっているので、場合によっては生徒・保護者が見るための環境に切り替える必要がある

### 生徒・保護者用カレンダーへの切り替え

ターミナルで `npm run env:student`

### 講師用カレンダーへの切り替え

ターミナルで `npm run env:calendar`

## [テスト環境](https://script.google.com/macros/s/AKfycbwz3RTMTB7hyvHBuR5Zgms6Bloudy4c7VlfXiLBu8Gm/dev)の更新

本番で使っている環境を変更したくはないけど、実際に授業のデータなどを取得した状態の環境を使いたいというときは、テスト環境を使用する。

ターミナルで `npm run deploy` でテスト環境を更新できる。

## [本番環境](https://script.google.com/macros/s/AKfycbz1_9L7zCCsczPPUyKk6ZjYfOU4_N_8vHxoXlb59k_kBtVM2awIF0PyX1-ITb3Yfj0YOg/exec)の更新

本番環境を更新したい、という場合は `npm run release:calendar` or `npm run release:student` 。
