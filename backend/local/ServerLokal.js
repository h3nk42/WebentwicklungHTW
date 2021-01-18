const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.use('/api', (req, res) => {
    res.send({
        userName: 'testguy',
        token: 'abcdefghijklmnopqrstuvwxyz'
    });
});

app.listen(3001, () => console.log('API is running on http://localhost:3001/api'));