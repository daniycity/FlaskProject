let textArea = document.getElementById("searchBarAnime")
textArea.onkeypress = debounce(makeXhtmlRequest, 400);

let suggestionArea = document.getElementById("suggestionContainer");

function debounce(cb, interval, immediate) {
    var timeout;

    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) cb.apply(context, args);
        };

        var callNow = immediate && !timeout;

        clearTimeout(timeout);
        timeout = setTimeout(later, interval);

        if (callNow) cb.apply(context, args);
    };
};


function makeXhtmlRequest() {
    let animeToSearch = textArea.value;
    console.log(animeToSearch);
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        suggestionArea.innerHTML = ""; //reset initial value
        let json = JSON.parse(this.response)
        console.log(json[0].img)
        json.forEach(element => {
            suggestionArea.innerHTML += `<div class="card mb-3 suggestion">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${element.img}" class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">                              
                  <p class="card-text">${element.name}</p>
                </div>
              </div>
            </div>
          </div>`
        });


    }
    xhttp.open("GET", "./search/" + animeToSearch);
    xhttp.send();
}

function updateSuggestion(jsonResponse) {

}