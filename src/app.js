const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define Path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Shivam Prakash'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Shivam Prakash'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some Helpful Text',
        title: 'Help',
        name: 'Shivam Prakash'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Shivam Prakash',
        errorMessage: 'Help article not found'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address)
    {
        return res.send({
            error: 'You must provide some address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => { //{} here is empty object default value
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.serach) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: {}
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Shivam Prakash',
        errorMessage: 'Page not Found!!!'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
