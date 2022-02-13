// News API call
const newsTitle = document.querySelector(".news-title");
const newsImage = document.querySelector(".news-img");
let img;
const newsArtile = document.querySelector(".news-article");
const newsLink = document.querySelector(".news-link");

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
      console.log(data);
      newsTitle.innerHTML = data.articles[2].title;
      if (newsImage.hasChildNodes() === false) {
        img = new Image(200, 100);
        newsImage.appendChild(img);
      }
      img.src = data.articles[2].urlToImage;
      newsArtile.innerHTML = data.articles[2].content;
      newsLink.innerHTML = "Link to full article";
      newsLink.href = data.articles[2].url;
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
