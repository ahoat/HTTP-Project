// News API call
const newsTitle = Array.from(document.querySelectorAll(".news-title"));
const newsImage = Array.from(document.querySelectorAll(".news-img"));
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
      console.log(data);
      newsSubTitle.innerHTML = `Top ${category} news`;
      newsTitle.forEach((title, index) => {
        title.innerHTML = data.articles[index].title;
      });
      newsImage.forEach((image, index) => {
        if (image.hasChildNodes() === false) {
          img = new Image(200);
          image.appendChild(img);
          img.src = data.articles[index].urlToImage;
          img.alt = "photograph from news article";
        } else {
          image.childNodes[0].src = data.articles[index].urlToImage;
          image.childNodes[0].src = "photograph from news article";
        }
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

getNews();

// Weather API
const submitBtn = document.querySelector(".submit-btn");
const searchbar = document.querySelector(".searchbar");
const temp = document.querySelector(".temp");
const conditions = document.querySelector(".conditions");
const openWeatherKey = "be955245690a12ec7d74434862d819af";
const city = document.querySelector(".city");
const errorMessage = document.querySelector(".error");

let defaultCity = "London";

function getWeather() {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&appid=${openWeatherKey}`
  )
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    // .then (console.log)
    .then((data) => {
      city.textContent = data.name;
      conditions.textContent = data.weather[0].description;
      temp.innerHTML = Math.floor(data.main.temp - 273.5) + " &#8451;";
    })
    .catch((error) => {
      console.log(`Error loading data for ${defaultCity}`);
    });
}

submitBtn.addEventListener("click", function () {
  console.log(searchbar.value);
  let searchCity = searchbar.value;
  city.textContent = searchCity;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${openWeatherKey}`
  )
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .then((data) => {
      city.textContent = data.name;
      conditions.textContent = data.weather[0].description;
      temp.innerHTML = Math.floor(data.main.temp - 273.5) + " &#8451;";
      errorMessage.textContent = ""
    })
    .catch((error) => {
          errorMessage.textContent = "Please enter a valid city"
          errorMessage.style.color = "red"
        }
      )
});

window.onload = getWeather();
