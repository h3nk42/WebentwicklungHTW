const express = require('express');
const {body} = require('express-validator');
const multer = require('multer');
const passport = require('passport')


const userController = require('../controllers/users');

const router = express.Router();




router.post('/createUser',[
    body('userName').not().isEmpty().withMessage('Your username is required'),
    body('userName').isLength({min:4, max: 15}).withMessage('Your username is required'),
    body('password').not().isEmpty().withMessage('Your password is required'),
    body('password').isLength({min:5, max: 20})],
    userController.create)

router.get('/findAllUsers',[],userController.findAllUsers)

router.delete('/delUser',passport.authenticate('jwt',{session: false}), userController.delUser)



module.exports = router;
