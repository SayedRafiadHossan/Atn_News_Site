const loadNews = async (search, dataLimit) => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/categories`
        const res = await fetch(url);
        const data = await res.json();
        displayNews(data.data.news_category, dataLimit);
    }
    catch {

    }
}

const displayNews = (allNews, dataLimit) => {
    const newsContainer = document.getElementById('news-btn');
    const navberDiv = document.createElement('div');
    navberDiv.innerHTML = `
    <nav class="navbar bg-base-100">
        <div class="">
            <div class="dropdown">
                <label tabindex="0" class="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </label>
                <ul tabindex="0"
                    class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    <li><button>Home</button></li>
                    <li><button>Breaking News</button></li>
                    <li><button>Regular news</button></li>
                    <li><button>International News</button></li>
                    <li><button>Sports</button></li>
                    <li><button>Entertainment</button></li>
                    <li><button>Culture</button></li>
                    <li><button>Arts</button></li>
                    <li><button>All News</button></li>
                </ul>
            </div>
        </div>
        <div class="w-full hidden lg:flex">
            <ul class="menu menu-horizontal p-0 lg:container lg:mx-auto">
                <li class="lg:mr-16"><button ">Home</button></li>
                <li class="lg:mr-16"><button onclick="loadNewsDetails('${allNews[0].category_id}')">${allNews[0].category_name}</button></li>
                <li class="lg:mr-16"><button onclick="loadNewsDetails('${allNews[1].category_id}')">${allNews[1].category_name}</button></li>
                <li class="lg:mr-16"><button onclick="loadNewsDetails('${allNews[2].category_id}')">${allNews[2].category_name}</button></li>
                <li class="lg:mr-16"><button onclick="loadNewsDetails('${allNews[3].category_id}')">${allNews[3].category_name}</button></li>
                <li class="lg:mr-16"><button onclick="loadNewsDetails('${allNews[4].category_id}')">${allNews[4].category_name}</button></li>
                <li class="lg:mr-16"><button onclick="loadNewsDetails('${allNews[5].category_id}')">${allNews[5].category_name}</button></li>
                <li class="lg:mr-16"><button onclick="loadNewsDetails('${allNews[6].category_id}')">${allNews[6].category_name}</button></li>
                <li class="lg:mr-16"><button onclick="loadNewsDetails('${allNews[7].category_id}')">${allNews[7].category_name}</button></li>
            </ul>
        </div>
    </nav>
    `;
    newsContainer.appendChild(navberDiv);
    console.log(news);

}

const loadNewsDetails = async category_id => {
    toggleSpinner(true);
    const url = ` https://openapi.programming-hero.com/api/news/category/${category_id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = idNumber => {
    const newsShows = document.getElementById('news-container');
    newsShows.innerHTML = '';
    idNumber.forEach(news => {
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
        <div class="card lg:card-side bg-base-200 shadow-xl mb-7">
            <figure><img class="w-96" src="${news.thumbnail_url}" alt="Album"></figure>
            <div class="card-body">
                    <h2 class="card-title">${news.title}</h2>
                    <p class="">${news.details} </p>
                    <div class="card-actions justify-between items-center mt-8 lg:mt-0">
                        <div class="flex mb-10 lg:mb-0">
                            <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                                <div class="w-10 rounded-full">
                                    <img src="${news.author.img}" />
                                </div>
                            </label>
                            <div class="ml-2 lg:ml-5">
                                <p>${news.author.name}</p>
                                <p>${news.author.published_date}</p>
                            </div>
                        </div>

                        <div class="flex mb-10 lg:mb-0">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>

                            <p class="ml-3"> ${news.total_view}M</p>
                        </div>
                        <div class="rating">
                            <input type="radio" name="rating-1" class="mask mask-star" />
                            <input type="radio" name="rating-1" class="mask mask-star" checked />
                            <input type="radio" name="rating-1" class="mask mask-star" />
                            <input type="radio" name="rating-1" class="mask mask-star" />
                            <input type="radio" name="rating-1" class="mask mask-star" />
                        </div>
                        <label class="btn modal-button"><i class="fa-solid fa-arrow-right"></i></label>
                    </div>
            </div>
        </div>

    `;
        newsShows.appendChild(newsDiv);
        toggleSpinner(false);
    });
    // stop spiner

}

// Loader---------------
const toggleSpinner = isLoading =>{
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('hidden');
    }
    else{
        loaderSection.classList.add('hidden');
    }
}
// Loader End---------------

loadNewsDetails();
loadNews();