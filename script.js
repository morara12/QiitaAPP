fetch("https://qiita.com/api/v2/users/morara12/")
  .then((response) => response.json())
  .then((text) => console.log(text))
  .catch((error) => console.error(error));
  https://www.youtube.com/watch?v=pzIxzegWVu8&t=1469s
  // feach関数JSでHTTPリクエストを送って、HTTPレスポンスを受け取る仕組み/非同期処理
  // HTTPホームページのファイルとかを受け渡しするときに使うお約束事
  // HTTPリクエストホームページを見るときに、ホームページを見るときに使うソフト（Webブラウザ）から
  // ホームページのファイルが置いてあるコンピュータ（Webサーバ）に対して出される「このページをちょうだい」なお願いのこと
  // HTTPレスポンス（リクエストに対しての返答）
function Tabs() {
  const bindAll = function() {
    const tabElements = document.querySelectorAll('[data-tab]');
    for(var i = 0; i < tabElements.length ; i++) {
      tabElements[i].addEventListener('click', change);
    }
  }
  // bindあっちとこっちを紐付ける、関連付ける、割り当てること
 // data属性
  // dataとは(後ろは自由)
  //HTMLの要素にカスタムデータ(オリジナルの属性を作る)を追加するための属性
  //カスタムデータ属性における記述のきまり
  //1⃣データ属性に格納するデータは文字列である必要があります。
  //文字列であれば、自由に記述することができます。
  //2⃣他の要素名と被ってはいけません。
  //なので、class名をデータ属性として格納することは適切ではありません。
  // すべてのデータを選んでクリックしたら発動する

    // [data-tab]の[]⇒データ属性のすべてを選択
  const clear = function() {
    const tabElements = document.querySelectorAll('[data-tab]');
    for(var i = 0; i < tabElements.length ; i++) {
      tabElements[i].classList.remove('active');
      const id = tabElements[i].getAttribute('data-tab');
      document.getElementById(id).classList.remove('active');
      // console.log(document.getElementById(id).classList.remove('active'))
    }
  }
//getAttribute…属性の取得https://qiita.com/y-t0910/items/f6e01883b3569b7cb0ed
  const change = function(e) {
    clear();
    e.target.classList.add('active');
    //target…イベントが発生した要素を取得
    const id = e.currentTarget.getAttribute('data-tab');
    //currentTarget…常に実行中のアクションが登録された要素が取得される
    document.getElementById(id).classList.add('active');
  }
  bindAll();
}

// function fetchNormal(){
//   // 気象庁の今日の東京の天気API(JSON)
//   const url = 'https://qiita.com/api/v2/users/morara12/';
  
//   const promise = fetch(url);
//   promise
//     .then(response => response.json())
//     .then(jsondata => {
//         showResult("result: " + JSON.stringify(jsondata));
//     });
// }
Tabs();