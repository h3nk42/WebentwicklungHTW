const ExtractJwt = require('passport-jwt').ExtractJwt
const Strategy = require('passport-jwt').Strategy

const User = require('../models/User');
require('dotenv').config();

const config = {
    passport: {
        secret: process.env.JWT_SECRET,
        expiresIn: 10000,
    }
}


exports.applyPassportStrategy = passport => {
    const options = {};
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    options.secretOrKey = config.passport.secret;
    passport.use(
        new Strategy(options, (payload, done) => {
            User.findOne({ userName: payload.userName }, (err, user) => {
                if (err) return done(err, false);
                if (user) {
                    return done(null, {
                        userName: user.userName,
                        _id: user._id,
                        plan: user.plan
                    });
                }
                return done(null, false, 'test');
            });
        })
    );
};
