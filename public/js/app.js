// console.log('Client Side js file is loaded');

// fetch('https://puzzle.mead.io/puzzle').then(function (response){

//     response.json().then(function (data){

//         console.log(data);

//     }) 

// })



const weatherForm = document.querySelector('form')

const search = document.querySelector('input')

const para1 = document.querySelector('#p1')

const para2 = document.querySelector('#p2')

const para3 = document.querySelector('#p3')




weatherForm.addEventListener('submit' ,  function (event){

    event.preventDefault()

    const location = search.value

    para1.textContent = 'Loading..'

    para2.textContent = '' 

    para3.textContent = ''




    fetch('http://localhost:8000/weather?address=' + location).then(function (response){

        if (!location) {

            // console.log('provide a location');
            para1.textContent = 'Provide a Location'

        }
    
        response.json().then(function(data){
    
                // console.log(data);
            if (data.error) {

                para1.textContent = data.error
                    
            } else if (!data.error){

                
                para2.textContent = 'Overall weather looks like ' + data.data.weatherOverview + ' :} '
                para1.textContent = 'The temperature is ' + data.data.temperature 
                para3.textContent = 'Location : ' + data.location
                // para2.textContent = JSON.stringify(data)

            }
    
            })
    
        
    
      
        
    
    })


    console.log(location);

})