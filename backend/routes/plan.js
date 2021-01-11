const express = require('express');
const planControl = require('../controllers/plan')
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

router.delete(
    '/deletePlan',
    //[body('id').not().isEmpty().withMessage('planName is required')],
    passport.authenticate('jwt',{session: false}),
    planControl.deletePlan);

router.post(
    '/addUser',
    [
        body('userName').not().isEmpty().withMessage(' username is required')],
        passport.authenticate('jwt',{session: false}),
    planControl.addUser )

router.post(
    '/removeUser',
    [
        body('userName').not().isEmpty().withMessage(' username is required')],
    passport.authenticate('jwt',{session: false}),
    planControl.removeUser )

module.exports = router;
