
// document.addEventListener("DOMContentLoaded",getProfileInformation());

const profile = document.getElementById("profile-btn");
profile.addEventListener("click", () => getProfileInformation());

const articlelist = document.getElementById("article-lists-btn");
articlelist.addEventListener("click", () => getArticleList());

const tokenForm = document.getElementById("token-form");
// ＜トークン呼び出し＞
// async function  getToken(){
//   const response  = await fetch('./config.json');
//   const data = await response.json();

//   return data.qiitaAccessToken;
// }

// <トークンを発火>
async function getResponse(){
  // const qiitaAccessToken = await getToken();

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${tokenForm.value}`);
  console.log
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  }

  return requestOptions
}

//　<プロフィール情報を取得> /
async function getProfileInformation(){
  const profileArea = document.getElementById("profile");
  
  // https://qiita.com/andota05/items/fc1e340642be42ca47c0
  // throw文参考
  // divのクラスやIDを取得して、残っていたら、情報をスルーする
  // 情報取得できているかIFで作って、あればreturnさせる処理をする
  try{
    const requestOptions = await getResponse();
    const response = await fetch("https://qiita.com/api/v2/authenticated_user", requestOptions)
    const data = await response.json();

    //https://techplay.jp/column/469
  if (!profileArea.querySelector('.display-profile')){
    displayProfile(data); 
    }
  } catch (error) {
    console.error(error);
  }
}

// <プロフィール情報をhtml状に表示>
function displayProfile(result){
  // 古い情報を残っているため、ボタンをクリックするたび表示されてしまう
  const profileArea = document.getElementById("profile");

  // ＜大枠＞
  const profileWarraper = document.createElement("div");
  profileWarraper.classList.add("profile-warraper")
  profileArea.appendChild(profileWarraper)

  // <題目>
  const profileTitle = document.createElement('div');
  profileTitle.classList.add("profile-title")
  // pタグであることは重要ではない
  profileTitle.textContent = "Profile";
  profileWarraper.appendChild(profileTitle);

  
  // <アイコンの画像>
  // 画像取得方法URL
  // https://magazine.techacademy.jp/magazine/20738
  const div = document.createElement("div");
  div.classList.add("display-profile")
  profileWarraper.appendChild(div);
 
  const img = document.createElement('img');
    // result.icon_url にはアイコンのURLを格納
    // src.埋め込みたい画像へのパス
  img.src = result.profile_image_url;
  img.width = "100";
  img.height = "100";
  div.appendChild(img);
 
  // <ユーザーID、ユーザー紹介文の表示を整理するための枠>
  const profileIntroductionElement = document.createElement("div");
  profileIntroductionElement.classList.add("profile-introduction")
  div.appendChild(profileIntroductionElement)

  // <ユーザ名>
  const usernameElement= document.createElement('p');
  usernameElement.classList.add("username")
  // pタグであることは重要ではない
  usernameElement.textContent = ` ${result.id}`;
  profileIntroductionElement.appendChild(usernameElement);

  // 「pタグ」のクラスではなく要素を作っている
  // <ユーザー紹介>
  const userDescriptionElement = document.createElement('p');
  userDescriptionElement.classList.add("user-description")
  userDescriptionElement.textContent = `${result.description}`;
  profileIntroductionElement.appendChild(userDescriptionElement);
}


/* <記事一覧取得> */
async function getArticleList(){
  const articleListsArea = document.getElementById("article-lists");

  try{
    const requestOptions = await getResponse();
    const response = await fetch("https://qiita.com/api/v2/authenticated_user/items", requestOptions)
    const data = await response.json();

  if (!articleListsArea.querySelector('.article-lists-title')){
    displayArticleLists(data);
    }
  } catch (error) {
    console.error(error);
  }
  
}

// 記事一覧取得
function displayArticleLists(data){
  const articleListsArea = document.getElementById("article-lists");

  const div = document.createElement("div");
  div.classList.add("article-lists-title-warraper")
  articleListsArea.appendChild(div);
    // 記事一覧
  const articleListsTitle = document.createElement('p');
  articleListsTitle.classList.add("article-lists-title")
  articleListsTitle.textContent = "記事一覧";

  div.appendChild(articleListsTitle);

  const titleArray  =  data.map((data) => data.title); 
  titleArray.forEach(title => articleListsCreateElement(title))

  return div
}

function articleListsCreateElement(title){
  const articleListsArea = document.getElementById("article-lists");
  const articleListsTitleWarraper = document.getElementById("article-lists-title-warraper");


  // 記事の名前
  const div = document.createElement("div");
  const articleListElement = document.createElement('p');
  articleListElement.classList.add("title")
  // 新しい Text ノードを生成します。このメソッドは HTML 文字をエスケープ（文字化）するのに役立つ
  const viewText = document.createTextNode(title);

  // tagName で指定された HTML 要素を生成
  //  Element インターフェイスのプロパティで、呼び出された要素のタグ名を返す
  // Element(要素)とは、<p>要素の内容</p>のように「タグ」+「内容」の組み合わせ
  // ここでいうインターフェースとは
  // プロパティ(情報)、メソッド(処理のまとまり)などを定義しているもの。
  // 継承すると継承元で定義されているプロパティや、メソッドなどを参照・実行できる。
  articleListElement.appendChild(viewText);
  
  div.appendChild(articleListElement);
  articleListsArea.appendChild(div);

  return div
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
