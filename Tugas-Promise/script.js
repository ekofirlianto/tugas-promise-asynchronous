fetch(`https://newsapi.org/v2/everything?q=Apple&from=2022-04-12&sortBy=popularity&apiKey=f3c04669ca1b48e7811636d0985fa282`)
  .then((response) => response.json())
  .then((response) => {
    const news = response.articles;
    let cards = '';
    news.forEach((e) => (cards += ekoCards(e)));

    const newsContainer = document.querySelector('.news-container');
    newsContainer.innerHTML = cards;
  });

const formControl = document.querySelector('.form-control');
formControl.addEventListener('input', async function () {
  try {
    const inputKeyword = document.querySelector('.input-keyword');
    if (inputKeyword.value == '') {
      let emptyKeyword = `<div class = "emptyKeyword">Please enter something!</div>`;
      const newsContainer = document.querySelector('.news-container');
      newsContainer.innerHTML = emptyKeyword;
    } else {
      const news = await getNews(inputKeyword.value);
      updateNews(news);
    }
  } catch (err) {
    let noConnection = `<div class = "noConnection">Please check your internet connection and try again.</div>`;
    const newsContainer = document.querySelector('.news-container');
    newsContainer.innerHTML = noConnection;
  }
});

function getNews(keyword) {
  return fetch('https://newsapi.org/v2/everything?q=' + keyword + '&from=2022-04-12&sortBy=publishedAt&apiKey=f3c04669ca1b48e7811636d0985fa282')
    .then((response) => {
      // console.log(response);
      return response.json();
    })
    .then((response) => {
      console.log(response.articles);
      return response.articles;
    });
}

function updateNews(news) {
  let cards = '';
  news.forEach((e) => (cards += ekoCards(e)));

  const newsContainer = document.querySelector('.news-container');
  newsContainer.innerHTML = cards;

  if (cards === '') {
    let noNews = `<div class = "noNews">Content not found.</div>`;
    newsContainer.innerHTML = noNews;
  }
}

function ekoCards(e) {
  return `<div class="col-md-4 my-3">
<div class="card">
<img src="${e.urlToImage}" class="card-img-top" />
  <div class="card-body">
    <h5 class="card-title">${e.title}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${e.author} ${e.publishedAt}</h6>
    <p class="card-text">${e.description}</p>
    <a href="${e.url}" target = "_blank" class="btn btn-primary read-more-button">Read more...</a>
  </div>
  </div>
</div>`;
}
