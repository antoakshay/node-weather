const { title } = require('process');
const { log } = require('console');


const path = require('path')

const express = require('express');

const hbs = require('hbs');
const { get } = require('http');

const geoCodeFunctions = require('/home/anto/Documents/Work/Andrew Meid Node/web-server/utils/geocode')

const forecastFunctions = require('/home/anto/Documents/Work/Andrew Meid Node/web-server/utils/forecast')


// console.log(__dirname);
// console.log(path.join(__dirname , '../public'));

//Defining the paths

const publicDir = path.join(__dirname , '../public')

const hbsviews = path.join(__dirname , '../templates/views')

const partials = path.join(__dirname , '../templates/partials')

// console.log(publicDir);
console.log(hbsviews);

//The path.join() method in Node.js is used to join multiple segments of
// a path into a single path string, normalizing the resulting path.
// This is useful for creating cross-platform file paths since 
//it automatically handles different path separators

const app = express();

//setup views engine to hbs and setting up hbs

app.set('view engine' , 'hbs');

app.set('views' , hbsviews) //specifies where to look for hbs temps

hbs.registerPartials(partials) //making the hbs to look for partials


app.use(express.static(publicDir)) //serving only img right now
//beacuse we used 'hbs for express' module to serve up
//dynamic htmls


// app.use(express.static(publicDir))
//The app.use() method in Express.js is used to mount middleware functions 
//at the specified path.

//The express.static middleware is used to serve static files such as HTML,
// CSS, JavaScript, images, etc., from a directory. 
//This is particularly useful for serving assets for your web applications.

app.get('' , function (req , res ){

    res.render('index' , {

        title: 'Weather',

        name: 'A.joel'


    })
})

app.get('/about' , function (req , res){

    res.render('about' , {

        title: 'About Me',

        name: 'A.joel'
    })
})

app.get('/help' , function (req , res){

    res.render('help' , {

        title: 'Help',

       message : 'This is the help page :)',

       name: 'A.joel'
    })
})


app.get('/weather' , function (req ,res) {

    if (!req.query.address) {

    return res.send('Please provide a Address!')
    console.log(req.query.address);
}

const details = req.query.address

  geoCodeFunctions(details , function (error , data) {

        console.log('Geocode');
    
        if (error) {
             
            return res.send({error : error});
    
        } 
    
    
    
    
        
        forecastFunctions( data.latitude, data.longitude, function (error, forecastData) {

            console.log('forecast');

            if (error) {
    
                return res.send({error: error});
    
            }
    
    
    
            // res.json({

            //     location: data.location,
            //     data: forecastData

            // });
        res.send({

            location: data.location,
            data: forecastData,
            address: details

        })
    
      })
        
    } )

  


})


  





    

    // address: req.query.address







// app.get('/products', function(req ,res) {

//     if (!req.query.search) {

//        return res.send({

//             error: 'You must provide a search'

//         })


//     }

//     console.log(req.query.search);

//     res.send({

//         product : []

//     })

// })

app.get('/help/*' ,  function (req ,res) {

    res.render('error' , {
        helpmessage: 'Help article not found'
    } )

})

app.get('*' , function (req, res){

     res.render('error' , {
        message404: 'The page you were looking for not found'
     })

})

app.listen(8000, function ()  {
    
    console.log('Server running on port 8000');
});
