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
            callback(undefined,  ' It is currently ' + body.current.temperature + ' degree Farenheit out. There is a ' + body.current.precip + '% chance of rain.')

        }

    })
}

module.exports = forecast
