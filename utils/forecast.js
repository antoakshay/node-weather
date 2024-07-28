const request = require('postman-request')

// const request = require('axios')

const foreCast = function (latitude , longitude, callback) {


    // const url = 'https://api.weatherbit.io/v2.0/current?lat='+ encodeURIComponent(latitude) +'&lon=' +encodeURIComponent(longitude) + '&key=f100452b3f124a1799181787a6ba610a&include=minutely&units=I'

    const url1 = 'http://api.weatherapi.com/v1/current.json?key=d606695594b34e67ba4140812242307&q='+ encodeURI(latitude)+','+encodeURI(longitude)

    //  const url2 = 'http://api.weatherapi.com/v1/current.json?key=d606695594b34e67ba4140812242307&q=37.7749,-122.4194'

    request({url : url1 , json : true} ,  function (error , response){

        if (error) {

            callback('Unable to connect to Weather service' , undefined)

        }

        else if (response.body.error) {

            callback('Unable to find location' ,  undefined)
        } 

        else {

            callback(undefined , {
                temperature : response.body.current.temp_f,

                apparentTemperature : response.body.current.feelslike_f,

                weatherOverview : response.body.current.condition.text
    
            })

        }

    })

}

// foreCast();

module.exports = foreCast;