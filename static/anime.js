document.querySelectorAll(".hideShowEpisodes").forEach(element => {
    element.addEventListener("click", (element) => {
        document.querySelectorAll(".episodeContainer").forEach(element=>{
            element.style.display = "none";
        });
        let temp = document.getElementsByClassName(element.target.id)
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].style.display == "none" || temp[i].style.display == "" ){
                temp[i].style.display ="block"
            }
                
            else {
                temp[i].style.display = "none"
            }
                
        }

        
    });
});

