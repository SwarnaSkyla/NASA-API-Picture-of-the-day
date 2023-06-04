
function getCurrentImageOfTheDay(){
    const your_api_key="nN8RXvSctHUcNQ19ebLW8Ofyh4st6VJ89z6BoawK";
    const currentDate = new Date().toISOString().split("T",1)[0];



    fetch(`https://api.nasa.gov/planetary/apod?date=${currentDate}&api_key=${your_api_key}`)
    .then(response=>response.json())
    .then(data=>{

        const imageContainer=document.getElementById("current-image-container");
        imageContainer.innerHTML=`
        <h1>NASA PICTURE OF THE DAY</h1>
        <img src="${data.url}" alt="${data.title}"
        <h3>${data.title}"</h3>
        <p>${data.explanation}</p>`;
    })
    .catch(error=>console.log(error));
}



function getImageOfTheDay(optDate){

    const your_api_key="nN8RXvSctHUcNQ19ebLW8Ofyh4st6VJ89z6BoawK";


    fetch(`https://api.nasa.gov/planetary/apod?date=${optDate}&api_key=${your_api_key}`)
    .then(response=>response.json())
    .then(data=>{

        const imageCotainer=document.getElementById("current-image-container");
        imageCotainer.innerHTML=`
        <h1>NASA Picture of the day</h1>
        <img src="${data.url}" alt="${data.title}"
        <h3>${data.title}"</h3>
        <p>${data.explanation}</p>` ;


        saveSearch(optDate);
        addSearchToHistory(optDate);
    })
    .catch(error=>console.log(error));
}


function saveSearch(date){
    const searchedelements=JSON.parse(localStorage.getItem("searchedelements"))|| [];
    searchedelements.push(date);

    localStorage.setItem("searchedelements",JSON.stringify(searchedelements));
}



function addSearchToHistory(date){

    const history=document.getElementById("search-history");
    const li=document.createElement("li");
    const links=document.createElement("a");
    links.href="javascript:void(0)";
    links.textContent=date;

    links.addEventListener("click",function (){
        getImageOfTheDay(date);
    });

    li.appendChild(links);
    history.appendChild(li);
}



document.getElementById("search-form").addEventListener("submit",function(event){
    event.preventDefault();
    const optDate=document.getElementById("search-input").value;
    getImageOfTheDay(optDate);
});


getCurrentImageOfTheDay();