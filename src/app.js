const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const port = process.env.PORT || 3000


//app.com
//app.com/home
//app.com/about
//app.com/help

console.log(__dirname)
console.log(__filename)
console.log(path.join(__dirname, '../public/index.html'))

//Define paths for Express config
const viewspath = path.join(__dirname, '../templates/views')
const publicDirPath = path.join(__dirname, '../public')
const partialspath = path.join(__dirname, '../templates/partials')

//Definde forecast and geocode api 
const geocodehttprequest = require('./utils/geocode.js');
const forecasthttprequest = require('./utils/forecast.js');

//set handlebar for express
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)

//setup static directory to server
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Get the weather details',
        name: 'Enter city name.'
    })
})
app.get('/app', (req, res) => {
    res.send('<h1 \'centre\' = true> Welcome to APP </h1> ')
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'bob',
        age: 21
    })
})
app.get('/help', (req, res) => {
    res.render('help')
})

app.get('/weather', (req, res) => {
    if (!req.query.city) {
        return res.send({
            Error: 'You have to provide City name as parameter'
        })
    } else {        
        geocodehttprequest(req.query.city, (error, { lat, log, location }={}) => {
            if (error) {
                return res.send({error})
            }            
            forecasthttprequest(lat, log, location, (error, response) => {
                if (error) {
                    return res.send({error})
                }
                return res.send({response})
            })
        })
    }
})

app.get('*', (req, res) => {
    res.render('error')
})


app.listen(port, () => {
    console.log('Server is up and runnig')
})