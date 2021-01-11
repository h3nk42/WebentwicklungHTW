const auth = require('./auth');
const user = require('./user');



module.exports = app => {
    app.use('/api/user', user);
    app.use('/api/auth', auth);
};
