document.querySelectorAll(".hideShowEpisodes").forEach(element => {
  element.addEventListener("click", (element) => {
    document.querySelectorAll(".episodeContainer").forEach(element => {
      element.style.display = "none";
    });
    let temp = document.getElementsByClassName(element.target.id)
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].style.display == "none" || temp[i].style.display == "") {
        temp[i].style.display = "block"
      }

      else {
        temp[i].style.display = "none"
      }

    }


  });
});
//TODO Ricordati che devi finire di gestiree la logica per prendere il nome dal url
// Poi implmentare una richiesta per chiedere link e con quello poi farne un'altra per iniziare
//il donwload dell'episodio. Sorry for the italian!
document.querySelectorAll(".episodeContainer").forEach(element => {
  element.addEventListener("click", (element) => {
    // Get file name from url.
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      let json = JSON.parse(this.response)[0];
      console.log(this.respo)
      downloadFile(json)
    };
    xhr.open('GET', "/download/Chainsaw%20Man/1/2");
    xhr.send();
  });


});
function downloadFile(url) {
  // Get file name from url. Problem with this stuff doesn't appear
  //download on chrome only network tab dev tools
  /*var filename = url;
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';
  xhr.onload = function() {
      var a = document.createElement('a');
      a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
      a.download = filename; // Set the file name.
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      delete a;
  };
  xhr.open('GET', url);
  xhr.send();
  */



  //Problem with this approch doesn't download stuff
  //But open tab with direct link to vid3eo
  const anchorElement = document.createElement('a');

  anchorElement.setAttribute('href', `${url}`);

  console.log(anchorElement)

  anchorElement.setAttribute('download', 'nameToChange.mp4');
  document.body.appendChild(anchorElement);

  // trigger download manually
  //anchorElement.click();
  //anchorElement.remove();
  
  }