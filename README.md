# SOUSEI NETWORK Portal

WordPressの現在稼働中テーマへ直接追加する、SOUSEI NETWORK用リンクポータルページを実装する。

このプロジェクトでは、まずGitHub Pagesで確認できる静的プロトタイプを作成し、その後WordPressテーマ組み込み版を作成する。

---

## 重要な前提

このコードは **新規テーマではなく、現在稼働中のWordPress親テーマへ直接追加する前提** で作成する。

そのため、既存テーマ全体を置き換えるような実装にはしない。

### 親テーマ直入れ前提

以下のファイルを、現在稼働中の親テーマへ追加する。

```text
現在の親テーマ/
├─ page-sousei-network.php
├─ functions-sousei-network.php
└─ assets/
   ├─ logo.svg
   ├─ sousei-network.css
   ├─ sousei-network.js
   └─ sousei-admin.js
```

既存テーマの `functions.php` には、以下を追記する。

```php
require_once get_template_directory() . '/functions-sousei-network.php';
```

子テーマではなく親テーマ直入れなので、`get_stylesheet_directory()` ではなく `get_template_directory()` を使う。

注意：親テーマを更新すると、追加ファイルや `functions.php` の追記が消える可能性がある。更新前には必ずバックアップを取る。

---

## 参考画像

デザイン参考画像は以下のみ使用する。

```text
docs/design-reference.png
```

参考画像は雰囲気の確認用とし、実装上の正はこのREADMEの仕様とする。

---

## ロゴ

ロゴは以下を使用する。

```text
assets/logo.svg
```

ヘッダーでは `assets/logo.svg` を表示する。

PC hover時に表示するカタカナ表記 `ソウセイネットワーク` は、画像ではなくテキストで表示する。

- カタカナは Noto Sans JP
- 字間を広めにする
- 英字ロゴ自体は消さない
- スマホではカタカナhover表示は出さない

---

## 目的

全国曹洞宗青年会・加盟曹洞宗青年会のWEB・SNSリンクポータルサイトを作成する。

各青年会ごとに、以下のリンクを持てるようにする。

- WEB
- YouTube
- Instagram
- X
- Facebook

ユーザーはタブでサービスを切り替え、そのサービスURLを持っている青年会だけを一覧表示できる。

---

## 実装方針

### 第1段階：静的プロトタイプ

GitHub Pagesでプレビューできる静的版を作成する。

静的版ファイル：

```text
index.html
style.css
script.js
```

静的版では、仮データ配列を使って以下を確認できるようにする。

- 見た目
- レスポンシブ
- タブ切り替え
- カードフィルタ
- hover演出
- SNSアイコンのカラー化
- ロゴhover演出

GitHub Pagesでは、WordPress管理画面・PHPテンプレート・post_meta保存処理は確認できない前提とする。

---

### 第2段階：WordPressテーマ組み込み版

現在稼働中のWordPress親テーマ内に組み込める形で実装する。

WordPress版ファイル：

```text
page-sousei-network.php
functions-sousei-network.php
assets/sousei-network.css
assets/sousei-network.js
assets/sousei-admin.js
assets/logo.svg
```

`functions-sousei-network.php` は、既存テーマの `functions.php` から読み込む追加用ファイルとして作成する。

既存の `functions.php` を丸ごと置き換えない。

---

## WordPress実装方式

- プラグインは使わない。
- ACF Proは使わない。
- Pods / CMB2 などの外部プラグインも使わない。
- WordPress標準機能だけで実装する。
- 固定ページ `sousei-network` 専用テンプレートとして実装する。
- テンプレートファイルは `page-sousei-network.php`。
- 青年会データは固定ページの post_meta `_sousei_groups` に保存する。
- SOUSEI NETWORK固定ページの編集画面にだけ、青年会一覧の入力メタボックスを表示する。
- サムネイル画像はWordPressメディアライブラリから選択・アップロードできるようにする。

---

## WordPress固定ページ

WordPress側に以下の固定ページを作る。

```text
ページ名：SOUSEI NETWORK
スラッグ：sousei-network
```

WordPressのテンプレート階層により、スラッグ `sousei-network` の固定ページで `page-sousei-network.php` を使用する。

---

## 既存テーマへの影響を避ける命名

既存テーマに影響を与えないよう、CSSクラス名・JS変数・PHP関数名には必ず接頭辞を付ける。

### PHP

PHP関数名には `sousei_` を付ける。

例：

```php
sousei_add_meta_boxes()
sousei_save_groups_meta()
sousei_enqueue_assets()
```

