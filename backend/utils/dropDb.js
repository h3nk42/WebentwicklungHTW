const mongoose = require('mongoose');
require('dotenv').config();
const Plan = require('../models/Plan')
const Task = require('../models/Task')
const User = require('../models/User')

const dbUri = process.env.MONGO_LOCAL_CONN_URL;

const dropDb = new Promise((resolve, reject)=> {
    mongoose.connect(dbUri, {useUnifiedTopology: true, useNewUrlParser: true})
        .then( res => {})
        .catch(error => {console.log(error)
            process.exit()
        })
    let dbConnection = mongoose.connection;
    dbConnection.once('open', () =>{});

    Plan.deleteMany({}, (err, res)=>{
        if(err) console.log(err)
        User.deleteMany({}, (err, res)=>{
        if(err) console.log(err)
        Task.deleteMany({}, (err, res)=> {
            if (err) console.log(err)
            console.log('dropped DB')
            resolve()
        })
    })
})
})
module.exports.dropDb = dropDb;


