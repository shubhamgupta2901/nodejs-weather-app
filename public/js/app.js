console.log('Client Side javascript file');

//This is client side javascript.This runs on web browser. 
//The code that we write here is not something that we will be able to use in backend node script.
//To make http requests from client side javascript we are using fetch library.
//fetch is web api (browser based), and is not accessible in nodejs. 

fetch('http://localhost:3000/weather?address=Bangalore')
.then(response => response.json())
.then((responseJson)=>{
    console.log(responseJson);
})
.catch((error)=>{
    console.log(error);
})