### CSS

CSSクラス名には `sousei-` を付ける。

例：

```css
.sousei-page
.sousei-hero
.sousei-card
.sousei-tabs
```

### JS

JS内の変数・関数にも `sousei` 系の名前を使い、グローバル汚染を避ける。

---

## 管理画面仕様

SOUSEI NETWORK固定ページの編集画面にだけ、独自メタボックス「青年会一覧」を表示する。

### 固定ページの判定

以下のいずれかで判定する。

- ページスラッグが `sousei-network`
- またはページテンプレートが `page-sousei-network.php`

### メタボックス名

```text
青年会一覧
```

### 入力できるデータ

複数件の青年会データを入力できるようにする。

各青年会データは以下を持つ。

```text
青年会名
サムネイル画像ID
WEB URL
YouTube URL
Instagram URL
X URL
Facebook URL
```

### 管理画面で必要な操作

- 青年会データを追加できる
- 青年会データを削除できる
- 入力順を保持する
- サムネイル画像をWordPressメディアライブラリから選択できる
- サムネイル画像を新規アップロードできる
- 選択済みサムネイルをプレビュー表示する
- 選択済みサムネイルを削除できる


### 固定掲載順リストの管理

WordPress版では、固定掲載順リストをWordPress管理画面で編集できるようにする。

- WordPress管理画面に「SOUSEI NETWORK設定」ページを追加する。
- 設定ページには「掲載順リスト」というtextareaを用意する。
- 1行に1つの青年会名を入力する形式にする。
- このリストの上から下の順番を、フロント表示の固定掲載順として使用する。
- 保存先は wp_options とし、option_name は `sousei_group_order_list` にする。
- 保存時は nonce、権限チェック、`sanitize_textarea_field()` など適切なサニタイズを行う。

デフォルトの固定掲載順リストは以下の49件とする。

```text
1. 曹洞宗北海道第一宗務所青年会
2. 曹洞宗北海道第二宗務所青年会
3. 曹洞宗北海道第三宗務所青年会
4. 青森県曹洞宗青年会
5. 岩手県曹洞宗青年会
6. 宮城県曹洞宗青年会
7. 秋田県曹洞宗青年会
8. 山形曹洞宗青年会
9. 曹洞宗山形県第三宗務所青年会
10. 曹洞宗福島県青年会
11. 茨城県曹洞宗青年会
12. 曹洞宗埼玉県第二宗務所青年会
13. 千葉県曹洞宗青年会
14. 新潟県曹洞宗青年会
15. 曹洞宗石川県青年会
16. 福井県曹洞宗青年会
17. 曹洞宗山梨県青年会
18. 曹洞宗長野県第一青年会
19. 曹洞宗長野県第二宗務所青年会
20. 曹洞宗岐阜県青年会
21. 曹洞宗静岡県第一宗務所青年会
22. 伊豆曹洞宗青年会
23. 静岡第三同志会
24. 静岡第四曹青・照自会
25. 愛知県第一曹洞宗青年会
26. 東三河曹洞宗青年会
27. 曹洞宗愛知県第三宗務所青年会
28. 三重県曹洞宗青年会
29. 三重県第二曹洞宗青年会
30. 滋賀県曹洞宗青年会
31. 京都曹洞宗青年会
32. 大阪曹洞宗青年会
33. 曹洞宗兵庫県第二宗務所青年会
34. 奈良県曹洞宗青年会
35. 和歌山県曹洞宗青年会
36. 曹洞宗鳥取県青年会
37. 石見曹洞宗青年会
38. いずも曹洞宗青年会
39. 岡山県曹洞宗青年会
40. 広島県曹洞宗青年会
41. 山口県曹洞宗青年会
42. 四国地区曹洞宗青年会
43. 福岡県曹洞宗青年会
44. 佐賀県曹洞宗青年会
45. 長崎県曹洞宗青年会
46. 熊本県曹洞宗青年会
47. 大分県曹洞宗青年会
48. 宮崎県曹洞宗青年会
49. 鹿児島県曹洞宗青年会
```

### 青年会名入力欄

SOUSEI NETWORK固定ページの青年会データ入力欄では、会名を手入力ではなく、固定掲載順リストから選ぶプルダウンにする。

- 固定ページ `sousei-network` の編集画面に表示する「青年会一覧」メタボックス内で、青年会名は select 要素にする。
- select の選択肢は `sousei_group_order_list` から生成する。
- option value には青年会名そのものを入れる。
- 表示ラベルも青年会名にする。
- 「青年会を選択」という空 option を先頭に追加する。

