const auth = require('./auth');
const user = require('./user');
const plan = require('./plan');


module.exports = app => {
    app.use('/api/user', user);
    app.use('/api/auth', auth);
    app.use('/api/plan', plan);
};
