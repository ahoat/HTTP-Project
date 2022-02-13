// News API call
const newsTitle = Array.from(document.querySelectorAll(".news-title"));
const newsImage = Array.from(document.querySelectorAll(".news-img"));
let img;
const newsArtile = Array.from(document.querySelectorAll(".news-article"));
const newsLink = Array.from(document.querySelectorAll(".news-link"));

const newsSubTitle = document.querySelector(".top-x-stories");

let category = "entertainment";
const newsKey = `39c143627cee481882724a0a7fa661f1`;

function getNews() {
  fetch(
    `https://newsapi.org/v2/top-headlines?country=gb&category=${category}&apiKey=${newsKey}`
  )
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .then((data) => {
      newsSubTitle.innerHTML = `Top ${category} news`;
      newsTitle.forEach((title, index) => {
        title.innerHTML = data.articles[index].title;
      });
      newsImage.forEach((image, index) => {
        if (image.hasChildNodes() === false) {
          img = new Image(200);
          image.appendChild(img);
          img.src = data.articles[index].urlToImage;
        } else img.src = data.articles[index].urlToImage;
      });
      newsArtile.forEach((news, index) => {
        news.innerHTML = data.articles[index].description;
      });
      newsLink.forEach((link, index) => {
        link.innerHTML = "Link to full article";
        newsLink.href = data.articles[index].url;
      });
    })
    .catch((error) => console.log(error));
}

const categorybuttons = Array.from(document.querySelectorAll(".category"));

categorybuttons.forEach((button) =>
  button.addEventListener("click", (e) => {
    category = e.target.value;
    getNews();
  })
);

//getNews();
