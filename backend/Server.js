
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
    process.env.HEROKU === 'true' ?
        app.use(logger('default'))
        :
        app.use(logger('dev'));


//=== 2 - INITIALIZE PASSPORT MIDDLEWARE

passportController.applyPassportStrategy(passport);

//=== 3 - CONFIGURE ROUTES
//Configure Route
require('./routes/index')(app);

// append /api for our http requests
    app.use('/api', router);


// WebSocket
const options = { transports: ["websocket", "polling"] }
const http = require('http').createServer(app);
const io = require('socket.io')(http, options);



io.on("connection", (socket) => {
    console.log("User has connected to Server");

    // receiving from client when connecting to WebSocket
    socket.on("userInfo", (userInfo) => {
        console.log("I GOT THE USER INFO " + userInfo);

        // joining specific room
        socket.join(userInfo.roomid);
        console.log("Socket joined " + userInfo.roomid);
    });

    socket.on("message", (message) => {
        // now is a js object
        const msg = JSON.parse(message);
        // sending to client of same room only
        io.to(msg.roomid).emit("message", message);
    });

    socket.on("disconnect", () => {
        console.log("User has disconnected from the Server");
    });

});


// launch our backend into a port
http.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));



module.exports = app;
