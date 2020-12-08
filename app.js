let input = document.querySelector('#searchbar')
let history = []





let searchBtn = document.querySelector('i')

searchBtn.addEventListener('click', () => {
    let cityname = input.value
  
    history.push(cityname)

    console.log(history)
   
    for(let i = 0; i < history.length; i++) {
        if(history[i] != undefined) {
            const html = `
            <li>${history[i]}</li>
            `
            document.querySelector('.searchHistory').insertAdjacentHTML('beforeend', html)
            history.pop()
            input.value = ''
            document.querySelector('.main_5days_forcast ').innerHTML = ''
        }

        }
      
    
    getWeather(cityname)

  
    
   
})


input.addEventListener('input', () => {
   

  
    
})

  //accessing the date

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();

  today = dd + '/' + mm + '/' + yyyy;


//   async function success(pos) {
//     let crd = pos.coords;
//     let keyUV = '94615ea0e53712c2f2bb5bea884fe288'

  
//     console.log('Your current position is:');
//     console.log(`Latitude : ${crd.latitude}`);
//     console.log(`Longitude: ${crd.longitude}`);
//     console.log(`More or less ${crd.accuracy} meters.`);

//     let uvFetch = await fetch(`http://api.openweathermap.org/data/2.5/uvi/forecast?lat=${crd.latitude}&lon=${crd.longitude}&appid=${keyUV}`)
    
//     let response = await uvFetch.json()

//     console.log (response[0])
  

//     document.querySelector('.main_showcase .uv').innerHTML = `UV Index: ${response[0].value}`

//   }
  
//   function error(err) {
//     console.warn(`ERROR(${err.code}): ${err.message}`);
//   }
  


async function getWeather(city) {

    // navigator.geolocation.getCurrentPosition(success, error)

    
   
    const key = '94615ea0e53712c2f2bb5bea884fe288'

    const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&id=524901&appid=${key}&units=metric`)

    const json = await response.json()


  
    document.querySelector('.main_showcase h2').innerHTML = `${json.city.name}, ${json.city.country}  ${today} <img src="http://openweathermap.org/img/w/${json.list[0].weather[0].icon}.png">`
    document.querySelector('.main_showcase .summary').innerHTML = `Current weather in ${json.city.name} is ${json.list[0].weather[0].description}`

    document.querySelector('.main_showcase .temp').innerHTML = `Temperature: ${Math.floor(json.list[0].main.temp)} °C`
    document.querySelector('.main_showcase .humidity').innerHTML = `Humidity: ${json.list[0].main.humidity}%`
    document.querySelector('.main_showcase .wind').innerHTML = `Wind Speed: ${json.list[0].wind.speed} mph`

    console.log(json)
    let keyUV = '94615ea0e53712c2f2bb5bea884fe288'
    let lat = json.city.coord.lat
    let lon = json.city.coord.lon

    let uvFetch = await fetch(`http://api.openweathermap.org/data/2.5/uvi/forecast?lat=${lat}&lon=${lon}&appid=${keyUV}`)
    
    let responseUV = await uvFetch.json()

    document.querySelector('.main_showcase .uv').innerHTML = `UV Index: <span> ${responseUV[0].value} </span>`

   


console.log (responseUV[0])

if(responseUV[0].value <= 2) {
    document.querySelector('.main_showcase .uv span').style.backgroundColor = 'lime'

} else if(responseUV[0].value <= 5) {
    document.querySelector('.main_showcase .uv span').style.backgroundColor = 'yellow'
} else if(responseUV[0].value <= 7) {
    document.querySelector('.main_showcase .uv span').style.backgroundColor = 'orange'
} else if(responseUV[0].value <= 10) {
    document.querySelector('.main_showcase .uv span').style.backgroundColor = 'red'
} else {
document.querySelector('.main_showcase .uv span').style.backgroundColor = 'violet'

}

  
console.log(lat, lon)


forcasted(json)

}


getWeather()





const forcasted = (json) => {

    // if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(showPosition);
    //   } else { 
    //    console.log("Geolocation is not supported by this browser.")
    //   }


    // let UvUrl = 'http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}'

    // let lon = position.coords.longitude
    // let lat = position.coords.latitude
    // let key = '94615ea0e53712c2f2bb5bea884fe288'


    let list = json.list
    let time = list[0].dt_txt
    console.log(time.split('').slice(9))
   
    console.log(list)
    for(let i = 0; i < list.length; i +=8) {
        
          
        const html = 
    
        `<div class="card">
        <p>${list[i].dt_txt}</p>
        <img src="http://openweathermap.org/img/w/${list[i].weather[0].icon}.png">
        <p>Temp: ${Math.floor(list[i].main.temp)} °C</p>
        <p>Humidity: ${list[i].main.humidity}%</p>
        </div>
        `
        document.querySelector('.main_5days_forcast ').insertAdjacentHTML('beforeend', html)
        

    }
    

    
  
    

    // document.querySelector('.main .main_5days_forcast h2').innerHTML = html

    // console.log(html)

}

function showPosition(position) {
    let lat = position.coords.latitude 
    let long = position.coords.longitude;

    return lat, long
  }





forcasted()



// let tomorrow = new Date(;
//     tomorrow.setDate(new Date().getDate()+1);
    
//         console.log(tomorrow)


// for(let i = 0; i < json.list.length; i +8) {
//     const html = 

//     `<div class="card">
//     <p>${json.list[i].dt_txt}</p>
//     <img src="http://openweathermap.org/img/w/${json.list[i].weather[0].icon}.png">
//     <p>Temp: ${json.list[i].main.temp} °C</p>
//     <p>Humidity: ${json.list[i].main.humidity}%</p>
//     </div>
//     `
//     document.querySelector('.main .main_5days_forcast h2').insertAdjacentHTML('beforeend', html)
// }
