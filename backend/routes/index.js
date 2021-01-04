const auth = require('./auth');
const user = require('./user');
const plan = require('./plan');
const task = require('./task');

const authenticate = require('../middlewares/unused/authenticate');

module.exports = app => {
    app.use('/api/plan', plan);
    app.use('/api/task', task);
    app.use('/api/user', user);
    app.use('/api/auth', auth);
};
