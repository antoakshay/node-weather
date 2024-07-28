const request = require('postman-request')

// const request = require('axios')


const  geoCode = function (address , callback) {

    // const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'  + encodeURIComponent(address) +  '.json?access_token=pk.eyJ1IjoiYW50b2xhemFydXM3IiwiYSI6ImNsejAxYmZubjE3bjkya3B6eWs3dnZiNHcifQ.GN57JS1C39IqcF0ayVqjJg&limit=1'

    //basically it converts the user input to a query string,(encodeURIComponent())
    // a format that browsers could understand.
    //For instance, spaces, commas, and other special characters can interfere with the correct
    // parsing of the URL. By using encodeURIComponent, you ensure that these characters are encoded in a way that browsers can correctly interpret.

    const url = 'https://api.geoapify.com/v1/geocode/search?text='+ encodeURI(address)+'&format=json&apiKey=d5fe0a78f88148309757fa7968d61dbd'


    request({url : url , json : true}, function (error , response){

       if (error) {

        callback('Unable to connect to geoapi ' , undefined)

       } else if (response.body.results.length === 0) {

        callback('Unable to find location. Try Another Search' , undefined)

       } else {

        callback(undefined , {

            latitude: response.body.results[0].lat,

            longitude : response.body.results[0].lon,

            location : response.body.results[0].formatted

        })

       }

    })
}



module.exports = geoCode