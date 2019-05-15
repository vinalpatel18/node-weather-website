console.log('Client side JS');

// fetch('http://puzzle.mead.io/puzzle').then((responce)=>{
//     console.log(responce.json().then((data)=>{
//         console.log(data)
//     }))
// })

// fetch('http://localhost:3000/weather?city=asdasdasdsdasdasdasdasdadasdasdsad').then((responce)=>{
//     responce.json().then((data)=>{
//         console.log(data)
//     })
// })


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
        const weatherdetails = {
            'Current temperature' : data.response.temperature + ' F',
            'Weather details' : data.response.Current,
            'Forecast': data.response.Forecast

        }
        printweather.textContent =  "Location            : "+ data.response.Location + "\r\n"
        printweather.textContent += "Current temperature : "+ data.response.temperature + " \u{00B0}F\r\n"
        printweather.textContent += "Weather details     : "+ data.response.Current+  "\r\n"
        printweather.textContent += "Forecast            : "+ data.response.Forecast
        //printweather.textContent = JSON.stringify(weatherdetails,undefined,2)
    })
})
    }
    
})