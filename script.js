document.addEventListener("DOMContentLoaded", getProfileInformation());

const profile = document.getElementById("profile-btn");
profile.addEventListener("click", () => getProfileInformation());

const articlelist = document.getElementById("article-lists-btn");
articlelist.addEventListener("click", () => getArticleList());
// articlelist.addEventListener("click", () => getProfileInformation());

const pass = document.getElementById("pass");
// pass.value
// ＜トークン呼び出しのための関数＞
async function  getToken(){
  const response  = await fetch('./config.json');
  const data = await response.json();

  return data.qiitaAccessToken;
}

async function getResponse(){
  const qiitaAccessToken = await getToken();

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${qiitaAccessToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  }

  return requestOptions
}

async function getArticleList(){
  const requestOptions = await getResponse();
  const response = await fetch("https://qiita.com/api/v2/authenticated_user/items", requestOptions)
  const data = await response.json();
}

async function getArticleList(){
  // const articleLists = document.getElementById("article-lists");

  const requestOptions = await getResponse();
  const response = await fetch("https://qiita.com/api/v2/authenticated_user/items", requestOptions)
  const data = await response.json();

  displayArticleLists(data)
  
  console.log(data)

}

function displayArticleLists(data){
  const titleArray  =  data.map((data) => data.title); 
  titleArray.forEach(title => articleListsCreateElement(title))
}

function articleListsCreateElement(title){
  const articleListsArea = document.getElementById("article-lists");

  const div = document.createElement("div");
  const articleListElement = document.createElement('p');
  const viewText = document.createTextNode(title);
  // 新しいテキスト作成

  articleListElement.appendChild(viewText);
  div.appendChild(articleListElement);
  articleListsArea.appendChild(div);

  return div
}

async function getProfileInformation(){
  const profileArea = document.getElementById("profile");
  console.log(pass.value)

  
  // https://qiita.com/andota05/items/fc1e340642be42ca47c0
  // throw文参考
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