console.log('Client Side javascript file');

//This is client side javascript.This runs on web browser. 
//The code that we write here is not something that we will be able to use in backend node script.
//To make http requests from client side javascript we are using fetch library.
//fetch is web api (browser based), and is not accessible in nodejs. 



const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    
    const searchQuery = searchInput.value;
    if(!searchQuery){
        console.log('Empty Search Query');
        return;
    }   
    messageOne.textContent = '';
    messageTwo.textContent = 'Loading';
    // Changing from http://localhost:3000/weather?address for heroku app.
    fetch(`/weather?address=${searchQuery}`)
    .then(response => response.json())
    .then((responseJson)=>{

        if(responseJson.error){
            messageOne.textContent = `Error`;
            messageTwo.textContent =responseJson.error;
            return;
        }
        console.log(responseJson);
        messageOne.textContent = `Location: ${responseJson.place}`;
        messageTwo.textContent =`Temperature: ${responseJson.temperature} °C. Forecast: ${responseJson.summary} `;
    })
    .catch((error)=>{
        console.log(error);
        messageOne.textContent =error;
        messageTwo.textContent ='';
    })
})