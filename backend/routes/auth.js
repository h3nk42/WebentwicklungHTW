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






//not my stuff start
/*
router.post('/register', [
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('password').not().isEmpty().isLength({min: 6}).withMessage('Must be at least 6 chars long'),
    check('firstName').not().isEmpty().withMessage('You first name is required'),
    check('lastName').not().isEmpty().withMessage('You last name is required')
], validate, Auth.register);

router.post("/login", [
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('password').not().isEmpty(),
], validate, Auth.login);
*/



/*
//EMAIL Verification
router.get('/verify/:token', authController.verify);
router.post('/resend', authController.resendToken);
*/

//Password RESET
/*router.post('/recover', [
    check('email').isEmail().withMessage('Enter a valid email address'),
], validate, Password.recover);

router.get('/reset/:token', Password.reset);*/

/*router.post('/reset/:token', [
    check('password').not().isEmpty().isLength({min: 6}).withMessage('Must be at least 6 chars long'),
    check('confirmPassword', 'Passwords do not match').custom((value, {req}) => (value === req.body.password)),
], validate, Password.resetPassword);*/


module.exports = router;
