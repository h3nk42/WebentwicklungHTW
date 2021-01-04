
const passportController = require("./middlewares/passport");

const mongoose = require('mongoose');
const express = require('express');
let cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
require('dotenv').config();
const passport = require('passport');

// setting up db uri and api port
const dbUri = process.env.MONGO_LOCAL_CONN_URL;
const API_PORT = process.env.PORT || 3001;

//=== 1 - CREATE APP
const app = express();
// maybe not needed for android but defntl for a webpage
app.use(cors());


// connects our back end code with the database
mongoose.connect(dbUri, {useUnifiedTopology: true, useNewUrlParser: true})
    .then( () => {})
    .catch(error => {console.log(error)
        process.exit()
    })

mongoose.set("useCreateIndex", true);

let dbConnection = mongoose.connection;
dbConnection.once('open', () => console.log('connected to the database'));
// checks if connection with the database is successful
dbConnection.on('error', (error) => console.error.bind(console, 'MongoDB connection error:' + error));



const router = express.Router();

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(logger('dev'));

// this is our get method
// this method fetches all available data in our database

//=== 3 - INITIALIZE PASSPORT MIDDLEWARE

passportController.applyPassportStrategy(passport);
//app.use(passport.initialize());


//=== 4 - CONFIGURE ROUTES
//Configure Route
require('./routes/index')(app);

// append /api for our http requests
    app.use('/api', router);

// launch our backend into a port
    app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));



module.exports = app;
