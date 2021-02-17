const inputText = document.getElementById('input-text');
const submit = document.getElementById('submit');
const result = document.getElementById('search-result');

inputText.addEventListener('keyup', function(e) {
    if (e.keyCode == 13) {
        submit.click();
    }
})

submit.addEventListener('click', searchThing)

function searchThing() {
    const inputValue = inputText.value;
    fetch(`https://bing-web-search1.p.rapidapi.com/search?q=${inputValue}&mkt=en-us&textFormat=Raw&safeSearch=Off&freshness=Day`, {
            "method": "GET",
            "headers": {
                "x-bingapis-sdk": "true",
                "x-rapidapi-key": "5716612158msh5790ecc694e3c2cp195ce3jsn4a340fe20d1f",
                "x-rapidapi-host": "bing-web-search1.p.rapidapi.com"
            }
        })
        .then(response => response.json())
        .then(data => {
            displayResult(data.webPages.value);
        })
        .catch(err => {
            console.error(err);
        });
}

function displayResult(items) {
    console.log(items)
    result.innerHTML = items.map(item => `
    <div class="container result">
    <div class="">
    <p>${item.displayUrl}</p>
    <a href="${item.url}"><h2>${item.name}</h2></a>
    <p> ${item.snippet}</p>
    </div>
    </div>
    `)
}