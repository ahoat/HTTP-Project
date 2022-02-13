// News API call
let category = "top-headlines";
const newsKey = `39c143627cee481882724a0a7fa661f1`;
const newsUrl = `https://newsapi.org/v2/${category}?country=gb&apiKey=${newsKey}`;

function getNews() {
  fetch(newsUrl)
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .then((data) => {
      console.log(data.articles[0].title);
      console.log(data.articles[0].urlToImage);
      console.log(data.articles[0].content);
    })
    .catch((error) => console.log(error));
}
