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
            const strr = ' Current Temperature is ' + body.current.temperature + ' degree Farenheit.\n'
            const str1 =  'There is a ' + body.current.precip + '% chance of rain.\r'
            const str2 = '\rIt feels like ' + body.current.feelslike + ' degrees out.\n'
            const str3 = 'Humidity is ' + body.current.humidity + '%\n'
            const finalstr = strr + str1 + str2 + str3
            //const fstr = finalstr.split(".")
            callback(undefined, finalstr)
        }
    })
}

module.exports = forecast