### フロント表示順

フロント表示では、固定掲載順リストに従ってカードを並べ替える。

- `_sousei_groups` に保存された各会データを読み込んだあと、`sousei_group_order_list` の順番に従って並び替える。
- タブ切り替えでフィルタした後も、この順番を維持する。
- 固定掲載順リストに存在しない会名が保存されていた場合は、最後に表示する。
- 同一会名が重複して保存されている場合は、同じ会名のカードが重複しないようにする。
- 重複時は最初の1件のみ採用する。

### デフォルト掲載順

初期状態で `sousei_group_order_list` が空の場合は、上記49件の固定掲載順リストをデフォルトとして使用する。

### 保存処理

保存時は以下を必ず行う。

- nonceチェック
- 権限チェック
- autosave除外
- revision除外
- URLは `esc_url_raw()` などでサニタイズ
- テキストは `sanitize_text_field()` などでサニタイズ
- 画像IDは整数化
- データは固定ページの post_meta `_sousei_groups` に保存

保存データのイメージ：

```php
[
  [
    'name' => '秋田県曹洞宗青年会',
    'thumbnail_id' => 123,
    'web' => 'https://example.com/akita',
    'youtube' => 'https://youtube.com/@akita',
    'instagram' => '',
    'x' => '',
    'facebook' => 'https://facebook.com/akita'
  ],
  [
    'name' => '青森県曹洞宗青年会',
    'thumbnail_id' => 456,
    'web' => 'https://example.com/aomori',
    'youtube' => '',
    'instagram' => 'https://instagram.com/aomori',
    'x' => '',
    'facebook' => ''
  ]
]
```

---

## 管理画面JS仕様

`assets/sousei-admin.js` を作成する。

### 必要な機能

- 青年会入力行の追加
- 青年会入力行の削除
- サムネイル画像の選択
- サムネイル画像のアップロード
- サムネイル画像のプレビュー更新
- サムネイル画像の削除

### メディアライブラリ

管理画面では `wp_enqueue_media()` を使用し、画像選択ボタンからWordPressメディアライブラリを開けるようにする。

---

## フロント表示仕様

`page-sousei-network.php` で `_sousei_groups` を読み込み、カード一覧を表示する。

---

## 全体デザイン

### 基本トーン

- 白背景を基調にする
- 黒ロゴ
- メインエリアは薄いグレー背景
- カードは白
- ミニマムデザイン
- 余白を広く取る
- サムネイルのみカラーで映える構成にする

### フォント

フォントは **Inter × Noto Sans JP** を使用する。

- 英字・タブ・UIラベル：Inter
- 日本語本文・会名：Noto Sans JP

Google Fontsから読み込む。

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+JP:wght@400;500;600;700&display=swap" rel="stylesheet">
```

CSS変数例：

```css
:root {
  --font-en: "Inter", sans-serif;
  --font-ja: "Noto Sans JP", sans-serif;
}
```

---

## ヘッダー仕様

### 表示内容

- 左側：SOUSEI NETWORK ロゴ
- ロゴ下：説明文
- 右側：ピクセルアート風キャラクター画像

説明文：

```text
全国曹洞宗青年会 / 加盟曹洞宗青年会 WEB & SNS LINK PORTAL
```

### 格子背景

ヘッダー部分の薄い格子背景は画像ではなくCSSで生成する。

- `linear-gradient` を使う
- 白背景に薄いグレーの格子を敷く
- 格子は主張しすぎない
- 線は `rgba(0,0,0,.03)` 程度
- 下方向へ自然に消えるように、疑似要素で白のグラデーションを重ねる

CSSイメージ：

```css
.sousei-hero {
  position: relative;
  background-color: #fff;
  background-image:
    linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
  background-size: 38px 38px;
}

