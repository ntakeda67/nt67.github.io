# これについて
* npm公式ドキュメント読みメモ
* WIP
# 参考にしたところ
https://docs.npmjs.com/getting-started

## これを書いている時の動作環境

```
~# cat /etc/redhat-release
Fedora release 22 (Twenty Two)
~# node -v
v0.10.36
~# npm -v
3.4.0
```

# ライブラリのインストール
## ローカルインストール(CLIで対象をインストール対象を直接指定)
npm install <hoge>でカレントディレクトリの node_modulesディレクトリに落っこちてくる

```
# 作業ディレクトリの作成
cd /home/nt67/work/npmtest
npm install knockout
/home/nt67/work/npmtest
└── knockout@3.4.0

npm WARN ENOENT ENOENT, open '/home/nt67/work/npmtest/package.json'
npm WARN EPACKAGEJSON npmtest No description
npm WARN EPACKAGEJSON npmtest No repository field.
npm WARN EPACKAGEJSON npmtest No README data
npm WARN EPACKAGEJSON npmtest No license field.
tree /home/nt67/work/npmtest
/home/nt67/work/npmtest
└── node_modules
    └── knockout
        ├── README.md
        ├── build
        │   └── output
        │       ├── knockout-latest.debug.js
        │       └── knockout-latest.js
        └── package.json

4 directories, 4 files
```

# プロジェクトの作成
## package.jsonで作成プロジェクトの設定を作る
### package.jsonは何のためのものか
package.jsonでプロジェクトについて次の内容を表現できる。
* 作成するプロジェクトがどのライブラリに依存しているか
* そのライブラリについてどのバージョンを使用できるか
* 他の開発者がビルド作業を再実行しやすくできる

最小限の記載は、nameとversion。
更にnpm initでpackage.json記載の不足内容が補完される。
色々細かい聞かれるけど、 npm init --yesでデフォルト設定が埋められる。

```
cat /home/nt67/work/npmtest/package_json_test/package.json
{
    "name": "hoge-app",
    "version": "0.0.1"
}
	
npm init --yes
Wrote to /home/nt67/work/npmtest/package_json_test/package.json:

{
"name": "package_json_test",
"version": "1.0.0",
"description": "",
"main": "index.js",
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1"
},
"keywords": [],
"author": "",
"license": "ISC"
}

```

### 依存ライブラリを定義する
package.jsonにて用途別に次の2種設定できる
* dependencies
アプリケーションが稼働するために必要なものを定義する
* devDependencies
開発やテストに必要なものを定義する

package.jsonに記載するとこんな感じ

```
cat ~/work/npmtest/package_json_test/package.json
{
  "name": "package_json_test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
      "knockout": "3.4.0"
  },
  "devDependencies": {
      "clean-css": "3.4.9"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
  }
```
  
```
# 前回との差分
~/work/npmtest/package_json_test# diff package.json package.json.01
9,14d8
<   "dependencies": {
<       "knockout": "3.4.0"
<   },
<   "devDependencies": {
<       "clean-css": "3.4.9"
<   },
```

直接package.jsonに書かなくても、CLIからも足せる

```
npm install knockout.mapping@2.4.3 --save
package_json_test@1.0.0 /home/nt67/work/npmtest/package_json_test
└─┬ knockout.mapping@2.4.3
└── knockout@3.4.0

npm WARN EPACKAGEJSON package_json_test@1.0.0 No description
npm WARN EPACKAGEJSON package_json_test@1.0.0 No repository field.
~/work/npmtest/package_json_test# tree
.
├── node_modules
│   └── knockout.mapping
│       ├── README.md
│       ├── knockout.mapping.js
│       ├── node_modules
│       │   └── knockout
│       │       ├── README.md
│       │       ├── build
│       │       │   └── output
│       │       │       ├── knockout-latest.debug.js
│       │       │       └── knockout-latest.js
│       │       └── package.json
│       └── package.json
├── package.json
├── package.json.01
└── package.json.02

6 directories, 10 files
~/work/npmtest/package_json_test# diff package.json package.json.02
10,11c10
<     "knockout": "3.4.0",
<     "knockout.mapping": "^2.4.3"
---
>       "knockout": "3.4.0"
14c13
<     "clean-css": "3.4.9"
---
>       "clean-css": "3.4.9"

```

