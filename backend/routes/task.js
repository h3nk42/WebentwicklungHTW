const passport = require("passport");
const express = require("express");
const taskControl = require("../controllers/tasks");
const { body } = require("express-validator");

const router = express.Router();

router.get("/showMany", taskControl.showMany);

router.post(
  "/create",
  [
    body("name").not().isEmpty().withMessage("TaskName is required"),
    body("name").isLength({ min: 1, max: 18 }),
    body("pointsWorth").not().isEmpty().withMessage("pointsWorth is required"),
    body("pointsWorth")
      .isFloat({ min: 1, max: 100 })
      .withMessage("pointsWorth is required"),
  ],
  passport.authenticate("jwt", { session: false }),
  taskControl.create
);

router.delete(
  "/destroy",
  [body("taskId").not().isEmpty().withMessage("TaskId is required")],
  passport.authenticate("jwt", { session: false }),
  taskControl.destroy
);

module.exports = router;