.sousei-hero::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    rgba(255,255,255,0.1) 0%,
    rgba(255,255,255,0.65) 70%,
    #fff 100%
  );
}
```

---

## ロゴhover演出

- ヘッダーのメインロゴは通常時 `SOUSEI NETWORK` の英字ロゴを表示する。
- PC表示では、ロゴにhoverしたときだけ補助的にカタカナ表記を表示する。
- カタカナ表記は `ソウセイネットワーク` とする。
- 英字ロゴ自体は消さず、固定表示のままにする。
- カタカナは英字ロゴの下に小さく表示する。
- カタカナは Noto Sans JP を使用し、字間を広めにする。
- 表示は opacity と translateY を使って、ふわっと出す。
- スマホではhoverがないため、カタカナ表示は基本的に出さない。
- アニメーションは控えめにし、ブランドロゴの安定感を崩さない。

---

## タブ仕様

タブは以下の5種類。

```text
WEB / YouTube / Instagram / X / Facebook
```

### 基本挙動

- 現在アクティブなタブの下には、下線とそのサービスのSNSアイコンを表示する。
- タブにhoverしたときは、そのタブの下に該当サービスのSNSアイコンを一時的に表示する。
- hover時はプレビュー表示のみで、カード一覧は切り替えない。
- hover時は下線を移動させない。
- タブをクリックしたときだけ、下線とアクティブアイコンがそのタブへ移動し、カード一覧を切り替える。
- 下線とアクティブアイコンの移動は transition で滑らかにする。
- hoverアイコンは opacity と translateY でふわっと表示する。
- スマホではhoverがないため、クリック時のみアクティブアイコンと下線を移動する。

### タブ切り替え時

タブをクリックすると、以下を行う。

1. 現在のアクティブサービスを更新
2. アクティブタブを更新
3. 下線をクリックしたタブの下へ移動
4. アクティブアイコンをクリックしたタブの下へ移動
5. 現在のサービスURLを持っている会だけを表示
6. カード一覧をフェード + translateY で切り替え
7. サムネイルまたはカードクリック先を現在アクティブなサービスURLに更新

### サービスアイコン

- WEB：globe
- YouTube：youtube
- Instagram：instagram
- X：x
- Facebook：facebook

SVGアイコンを使用すること。

---

## カード表示仕様

### PC / タブレット

各カードは以下を持つ。

- サムネイル画像
- 青年会名
- その会が持っているSNSアイコン一覧

### SNSアイコン表示

- 各カードには、その会がURLを持っているSNSアイコンだけを表示する。
- URLがないSNSアイコンは表示しない。
- 通常時、SNSアイコンはすべてグレーで表示する。
- カードにhoverすると、その会が持っているSNSアイコンがすべてブランドカラーになる。
- SNSアイコンをクリックすると、その会のそのSNSサービスURLへ遷移する。
- SNSアイコンのクリックは、カードやサムネイルのクリックイベントと干渉しないようにする。

### SNSブランドカラー

```text
WEB: #111111
YouTube: #ff0000
Instagram: #d62976
X: #111111
Facebook: #1877f2
```

### サムネイルクリック

- サムネイル部分をクリックすると、現在アクティブなタブのサービスURLへ遷移する。
- 例：YouTubeタブ中なら、その会のYouTube URLへ遷移する。

### タブ内表示

- タブ内では、そのサービスURLを持っている会だけ表示する。
- 例：YouTubeタブではYouTube URLがある会だけ表示する。

---

## カードhover演出

PCではカードhover時に以下を行う。

- カードが少し上に浮く
- ドロップシャドウを強くする
- サムネイル画像を少し拡大する
- サムネイル画像の彩度を上げる
- その会が持っているSNSアイコンをすべてブランドカラーにする

通常時のサムネイルは少し彩度を下げる。

CSS filter の目安：

```css
/* 通常時 */
filter: saturate(0.78) brightness(0.98);

/* hover時 */
filter: saturate(1.12) brightness(1.02);
```

---

## カード切り替えアニメーション

タブ切り替え時、カード一覧は以下のように切り替える。

- opacity を下げる
- translateY で少し下にずらす
- 新しいカード一覧を描画
- opacity を戻す
- translateY を戻す

目安：

```css
.sousei-card-grid {
  transition: opacity .28s ease, transform .28s ease;
}

