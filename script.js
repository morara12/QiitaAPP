const profile = document.getElementById("profile-btn");
profile.addEventListener("click", () => getProfileInformation());

const articlelist = document.getElementById("article-list-btn");
articlelist.addEventListener("click",() =>getArticleList());

const postBtn = document.getElementById("post-article-btn");
postBtn.addEventListener("click",() => postToQiita());

const tokenForm = document.getElementById("token-form");
// <トークン発火>
async function getResponse(){
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${tokenForm.value}`);

  return requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  }
}

// https://qiita.com/andota05/items/fc1e340642be42ca47c0
// throw文参考
// divのクラスやIDを取得して、残っていたら、情報をスルーする
// 情報取得できているかIFで作って、あればreturnさせる処理をする

//プロフィール情報を取得 
async function getProfileInformation(){
  try{
    const requestOptions = await getResponse();
    const response = await fetch("https://qiita.com/api/v2/authenticated_user", requestOptions);
    const item = await response.json();

    displayProfile(item);
  } catch (error) {
    console.error(error);
  }
}

// <受け取ったプロフィール情報表示＞
function displayProfile(item){
  // <アイコンの画像>
  // 画像取得方法URL
  // https://magazine.techacademy.jp/magazine/20738
  const profileImageUrl = document.getElementById('profile-image-url');
  profileImageUrl.src = item.profile_image_url;

  const username= document.getElementById('username');
  username.textContent  = item.id;

  const userDescription= document.getElementById('user-description');
  userDescription.textContent = item.description;
}

/* <記事一覧取得> */
async function getArticleList(){
  try {
    const requestOptions = await getResponse();
    const response = await fetch("https://qiita.com/api/v2/authenticated_user/items", requestOptions);
    const itemList = await response.json();

    displayArticleLists(itemList); 
  } catch (error) {
    console.error(error);
  }
}

// 記事一覧取得
const displayArticleLists = function (itemList){
  // remove親要素も含んで子要素を全削除
  // innerHTML親要素を含まず子要素全削除
  // クリックするたび記事一覧が増えるため、子要素全削除
  const articleListsArea = document.getElementById("article-list");
  articleListsArea.innerHTML = "";

  let contentHeader = document.querySelector("p.content-header");
  let wrapper = document.getElementById("article-list-title-wrapper");

  // 記事の大枠を取得
  // 記事の大枠がなければ、作成する
  if (wrapper === null){
    contentHeader  = document.createElement('p');
    contentHeader.className =  'content-header';
    contentHeader.textContent = "記事一覧";
    
    articleListsArea.appendChild(contentHeader);
    wrapper = document.createElement('div');
    wrapper.id = "article-list-title-wrapper";
    articleListsArea.appendChild(wrapper);
  }

  // 変数の中身を確認する。思い込みをしない
  itemList.forEach((item) => {
    // 関数も入れられる
    // itemで一括に送るとその先の処理でデータの中身を考える必要がある
    articleCreateElement(
      item.title,
      item.created_at,
      item.tags,
      item.likes_count,
      item.body,
      articleListsArea,
      wrapper,
      contentHeader
    )
  })
}

function articleCreateElement(title,created_at,tags,likes_count,body,articleListsArea,wrapper,contentHeader){
  // 記事の大枠
  const articleWrapper = document.createElement('div');
  articleWrapper.className = "article-waraper";

  // タイトル作成
  const article  = document.createElement('p');
  article.className =  'article';
  article.textContent = title;
  articleWrapper.appendChild(article);
  
  // 作成日の表示
  const createDay = document.createElement("div");
  createDay.className = "create-day";
  createDay.textContent = created_at.substring(0, 10);
  articleWrapper.appendChild(createDay);
  
  // タグの取得と表示
  const tagWrapper = document.createElement('div');
  tagWrapper.className = 'tags';

  tags.forEach((tags) => {
    const tagItem =document.createElement("div");
    tagItem.className = "tag";
    tagItem.textContent =tags.name;

    tagWrapper.appendChild(tagItem); 
  })

  articleWrapper.appendChild(tagWrapper);

  // いいねの取得と表示
  const likesCount = document.createElement("div");
  likesCount.classList.add("likes-count");
  likesCount.textContent = `♡ ${likes_count}`;

  articleWrapper.appendChild(likesCount);

  wrapper.appendChild(articleWrapper);
  
  articleWrapper.addEventListener("click",() =>
    getArticleDetail(
    wrapper,
    title,
    body,
    articleListsArea,
    tagWrapper,
    likesCount,
    createDay,
    contentHeader
  ));
}

function getArticleDetail(wrapper,title,body,articleListsArea,tagWrapper,likesCount,createDay,contentHeader){
  // 記事一覧を消す
  contentHeader.remove();
  wrapper.remove();
  
  // 記事詳細の大枠作成
  const articleWrapper = document.createElement('div');
  articleWrapper.className = "article-content";
  articleListsArea.appendChild(articleWrapper);

  // 戻るボタン作成
  let backBtn = document.createElement("button");
  backBtn.textContent = "戻る";
  backBtn.className = "back-btn";
  articleWrapper.appendChild(backBtn);

  backBtn.addEventListener("click",() =>getArticleList());

  // 記事のタイトル
  const article  = document.createElement('p')
  article.className =  'detail-article';
  article.textContent = title;
  articleWrapper.appendChild(article);
  
  // 作成日表示
  createDay.className ="article-create-day";
  articleWrapper.appendChild(createDay);

  // 記事の内容をマークダウン式でhtmlに読み替えるように変換
  const articleDetail = document.createElement("div");
  articleDetail.id = 'article-detail';
  const html = marked.parse(body);
  articleDetail.innerHTML = html;
  articleWrapper.appendChild(articleDetail);

  articleDetail.appendChild(tagWrapper);
  articleDetail.appendChild(likesCount);
}

function getNewPost() {
  const title = document.getElementById("enter-title").value;
  const tagsRaw = document.getElementById("tags").value.split(",");
  // split カンマを目印にデータを区切れる
  const body = easyMDE.value();
  // "name": "Ruby"とあるため、これがないと400エラーが起きる
  const tagsArray = tagsRaw.map(tag => ({
    name: tag
  }));

  const newPost = {
    "body": body,
    "tags": tagsArray,
    "title": title
  }
  return newPost;
}

// トークンの読み取り/json形式に変更
async function createRequestOptions(){
  const newPost = getNewPost(); 
  const myHeaders = new Headers();

  // "Authorization"仕様許可証みたいなもの
  myHeaders.append("Authorization", `Bearer ${tokenForm.value}`);

  // Content-Typeリクエストにおいては クライアントがサーバーに実際に送ったデータの種類を伝える
  // application/jsonフォーマットでデータが送信される。
  myHeaders.append("Content-Type", "application/json");

  // JSON.stringify　JSON形式に変換する
  const raw = JSON.stringify(newPost);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  return requestOptions;
}

// qiitaに投稿
async function postToQiita(){
  try{
    const requestOptions = await createRequestOptions();
    await fetch("https://qiita.com/api/v2/items", requestOptions);

    alert("投稿が完了しました！");
  } catch (error) {
    console.error(error);
  }
} 

function Tabs() {
  const bindAll = function() {
    const tabElements = document.querySelectorAll('[data-tab]');

    for(var i = 0; i < tabElements.length ; i++) {
      tabElements[i].addEventListener('click', change);
    }
  }

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
