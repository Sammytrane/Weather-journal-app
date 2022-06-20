/* Empty JS object to act as endpoint for all routes */
let projectData = {};

/* Express to run server and routes */
const express = require('express');
/*path of node.js */
const path=require('path')
/* Start up an instance of app */
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
//Middleware is the function that have access to request  and response object
//it comes from 3rd party packages  as will as custom middle ware , call next middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

/* Initialize the main project folder*/
// app.use(express.static('website'));
app.use(express.static(path.join(__dirname,'website')));
//check first if there is a port in environment first
const PORT =process.env.PORT || 8000;
/* Spin up the server*/
const server = app.listen(PORT, ()=>console.log(`running on localhost: ${PORT}`));


// GET route
//======get All data from server to client side======
app.get('/allData', sendData);

function sendData (request, response) {
    //first test=> response.send("<p>Reham</p>");
    response.send(projectData);
    // make it clear every time
    console.log(projectData);
    projectData={};
};

// POST an data
//========send data to server from client side========
app.post('/addData', addData);

function addData (req,res){
    let data=req.body;
    console.log("server side data"+data);
    //push all data to main  array
    projectData={
        //date
        'date':data.date,
        //temperature
        'temp':data.temp,
        //feeling
        'feel':data.feel
    }
};

//Note: use => nodemon server.js
//npm install nodemon
