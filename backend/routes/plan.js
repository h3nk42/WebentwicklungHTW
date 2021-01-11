const express = require('express');
const planControl = require('../controllers/plans')
const passport = require('passport')
const {body} = require('express-validator');


const router = express.Router();


router.get(
    '/findPlanToOwner',
    passport.authenticate('jwt',{session: false}),
    planControl.findPlanToOwner);

router.get(
    '/findAllPlans',
    planControl.findAllPlans);

router.post(
    '/createPlan',
    [
        body('name').not().isEmpty(),
            body('name').isLength({min: 1, max: 15})],
    passport.authenticate('jwt',{session: false}),
    planControl.createPlan);




module.exports = router;
