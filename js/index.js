let area = document.getElementById("area");
let cloud = document.querySelectorAll(".cloud img");
let header = document.querySelector("header");
let svg = document.querySelector("svg path");
let sun = document.querySelector(".sun");
let cardHeader = document.querySelectorAll(".card-header");
let cardTitle = document.querySelectorAll(".card-title");
let cardTitle1 = document.querySelector(".card-title1");
let city = document.getElementById("city")
let findBtn = document.querySelector("button");



// Day names array
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


if (city.value.trim() === "") {
  city.value = "Egypt";
  fetchData()
  clear();
}

city.addEventListener("input", () => {
  if (city.value !== "") {
    fetchData();
  }
});

findBtn.addEventListener("click", ()=>{
  console.log(city.value);
  fetchData()
  clear();
});



function fetchData (){
  
 
    // Fetch weather data
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=9df45e3095b64668bf7203620241612&q=${city.value}&days=7`)
      .then((res) => res.json())
      .then((data) => {
        const location = data.location.name;
        const tempC = data.current.temp_c;
        const condition = data.current.condition.text; 
        const iconUrl = data.current.condition.icon;

        area.innerHTML = `
        <h2>${location}</h2>
        <h3 class="fs-45">${tempC}°C</h3>
        <h2>${condition}</h2>
      `;
      
       cardTitle1.innerHTML = `
         <div class="">
         <h2 class="fs-2 mb-3">${location}</h2>
          <span class="fs-45 px-5">${tempC}°C</span>
         <img style"width: 30px;" src="${iconUrl}" alt="weather">
      
          <h6 class="my-3">${condition}</h6>
         </div>
        `;
        for (let i =0; i < 6; i++) {
          let today = new Date(); 
          let currentDayIndex = (today.getDay() + i) % 7; // Increment day index based on loop
         let dayName = days[currentDayIndex]; 

       const forecastDate = data.forecast.forecastday[i].date;
        const maxtemp_c = data.forecast.forecastday[i+1].day.maxtemp_c;
        const mintemp_c = data.forecast.forecastday[i+1].day.mintemp_c;
        const conditionForecast = data.forecast.forecastday[i+1].day.condition.text;
        const iconUrlForecast = data.forecast.forecastday[i+1].day.condition.icon;
        
         
        if( cardHeader[i]){
          cardHeader[i].innerHTML = `
            <h6>${dayName}</h6>
            <h6>${forecastDate}</h6>
          `;
        }
          
        
        if (cardTitle[i]){
          cardTitle[i].innerHTML = `
          <div class="text-center">
          <img style"width: 30px;" src="${iconUrlForecast}" alt="weather">
           <h3 class="fs-45">${maxtemp_c}°C</h3>
           <h3 class="fs-5">${mintemp_c}°C</h3>
           <h6>${conditionForecast}</h6>
          </div>
         `;
        }

        }


  sun.classList.add("d-none");
        
  if (condition.toLowerCase().includes("sun".toLowerCase())) {
    header.style.cssText = `background-image: linear-gradient(to top, #e0ffff, skyblue);`;
    svg.setAttribute("fill", "#e0ffff");
    sun.classList.remove("d-none");
    cloud.forEach((img) => {
      img.setAttribute("src", "imgs/s.png");
    });
    city.style.cssText = `background-image: linear-gradient(to right, #e0ffff, skyblue);`;
  } 
  else if (condition.toLowerCase().includes("cloud".toLowerCase()) || condition.toLowerCase().includes("rain".toLowerCase())) {
    header.style.cssText = `background-image: linear-gradient(to top, #ccc, #333);`;
    svg.setAttribute("fill", "#ccc");

    cloud.forEach((img) => {
      img.setAttribute("src", "imgs/cloud.png");
    });

    city.style.cssText = `background-image: linear-gradient(to right, #ccc, #333);`;
  }

  else if (condition.toLowerCase().includes("clear".toLowerCase()) || condition.toLowerCase().includes("rain".toLowerCase())) {
    header.style.cssText = `background-image: linear-gradient(to top, lightslategray, white, #212184);`;
    svg.setAttribute("fill", "lightslategray");

    cloud.forEach((img) => {
      img.setAttribute("src", "imgs/clear.png");
    });

    city.style.cssText = `background-image: linear-gradient(to right, white, lightslategray, #212184);`;
  }

  else{
    header.style.cssText = `background-image: linear-gradient(to top, #ccc, #333);`;
    svg.setAttribute("fill", "#ccc");

    cloud.forEach((img) => {
      img.setAttribute("src", "imgs/cloud.png");
    });

    city.style.cssText = `background-image: linear-gradient(to right, #ccc, #333);`;
  }

   

})

      
  }
  

function clear(){
  city.value =null;
}


