/* <---------------------Selectors---------------------> */
let select = document.querySelector("#titles")
let movieDetails = document.querySelector("#display-info")

/* <---------------------Event Listeners---------------------> */
select.addEventListener("change", renderMovieDescription)
/* <---------------------Functions---------------------> */


/* <----------On load functions----------> */
async function run() {
    async function fetchAllMovies(){
        let endpoint = "https://resource-ghibli-api.onrender.com/films/"
        
        let responseRaw = await fetch(endpoint)
        
        let response = await responseRaw.json()
        
        return response
    }
    // Add code you want to run on page load here
    
    async function populateSelect(){
        let allMovies = await fetchAllMovies()
        
        
        allMovies.forEach(movie =>{
            const option = document.createElement('option')
            option.setAttribute("value", movie.id)
            option.textContent = movie.title
            
            select.append(option)
        })
    }
    
    populateSelect()   
}
setTimeout(run, 1000);
/* <----------On Change functions----------> */

async function fetchSinlgeMovieInfo(e){
    let endpoint = "https://resource-ghibli-api.onrender.com/films/"
    
    let responseRaw = await fetch(endpoint + e.target.value)
    
    let response = await responseRaw.json()
    
    return response
}

async function renderMovieDescription(e){
    const movieInfo = await fetchSinlgeMovieInfo(e)
    console.log(movieInfo)

    movieDetails.textContent = ""

    const movieTitle = document.createElement("h3")
    movieTitle.textContent = movieInfo.title
    
    const movieReleseYear = document.createElement("p")
    movieReleseYear.textContent = movieInfo.release_date
    
    const movieDescription = document.createElement("p")
    movieDescription.textContent = movieInfo.description

    movieDetails.append(movieTitle, movieReleseYear, movieDescription )
    
}
