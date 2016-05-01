# 目的
Markdownで書いたテキストの見た目を、それっぽいhtmlで出力したい。

# 概要
Markdownで書いたテキストをpandocで用いてhtmlに出力する際に、
それっぽいスタイルシートを適用する。
このページ自身がそれっぽくしたもの。

# 使い方

```
pandoc_embed_html index.md > index.html
```

# 使うもの
- pandoc 1.15.1.1
    * Markdown -> html変換
- [github-markdown-css](https://github.com/sindresorhus/github-markdown-css)

# 準備手順
## テンプレートhtmlの作成
pandocで使用するhtmlテンプレートを作成する。デフォルトのテンプレートに対して
`github-markdown-css` を bodyに適用するよう class を追加する。

```
# 現在のテンプレートを出力
~/work/pandoc-gfm# pandoc -D html5 > github.html.org
# テンプレートの加工
~/work/pandoc-gfm# diff github.html github.html.org
36c36
< <body class="markdown-body">
---
> <body>
# テンプレートの配置が、うまくいかなかったのでhtml5のテンプレートを上書き
~/work/pandoc-gfm# cp -pf github.html /usr/local/Cellar/pandoc/1.15.1.1/share/x86_64-osx-ghc-7.10.2/pandoc-1.15.1.1/data/templates/default.html5
```

## github-markdown-css の export

```
~/work# git clone https://github.com/sindresorhus/github-markdown-css.git
Cloning into 'github-markdown-css'...
remote: Counting objects: 305, done.
remote: Total 305 (delta 0), reused 0 (delta 0), pack-reused 305
Receiving objects: 100% (305/305), 294.45 KiB | 197.00 KiB/s, done.
Resolving deltas: 100% (165/165), done.
Checking connectivity... done.
```

## pandocのショートハンド関数を追加

```
pandoc_embed_html () {
    pandoc -s --self-contained -t html5 -c ~/work/github-markdown-css/github-markdown.css $@
}
```


# 参考
- pandoc templateの使い方 <http://www.d-wood.com/blog/2014/09/05_6781.html>
- pandoc cssオプションなどコマンド指定周り <http://jou4.hateblo.jp/entry/2013/03/04/215020>
