//Declare dependencies / variables

//HTTP framework for handling requests
const express = require('express');
//Instance of express framework
const app = express();
//DBMS Mysql
const mysql = require('mysql2');
//Cross origin Resource sharing
const cors = require('cors');
//enivronment variable doc
const dotenv = require('dotenv');

app.use(express.json());
app.use(cors());
dotenv.config();

//connection to the database
const db=mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

//Check if db connection works
db.connect((err) => {
    // If no connection
    if(err) return console.log("Error connecting to MySQL");

    //If connection works
    console.log("Connected to MySQL successfully as id: ", db.threadId)
});

// < Your code goes down here

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Data.ejs file is in views folder

app.get('/data', (req,res) => {

    // 1. Retrieve all patients
    db.query('SELECT * FROM patients', (err, results) =>{
        if (err){
            console.error(err);
            res.status(500).send('Error Retrieving Data')
        }else {
            //Dispaly the records to the browser
            res.render('data', {results: results});
        }
    });

    // 2. Retrieve all providers
    // db.query('SELECT * FROM providers', (err, results) =>{
    //     if (err){
    //         console.error(err);
    //         res.status(500).send('Error Retrieving Data')
    //     }else {
    //         //Dispaly the records to the browser
    //         res.render('data', {results: results});
    //     }
    // });

    // 3. Filter patients by First Name
    // db.query('SELECT * FROM patients', (err, results) =>{
    //     if (err){
    //         console.error(err);
    //         res.status(500).send('Error Retrieving Data')
    //     }else {
    //         //Dispaly the records to the browser
    //         res.render('data', {results: results});
    //     }
    // });
 
    // 4. Retrieve all providers by their specialty
    // Create a GET endpoint that retrieves all providers by their specialty
    // db.query('SELECT * FROM providers', (err, results) =>{
    //         if (err){
    //             console.error(err);
    //             res.status(500).send('Error Retrieving Data')
    //         }else {
    //             //Dispaly the records to the browser
    //             res.render('data', {results: results});
    //         }
    //     });

});

// < Your code goes up here

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);

    // Send a message to the browser
    console.log('Sending message to browser...');
    app.get('/', (req,res) => {
        res.send('Server started successfully!!');
    });

});