const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7e514846f2bffa692706b213a3e28214&query='+ latitude + ',' + longitude + '&units=f'
    
    request({ url:url, json: true}, (error, { body }) => {
        if(error)
        {
            callback('unable to connect to weather Service', undefined)
        }
        else if (body.error)
        {
            callback('unable to find location', undefined)
        }
        else
        {
            callback(undefined,' The current Temperature is ' + body.current.temperature + ' degree Farenheit.There is a ' + body.current.precip + '% chance of rain.' + 'It feels like ' + body.current.feelslike + '  degrees out.Humidity is ' + body.current.humidity + '%')

        }

    })
}

module.exports = forecast
