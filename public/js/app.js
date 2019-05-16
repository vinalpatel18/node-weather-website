console.log('Client side JS');

const weatherForm = document.querySelector('form')
const cityname = document.querySelector('input')
const printweather = document.querySelector('#result')

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    
    printweather.textContent = 'Loading...'

    if(cityname.value.length == 0){
        console.log('Error :'+cityname.value)
        printweather.textContent = 'Enter city'     
    }
    else{
        fetch('/weather?city='+cityname.value).then((responce)=>{
        responce.json().then((data)=>{
        console.log(data)

        printweather.textContent =  "Location            : "+ data.response.Location + "\r\n"
        printweather.textContent += "Current temperature : "+ data.response.temperature + " \u{00B0}C\r\n"
        printweather.textContent += "Weather details     : "+ data.response.Current+  "\r\n"
        printweather.textContent += "Forecast            : "+ data.response.Forecast
        //printweather.textContent = JSON.stringify(weatherdetails,undefined,2)
    })
})
    }
    
})