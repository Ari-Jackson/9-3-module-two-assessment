/* <---------------------Selectors---------------------> */
let select = document.querySelector("#titles")

let movieDetails = document.querySelector("#display-info")

let showPeopleButton = document.querySelector("#show-people")
let showPeopleList = document.querySelector(".js-people-list")

let reviewField = document.querySelector("#review")
let reviewList = document.querySelector(".js-review-list")
let submitReviewButton = document.querySelector(".js-submit-review")

let resetButton = document.querySelector("#reset-reviews")

/* <---------------------Event Listeners---------------------> */
select.addEventListener("change", renderMovieDescription)
showPeopleButton.addEventListener("click", showPeople)
resetButton.addEventListener("click", resetReviewSection)
submitReviewButton.addEventListener("click", submitReview)

/* <---------------------Functions---------------------> */
/* <----------On load functions----------> */
async function fetchAllMovies(type){
    let baseURL = "https://resource-ghibli-api.onrender.com/"
    let endpoint= type
    
    let responseRaw = await fetch(baseURL + endpoint)
    
    let response = await responseRaw.json()
    
    return response
}

async function populateSelect(){
    let allMovies = await fetchAllMovies("films")
    
    allMovies.forEach(movie =>{
        const option = document.createElement('option')
        option.setAttribute("value", movie.id)
        option.textContent = movie.title
        
        select.append(option)
    })
}

async function run() {
    await populateSelect()   
}

setTimeout(run, 1000);
/* <----------On Change functions----------> */

async function renderMovieDescription(){
    const allMovieInfo = await fetchAllMovies("films")
    const movieInfo = allMovieInfo.find(movie => movie.id == select.value)
    
    movieDetails.innerHTML = ""

    if(!!movieInfo){
    const movieTitle = document.createElement("h3")
    movieTitle.textContent = movieInfo.title

    const movieReleseYear = document.createElement("p")
    movieReleseYear.textContent = movieInfo.release_date

    const movieDescription = document.createElement("p")
    movieDescription.textContent = movieInfo.description

    movieDetails.append(movieTitle, movieReleseYear, movieDescription)
    showPeopleButton.classList.remove("disabled")
    }
}
/* <----------On Click: Add Review----------> */
function submitReview(e){
    e.preventDefault()

    let reviewText = reviewField.value
    let listItem = document.createElement("li")
    let title =  document.querySelector("#display-info h3")

    if(!title){
        alert("Please select a movie first")
        return
    }

    listItem.innerHTML = `<strong>${title.textContent}: </strong> ${reviewText}`

    reviewList.append(listItem)
    reviewField.value = ""
}

/* <----------On Click: Review Reset----------> */
function resetReviewSection(){
    reviewList.innerHTML = ""
}

/* <----------On Click: Show List Button----------> */
async function showPeople(){
    const allPeopleInfo = await fetchAllMovies("people")

    const peopleInfo = allPeopleInfo.filter(person => {
        return person.films.some(film => film.includes(select.value))
    }) 
    
    peopleInfo.forEach(person => {
        let listItem = document.createElement("li")
        listItem.textContent = person.name
        showPeopleList.append(listItem)

        showPeopleButton.classList.add("disabled")
    })
}