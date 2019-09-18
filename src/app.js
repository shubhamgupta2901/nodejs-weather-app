const express = require('express');

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

app.get('*',(req,res)=>{
    res.send({
        component: '404',
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000');
})