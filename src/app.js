const express = require('express');
const location =require('./location');
const weather = require('./weather');

const app = express();

app.get('',(req,res)=>{
    res.send({
        component: 'home',
    });
})

app.get('/about',(req,res)=>{
    res.send({
        component:'about',
    })
})

app.get('/help', (req,res)=>{
    res.send({
        component: 'help',
    })
})

app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Address Parameter is mandatory!'
        })
    }
    location.geocode(req.query.address,(error, geocodeResponse)=>{
        if(error){
            return res.send({
                error
            })
        }
        weather.forecast(geocodeResponse,(error,response)=>{
            if(error){
                return res.send({
                    error
                })
            }
            res.send(response)
        })
    })
})

app.get('*',(req,res)=>{
    res.send({
        component: '404',
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000');
})