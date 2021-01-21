<<<<<<< HEAD
const express = require("express");
const planControl = require("../controllers/plans");
const passport = require("passport");
const { body } = require("express-validator");
=======
const express = require('express');
const planControl = require('../controllers/plans')
const passport = require('passport')
const {body} = require('express-validator');
>>>>>>> 309f3e58d4d67d3882ada1058a41b554bb610dc8

const router = express.Router();

router.get(
  "/showOne",
  passport.authenticate("jwt", { session: false }),
  planControl.showOne
);

router.get("/showMany", planControl.showMany);

router.post(
  "/create",
  [body("name").not().isEmpty(), body("name").isLength({ min: 1, max: 15 })],
  passport.authenticate("jwt", { session: false }),
  planControl.create
);

router.delete(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  planControl.destroy
);

router.post(
  "/addUser",
  [body("userName").not().isEmpty().withMessage(" username is required")],
  passport.authenticate("jwt", { session: false }),
  planControl.addUser
);

router.post(
<<<<<<< HEAD
  "/removeUser",
  [body("userName").not().isEmpty().withMessage(" username is required")],
  passport.authenticate("jwt", { session: false }),
  planControl.removeUser
);
=======
    '/removeUser',
    [
        body('userName').not().isEmpty().withMessage(' username is required')],
    passport.authenticate('jwt',{session: false}),
    planControl.removeUser )
>>>>>>> 309f3e58d4d67d3882ada1058a41b554bb610dc8

module.exports = router;
