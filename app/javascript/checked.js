function check() {
  // セレクタを指定
  const posts = document.querySelectorAll(".post");
  // 繰り返し処理
  posts.forEach(function (post) {
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    // クリックしたら起きるイベント発火
    post.addEventListener("click",() => {
      // getAttributeで属性値を取得後、postIdへ代入
      const postId = post.getAttribute("data-id");
      // オブジェクトの生成
      const XHR = new XMLHttpRequest();
      // HTTPメソッド、パス、非同期onoffを指定し、openメソッドでリクエストの詳細
      XHR.open("GET",`/posts/${postId}`,true);
      // responseTypeメソッドでレスポンスの形式を指定
      XHR.responseType = "json";
      // 送信
      XHR.send();
      // 送受信の時のイベントハンドラー
      XHR.onload = () => {
        // ステータスコードを読み取り、エラーの場合、アラートを作る
        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          // JSからの処理を抜け出す
          return null;          
        }
        // XHR.responseでレスポンスされてきたJSONにアクセス
        const item = XHR.response.post;
        // ビューの情報を切り替える
        if (item.checked === true) {
          post.setAttribute("data-check","true");
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }
      };
    });
  });
}
// 1000ミリ秒に一回check関数を行う
setInterval(check, 1000);