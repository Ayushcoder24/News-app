fetchNews("india")

document.getElementById("home").addEventListener("click" , async(event) => {
    event.preventDefault();
    await fetchNews("india")
});

document.getElementById("politics").addEventListener("click" , async (event) => {
    event.preventDefault(); 
    await fetchNews("politics");
});

document.getElementById("sports").addEventListener("click" , async (event) => {
    event.preventDefault(); 
    await fetchNews("sports");
});

document.getElementById("finance").addEventListener("click" , async (event) => {
    event.preventDefault(); 
    await fetchNews("finance");
});

document.getElementById("fashion").addEventListener("click" , async (event) => {
    event.preventDefault(); 
    await fetchNews("fashion");
});


document.getElementById("searchForm").addEventListener("submit", async (event) => {
    event.preventDefault(); 
    let searchBox = document.getElementById("searchBox").value.trim();
    
    if (searchBox) {
        await fetchNews(searchBox);
    } else {
        alert("Please enter a search term.");
    }
});



async function fetchNews(query) {
    try {
        const response = await fetch(
            `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&apiKey=029783abd5b946c28064018a0e39c0f1`
        );

        const data = await response.json();
        console.log(data.articles);

        if (data.articles && data.articles.length > 0) {
            displayNews(data.articles);
        } 
        else if(query === "politics"){

        }
        else {
            document.getElementById("cards_container").innerHTML = `<p>No news found for "${query}"</p>`;
        }
    } catch (error) {
        console.error('Fetch News Error:', error);
        alert(`Error fetching the news: ${error.message}`);
    }
}


function displayNews(articles) {
    const newsContainer = document.getElementById("cards_container");
    newsContainer.innerHTML = articles
        .map((article) => `
            <div class="card">
                <img src="${article.urlToImage || "https://via.placeholder.com/150"}" alt="${article.title || "No Image"}">
                <div class="card-content">
                    <h2>${article.title || "Unknown Title"}</h2>
                    <p><strong>Author:</strong> ${article.author || "Unknown Author"}</p>
                    <p><strong>Published At:</strong> ${article.publishedAt ? new Date(article.publishedAt).toLocaleString() : "N/A"}</p>
                   <p>${article.description ? article.description.split(" ").slice(0, 30).join(" ") + "..." : "No description available."}</p>
                    <a href="${article.url || "#"}" target="_blank">Read more</a>
                </div>
            </div>
        `)
        .join("");
}

