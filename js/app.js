let currentPage = 1;
let main = document.getElementById("main");
let pagination = document.getElementById("pagination");
// let form = document.getElementById("form");
// let search = document.getElementById("search-box");

const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const API_KEY = "7fc3ae038d16dfe93371a4e1d1e0e242";
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`;
const SEARCH_API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=`;
const MIN_PAGE = 1;
const MAX_PAGE = 100;

async function getMovies(url) {
  const resp = await fetch(url);
  const data = await resp.json();
  console.log(data);
  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
            <img src="${IMG_PATH + movie.poster_path}" alt="${movie.title}">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p class="${getClassByRate(movie.vote_average)}">${movie.vote_average}</p>
            </div>
        `;
    main.appendChild(movieEl);
  });
  loadPagination();
}

function loadPagination() {
  pagination.innerHTML = "";
  let pageNum = MIN_PAGE;
  if (currentPage > 3 && currentPage < 98) {
    pageNum = currentPage - 2;
  } else if (currentPage >= 98 && currentPage <= MAX_PAGE) {
    pageNum = 96;
  }
  for (let i = pageNum; i <= pageNum + 4; i++) {
    const movieEl = document.createElement("button");
    if(i == currentPage)
      movieEl.classList.add("active");
    movieEl.id = `page-${i}`;
    movieEl.innerHTML = i;
    pagination.appendChild(movieEl);
  }
}

pagination.addEventListener('click', (event) => {
  let id = event.target.id;
  if(id.startsWith("page-")) {
    currentPage = id.split("-")[1];
    console.log(currentPage);
    getMovies(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`);
  }
});

function getClassByRate(voteAverage) {
  if (voteAverage >= 8) return "green";
  else if (voteAverage >= 5) return "orange";
  else return "red";
}

// form.addEventListener("submit", (event) => {
//   event.preventDefault();
//   const searchText = search.value;
//   if(searchText) {
//     getMovies(SEARCH_API_URL + searchText);
//   }
// });

getMovies(API_URL);
