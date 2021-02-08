// メモ関数を定義
function memo() {
  // submitのidを取得、変数submitに代入
  const submit = document.getElementById("submit");
  // submitをclick時イベント発火
  submit.addEventListener("click",(e) => {
    // formがIdのフォーム要素の情報を代入する。
    const formData = new FormData(document.getElementById("form"));
    // XHRをXMLHttpRequestオブジェクトへ
    const XHR = new XMLHttpRequest();
    // リクエストの詳細を指定
    XHR.open("POST","/posts",true);
    // レスポンスタイプを指定
    XHR.responseType = "json";
    // フォーム要素を代入した変数を引数にsendで送信する
    XHR.send(formData);
    // 受信が成功した場合[onload]
    XHR.onload = () => {
      if (XHR.status != 200) {
        // XHR.statusが200出なかった場合エラーアラートを設定
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      // itemにレスポンスのレコードを代入
      const item = XHR.response.post;
      // 描画するhtml要素をIdで取得（表示する場所のId）
      const list = document.getElementById("list");
      // 入力フォームを取得（情報取得後入力フォームの情報を削除するため）
      const formText = document.getElementById("content");
      // 以下のHTML文が描画される
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
        // HTMLここまで
        // listに対してafterend(内部の最初の子要素の前)にHTMLを追加
      list.insertAdjacentHTML("afterend", HTML);
      // 入力フォームの文字をリセット
      formText.value = "";
    };
    // 標準設定を阻止する
    e.preventDefault();
  });
}
window.addEventListener("load", memo);