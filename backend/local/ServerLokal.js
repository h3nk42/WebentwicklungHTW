const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.use('/api/auth/login', (req, res) => {
    res.send({
        userName: 'testguy',
        token: 'abcdefghijklmnopqrstuvwxyz'
    });
});

app.use('/api/auth/whoAmI', (req, res) => {
    res.send({
        data: {
            firstName: 'test',
            surName: 'guy',
            dateOfBirth: '2000-01-04',
        }
    });
});

app.use('/api/user/updateData', (req, res) => {
    res.send({
        firstName: 'testtwo',
        surName: 'guytwo',
        dateOfBirth: '2000-01-05',
    });
});

app.listen(3001, () => console.log('API is running on http://localhost:3001/api'));
