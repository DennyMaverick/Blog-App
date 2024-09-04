const posts = [];

const postTitleInputElement = document.querySelector('.js-title-input');
const postTextInputElement = document.querySelector('.js-text-input');
const publicBtnElement = document.querySelector('.js-public-btn');
const postsElement = document.querySelector('.js-posts');
const errorPopupElement = document.querySelector('.js-error-popup');

let allowToPublic = true;

publicBtnElement.addEventListener('click', function () {
  const postFromUser = getPostFromUser();

  addPost(postFromUser);

  renderPosts();
});

function getPostFromUser() {
  const title = postTitleInputElement.value;
  const text = postTextInputElement.value;

  return {
    title: title,
    text: text,
  };
}

function addPost({title, text}) {
  posts.push({
    date: getCurrentDate(),
    title: title,
    text: text,
  });
}

function getPosts() {
  return posts;
}

function renderPosts() {
  const posts = getPosts();

  let postsHTML = '';
  posts.forEach(post => {
    postsHTML += `
      <li class='post'>
      <span class='post__date'>${post.date}</span>
      <h3 class='post__title'>${post.title}</h3>
      <p class='post__text'>${post.text}</p>
    </li>
    `;
  });

  postsElement.innerHTML = postsHTML;
}

function getCurrentDate() {
  const today = new Date();

  const day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
  const month =
    today.getMonth() + 1 < 10 ? '0' + parseInt(today.getMonth() + 1) : today.getMonth() + 1;
  const year = today.getFullYear();

  const hours = today.getHours();
  const minutes = today.getMinutes();

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}


postTitleInputElement.addEventListener('input', function () {
  checkValidInput();
})

postTextInputElement.addEventListener('input', function () {
  checkValidText();
});


function checkValidInput() {
  if (postTitleInputElement.value.length > 100) {
    errorPopupElement.innerHTML = 'Заголовок больше 100 символов';
    allowToPublic = false;
    forbidenBtn();
  } else {
    errorPopupElement.innerHTML = '';
    allowToPublic = true;
    forbidenBtn();
  }
}

function checkValidText() {
  if (postTextInputElement.value.length > 200) {
    errorPopupElement.innerHTML = 'Пост больше 200 символов';
    allowToPublic = false;
    forbidenBtn();
  } else {
    errorPopupElement.innerHTML = '';
    allowToPublic = true;
    forbidenBtn();
  }
}

function forbidenBtn() {
  if (allowToPublic === false) {

    publicBtnElement.disabled = true;
    publicBtnElement.style.cursor = 'not-allowed';
  } else {
    publicBtnElement.disabled = false;
    publicBtnElement.style.cursor = 'pointer';
  }
}