.sousei-card-grid.is-changing {
  opacity: 0;
  transform: translateY(10px);
}
```

---

## レスポンシブ仕様

### PC

- ヘッダーはロゴ左、キャラクター右
- カードは3カラム
- カード内にSNSアイコンを表示
- hover演出あり

### タブレット

- カードは2カラム
- ヘッダーは左右配置のまま、余白を調整

### スマホ

767px以下では以下の仕様にする。

- カードは1列表示
- 各会カード内のSNSアイコン一覧は非表示
- カードは「サムネイル + 会名」のみのシンプルな縦型カードにする
- サムネイルと会名部分は一体のカードとして見えるようにする
- カード全体、またはサムネイル部分クリックで、現在アクティブなタブのサービスURLへ遷移する
- タブ切り替えでは、現在のサービスURLを持っている会だけ表示する
- hover演出に依存せず、`:active` 時に軽く縮む程度の反応にする
- タブは横スクロール可能にする
- ロゴhoverのカタカナ表示は出さない

---

## 静的プロトタイプのデータ構造

静的版では以下のような仮データ配列を使う。

```js
const groups = [
  {
    id: "akita",
    name: "秋田県曹洞宗青年会",
    thumbnail: "assets/thumb-akita.jpg",
    web: "https://example.com/akita",
    youtube: "https://youtube.com/@akita",
    instagram: "",
    x: "",
    facebook: "https://facebook.com/akita"
  },
  {
    id: "aomori",
    name: "青森県曹洞宗青年会",
    thumbnail: "assets/thumb-aomori.jpg",
    web: "https://example.com/aomori",
    youtube: "https://youtube.com/@aomori",
    instagram: "",
    x: "https://x.com/aomori",
    facebook: ""
  },
  {
    id: "miyagi",
    name: "宮城県曹洞宗青年会",
    thumbnail: "assets/thumb-miyagi.jpg",
    web: "https://example.com/miyagi",
    youtube: "https://youtube.com/@miyagi",
    instagram: "https://instagram.com/miyagi",
    x: "https://x.com/miyagi",
    facebook: "https://facebook.com/miyagi"
  }
];
```

---

## WordPress版の出力方針

`page-sousei-network.php` では、post_meta `_sousei_groups` を読み込んでカードを生成する。

### 出力時の注意

- `esc_html()`
- `esc_attr()`
- `esc_url()`
- `wp_get_attachment_image()`

を適切に使用する。

画像は `wp_get_attachment_image()` を使い、WordPressの `srcset` を活かす。

例：

```php
echo wp_get_attachment_image($thumbnail_id, 'medium_large', false, [
  'class' => 'sousei-card-img',
  'alt' => esc_attr($name),
]);
```

### data属性

フロントJSで扱いやすいように、カードに各URLをdata属性として出力する。

```html
<article
  class="sousei-card"
  data-web="..."
  data-youtube="..."
  data-instagram="..."
  data-x="..."
  data-facebook="..."
>
```

---

## アクセシビリティ

- タブはbutton要素で実装する
- 必要に応じて `aria-selected` を更新する
- 外部リンクは `target="_blank" rel="noopener noreferrer"` を付ける
- SNSリンクには `aria-label` を付ける
- 画像には青年会名をaltとして設定する
- キーボード操作でも最低限使えるようにする

---

## ファイル構成

```text
sousei-network-portal/
├─ README.md
├─ index.html
├─ style.css
├─ script.js
├─ page-sousei-network.php
├─ functions-sousei-network.php
├─ docs/
│  └─ design-reference.png
└─ assets/
   ├─ logo.svg
   ├─ sousei-network.css
   ├─ sousei-network.js
   └─ sousei-admin.js
```

---

## Codexへの依頼文

このREADMEの仕様に従って、まずGitHub Pagesでプレビューできる静的プロトタイプを実装してください。

静的版：

- `index.html`
- `style.css`
- `script.js`

静的版では、仮データ配列を使ってカード表示・タブ切り替え・hover演出・レスポンシブを確認できるようにしてください。

そのうえで、現在稼働中のWordPress親テーマに追加する組み込み用として以下も作成してください。

- `page-sousei-network.php`
- `functions-sousei-network.php`
- `assets/sousei-network.css`
- `assets/sousei-network.js`
- `assets/sousei-admin.js`

WordPress版では、固定ページ `sousei-network` の編集画面にだけ青年会一覧の独自メタボックスを表示し、データを `_sousei_groups` に保存してください。

既存テーマの `functions.php` には以下を追記する前提にしてください。

```php
require_once get_template_directory() . '/functions-sousei-network.php';
```

既存テーマ全体を置き換えず、親テーマに追加する差分として実装してください。

セキュリティとして、nonce、権限チェック、autosave除外、revision除外、サニタイズ、エスケープを適切に実装してください。

CSSクラス名、PHP関数名、JS関数名には `sousei_` または `sousei-` の接頭辞を付け、既存テーマとの衝突を避けてください。

---

## 注意

GitHub Pagesでは静的版だけ確認する。  
WordPress管理画面・PHPテンプレート・post_meta保存処理は、WordPress環境で確認する。

親テーマ直入れのため、テーマ更新時に追加コードが消える可能性がある。  
導入前とテーマ更新前には必ずバックアップを取る。
