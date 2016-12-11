# 環境
- Fedora release 25
# 対象バージョン
- Elasticsearch 5.1.1
- Kibana 5.1.1

# 導入

## elastic search
### インストール

```
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-5.1.1.tar.gz
tar xvfz elasticsearch-5.1.1.tar.gz
./elasticsearch-5.1.1/bin/elasticsearch
```

### 動作確認

```
curl -X GET http://localhost:9200/
{
  "name" : "shPLS4E",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "9hM8A5WiS9amZjpyto34zA",
  "version" : {
    "number" : "5.1.1",
    "build_hash" : "5395e21",
    "build_date" : "2016-12-06T12:36:15.409Z",
    "build_snapshot" : false,
    "lucene_version" : "6.3.0"
  },
  "tagline" : "You Know, for Search"
}
```

### Readme

> Elasticsearch is a distributed RESTful search engine built for the cloud. Features include:

* Elasticsearchは分散検索エンジン。
    * インデックスはシャード間で全部共有される
    * シャードは1つ以上のレプリカを持てる
    * 読み出し、検索操作はレプリカシャードで実行される
* マルチタイプのマルチテナント(？)
    * 1つ以上のindexをサポート（1つのテーブル、フィールドに複数のindexをつけられるって話？）
    * indexごとに、1つ以上のタイプをつけられる
    * Indexレベルを設定できる（シャードの数、インデックスストレージ...)
* いろんな、APIがたくさんあるよ
    * HTTP RESTful API
    * Native Java API
    * すべてのAPIの処理は自動的に適切なノードに渡される
* ドキュメント指向
    * 事前にスキーマを定義しておく必要なし
    * タイプごとのスキーマを定義しておくことで、インデックスプロセスをカスタマイズできる？
* 高信頼性、非同期書き込みで長期間の永続化も安心
* リアルタイム（に迫る）検索
* フロントとしてLucene組み込み
    * 各々のシャードで完全な機能的Lucene index (? functional Lucene index)
    * Luceneの能力をフルに活用してシンプル設定・プラグインを、簡単に公開可能
* 操作ごとの一貫性担保
    * 単一のドキュメントレベル操作はACIDである
* ALv2のOSS

## Kibana

```
wget https://artifacts.elastic.co/downloads/kibana/kibana-5.1.1-linux-x86_64.tar.gz
tar xvfz kibana-5.1.1-linux-x86_64.tar.gz

```

# マニュアル
# 参考
