let container  = document.getElementById("container");
let timeEl = document.getElementById("time");

let currentWeather = document.getElementById("weatherElements");
let dateEl  = document.getElementById("date");

let futureForecast = document.getElementById("futureForecast");



const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


setInterval(() =>{
   
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour  = time.getHours();
    const minute = time.getMinutes();
    const hoursIn12HrFormat = hour >= 13 ? hour%12: hour;
    const AMPM = hour>=12?"PM":"AM";

   timeEl.innerHTML = (hoursIn12HrFormat<10?'0'+hoursIn12HrFormat:hoursIn12HrFormat) +":"+(minute<10?'0'+minute:minute) +' '+ `<span id="Ampm">${AMPM}</span>` + `<div id="date">${days[day]} ${date}, ${months[month]}</div>`;
    
},1000)



let api  = "6da78a5f38a40675edfefb7fe493c974    "


function getCity(){
    let city = document.getElementById("city").value;

    console.log(city)
 
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=5&appid=${api}`)
    .then(res => res.json()).then(data=>{

            showWeatherData(data)
            })
}





//  function getWeather(){


//      navigator.geolocation.getCurrentPosition((success)=>{
             
//             let {latitude,longitude} = success.coords;
             
//            

        
//      })



// }

// getWeather()

function showWeatherData(data){

  console.log(data)

  let {sunrise,sunset} = data.city;
   let  {lat,lon}    = data.city.coord 
   console.log(lat,lon)
//   let {description,id} = data.current.weather[0];

 
  
let otherDayForcast = ``
  
  
   let daily = data.list;
   console.log(daily)

  

   daily.forEach( (item,idx)=>{
   
    if(idx===0){
           
    currentWeather.innerHTML = `
    <img src= http://openweathermap.org/img/wn//${item.weather[0].icon}@4x.png alt="weather-icon">
    <div class="currentWeather">${item.weather[0].description}</div>
    <div class="currentWeather" id="current-date">${item.dt_txt}</div>
    <div class="currentWeather">humidity</div>
    <div class="currentWeather">${item.main.humidity}</div>
    <div class="currentWeather">Pressure</div>
    <div class="currentWeather">${item.main.pressure}</div>
    <div class="currentWeather">sunrise</div>
    <div class="currentWeather">${window.moment(sunrise*1000).format('hh:mm:a')}</div>
    <div class="currentWeather">Sunset</div>
    <div class="currentWeather">${window.moment(sunset*1000).format('hh:mm:a')}</div>


    `
    }
    else{
       
       otherDayForcast += `<div class="futureweather">
       <img src=" http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" >      
       <div class="temp" id="futureDate">${item.dt_txt}</div>
       <div class="temp">day</div>
      <div class="temp">${Math.round(item.main.temp-273)} &#176C</div>
      <div class="temp">night</div>
      <div class="temp">${Math.round(item.main.feels_like-273)} &#176C</div>
      </div>  
     `
   }
   
   futureForecast.innerHTML = otherDayForcast;  
})


mapboxgl.accessToken = 'pk.eyJ1Ijoic3VtaXQ2MjQiLCJhIjoiY2t3dXJsYjlxMXNyYzJxcW9xMTBtOWJ3aSJ9.tqC0WmhAaJDpAVmGvj5l9Q';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center: [lon,lat],
zoom: 10,
});

 




}





