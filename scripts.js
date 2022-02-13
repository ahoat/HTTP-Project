// News API call
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
      //  console.log(data.articles[0].title);
      //  console.log(data.articles[0].urlToImage);
      //  console.log(data.articles[0].content);
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
