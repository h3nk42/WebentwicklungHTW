const express = require('express');
const planControl = require('../controllers/plans')
const passport = require('passport')
const {body} = require('express-validator');


const router = express.Router();


router.get(
    '/showOne',
    passport.authenticate('jwt',{session: false}),
    planControl.showOne);

router.get(
    '/showMany',
    planControl.showMany);

router.post(
    '/create',
    [
        body('name').not().isEmpty(),
            body('name').isLength({min: 1, max: 15})],
    passport.authenticate('jwt',{session: false}),
    planControl.create);

router.delete(
    '/deletePlan',
    passport.authenticate('jwt',{session: false}),
    planControl.destroy);




module.exports = router;
