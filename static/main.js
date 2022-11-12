let textArea = document.getElementById("searchBarAnime")
let suggestionArea = document.getElementById("suggestionContainer");


textArea.oninput = debounce(makeXhtmlRequest, 400);



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
    let json = [];
    try {
      json = JSON.parse(this.response)
    } catch (error) {
      suggestionArea.innerHTML += `<div class="card mb-3 suggestion">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="https://media.istockphoto.com/id/1131230925/vector/check-marks-red-cross-icon-simple-vector.jpg?s=612x612&w=0&k=20&c=8oNof6faYkfOn1O6CAOHwpSmAhq3IK9hY_D3icbaQps=" class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">                              
                  <p class="card-text">NESSUN ANIME TROVATO</p>
                </div>
              </div>
            </div>
          </div>`
      return;
    }
    
    if (json.length == 0) {
      suggestionArea.innerHTML += `<div class="card mb-3 suggestion">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="https://media.istockphoto.com/id/1131230925/vector/check-marks-red-cross-icon-simple-vector.jpg?s=612x612&w=0&k=20&c=8oNof6faYkfOn1O6CAOHwpSmAhq3IK9hY_D3icbaQps=" class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">                              
                  <p class="card-text">NESSUN ANIME TROVATO</p>
                </div>
              </div>
            </div>
          </div>`
      return;
    }
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

function toggleVisibilitySuggestion() {

}