const posts = [];

const TITLE_VALIDATION_LIMIT = 100;
const TEXT_VALIDATION_LIMIT = 200;

const textLeftMessage = document.querySelector('.js-popup-text-left');

const postTitleInputElement = document.querySelector('.js-title-input');
const postTextInputElement = document.querySelector('.js-text-input');
const publicBtnElement = document.querySelector('.js-public-btn');
const postsElement = document.querySelector('.js-posts');
const errorPopupElement = document.querySelector('.js-error-popup');

let allowToPublic = true;

publicBtnElement.addEventListener('click', function () {
  if (postTitleInputElement.value && postTextInputElement.value) {
    const postFromUser = getPostFromUser();

    addPost(postFromUser);
    renderPosts();
  }

  checkEmptyTitleValue();
  checkEmptyTextValue();
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
    today.getMonth() + 1 < 10
      ? '0' + parseInt(today.getMonth() + 1)
      : today.getMonth() + 1;
  const year = today.getFullYear();

  const hours = today.getHours();
  const minutes = today.getMinutes();

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

postTitleInputElement.addEventListener('input', function () {
  validation();
  titleLengthValidation();
  checkEmptyTitleValue();
});

postTitleInputElement.addEventListener('focus', titleLengthValidation);
postTitleInputElement.addEventListener('blur', clearTextLeft);

postTextInputElement.addEventListener('input', function () {
  validation();
  textLengthValidation();
  checkEmptyTextValue();
});

postTextInputElement.addEventListener('focus', textLengthValidation);
postTextInputElement.addEventListener('blur', clearTextLeft);

function validation() {
  const titleLength = postTitleInputElement.value.length;
  const textLength = postTextInputElement.value.length;

  if (titleLength > TITLE_VALIDATION_LIMIT) {
    errorPopupElement.innerHTML = `Заголовок больше ${TITLE_VALIDATION_LIMIT} символов`;

    allowToPublic = false;
    forbidenBtn();
    return;
  }

  if (textLength > TEXT_VALIDATION_LIMIT) {
    errorPopupElement.innerHTML = `Текст больше ${TEXT_VALIDATION_LIMIT} символов`;

    allowToPublic = false;
    forbidenBtn();
    return;
  }

  errorPopupElement.innerHTML = '';
  allowToPublic = true;
  forbidenBtn();
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

function titleLengthValidation() {
  const titleLength = postTitleInputElement.value.length;
  let currentTitleLength = postTitleInputElement.value.length;
  if (titleLength <= TITLE_VALIDATION_LIMIT) {
    textLeftMessage.innerHTML = `Осталось ввести: ${
      TITLE_VALIDATION_LIMIT - currentTitleLength
    }`;
  }
}

function textLengthValidation() {
  const textLength = postTextInputElement.value.length;
  let currentTextLength = postTextInputElement.value.length;
  if (textLength <= TEXT_VALIDATION_LIMIT) {
    textLeftMessage.innerHTML = `Осталось ввести: ${
      TEXT_VALIDATION_LIMIT - currentTextLength
    }`;
  }
}

function checkEmptyTitleValue() {
  if (!postTitleInputElement.value) {
    postTitleInputElement.style.borderColor = 'red';
  } else {
    postTitleInputElement.style.borderColor = '#2b2b2b';
  }
}

function checkEmptyTextValue() {
  if (!postTextInputElement.value) {
    postTextInputElement.style.borderColor = 'red';
  } else {
    postTextInputElement.style.borderColor = '#2b2b2b';
  }
}

function clearTextLeft() {
  textLeftMessage.innerHTML = '';
}


