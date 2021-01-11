const express = require('express');
const {check} = require('express-validator');


const authController = require('../controllers/auth');
const passport = require('passport');

const router = express.Router();

router.post('/login',  [
    check('userName').not().isEmpty(),
    check('password').not().isEmpty()],
    authController.login)

router.get('/whoAmI',passport.authenticate('jwt',{session: false}), authController.whoAmI)







module.exports = router;
