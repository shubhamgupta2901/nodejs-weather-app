const express = require('express');
const location =require('./location');
const weather = require('./weather');
const path = require('path');
const hbs = require('hbs');

const app = express();
//dynamic port that will be provided by heroku. Reading it from process object. This only works on heroku and fails on local so we specify our own as well for local host.
const port = process.env.PORT || 3000;

//Note that the path of directory currently is src/app.js inside our project.
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//Setting handlebars engine to express 
app.set('view engine', 'hbs');
//Changing the views directory of hbs from project/views to project/templates/views
app.set('views', viewsPath);
//registering the hbs partials directory
hbs.registerPartials(partialsPath);

// Serve static content for the app from the “public” directory in the application directory
app.use(express.static(publicDirectoryPath));

//Routing
app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: ''
    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About',
        name: ''
    });
})

app.get('/help', (req,res)=>{
    res.render('help',{
        title: 'Help',
        name:'',
        help: 'Some help text here.'
    });
})

//weather api 
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
    res.render('404',{
        title: '404',
        name:'',
        text: 'Error 404: Page not found.'
    });
})

app.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
})