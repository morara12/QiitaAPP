document.addEventListener("DOMContentLoaded", getProfileInformation());

const profile = document.getElementById("profile-btn");
profile.addEventListener("click", () => getProfileInformation());

const articlelist = document.getElementById("article-lists-btn");
// articlelist.addEventListener("click", () => getProfileInformation());



// ＜トークン呼び出しのための関数＞
async function  getToken(){
  const response  = await fetch('./config.json');
  const data = await response.json();

  return data.qiitaAccessToken;
}


// async function profileInformationAcquisition (){
//   try{
//   const response  = await fetch('./config.json');
//   const data = await response.json();
//   console.log("data",data);
//   return data.qiitaAccessToken;
// }


async function getProfileInformation(){
  const profileArea = document.getElementById("profile");

  if (profileArea.querySelector('.display-profile')){
    return;
  }else{
    const qiitaAccessToken = await getToken();
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${qiitaAccessToken}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
    // https://ja.wikibooks.org/wiki/JavaScript/Headers
    // headers: myHeaders,
    // Headersオブジェクトは、Fetch APIを使用する際に、HTTPリクエストやレスポンスのヘッダー情報を操作するためのオブジェクト
    // 指定したキーを追加している
    // https://kde.hateblo.jp/entry/2018/10/22/010811
    //redirectリダイレクトが発生した場合どう処理するかについて指定する。
    // follow : リダイレクト先まで追従してリソースの取得を行う ※デフォルト
    try {
    const response = await fetch("https://qiita.com/api/v2/authenticated_user", requestOptions)
    const data = await response.json();

    console.log(data);
    displayProfile(data); 
    }catch(error){
        console.error(error);
    // https://www.youtube.com/watch?v=pzIxzegWVu8&t=1469s
    // feach関数JSでHTTPリクエストを送って、HTTPレスポンスを受け取る仕組み/非同期処理
    // HTTPホームページのファイルとかを受け渡しするときに使うお約束事
    // HTTPリクエストホームページを見るときに、ホームページを見るときに使うソフト（Webブラウザ）から
    // ホームページのファイルが置いてあるコンピュータ（Webサーバ）に対して出される「このページをちょうだい」なお願いのこと
    // HTTPレスポンス（リクエストに対しての返答）
    // 表示()
}}
}

function displayProfile(result){
  // 古い情報を残っているため、ボタンをクリックするたび表示されてしまう
  const profileArea = document.getElementById("profile");
  const div = document.createElement("div");
  div.classList.add("display-profile")
// divのクラスやIDを取得して、残っていたら、情報をスルーする
// 情報取得できているかIFで作って、あればreturnさせる処理をする


  const profileElement= document.createElement('p');
  profileElement.textContent = "profile";
  profileElement.classList.add("profile-element")

  const usernameElement= document.createElement('p');
  // pタグであることは重要ではない
  usernameElement.textContent = ` ${result.id}`;

  // 「pタグ」のクラスではなく要素を作っている
  const userDescriptionElement = document.createElement('p');
  userDescriptionElement.classList.add("user-description")
  userDescriptionElement.textContent = `${result.description}`;

  // https://magazine.techacademy.jp/magazine/20738
  const img = document.createElement('img');
  img.src = result.profile_image_url;  // result.icon_url にはアイコンのURLを格納
  // src.埋め込みたい画像へのパス
  img.width = "100";
  img.height = "100";

  div.appendChild(profileElement);
  div.appendChild(img);
  div.appendChild(usernameElement);
  div.appendChild(userDescriptionElement);

  profileArea.appendChild(div);
}

function displayArticleLists(){
  const profileArea = document.getElementById("article-lists");
  const div = document.createElement("div");
  div.classList.add("display-article-lists")

  const articleListsElement = document.createElement('p');
  articleListsElement.textContent = "記事一覧";
  articleListsElement.classList.add("display-article-lists-ement")



}


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

Tabs();