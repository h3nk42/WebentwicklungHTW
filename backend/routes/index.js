const auth = require("./auth");
const user = require("./user");
const plan = require("./plan");
const task = require("./task");

module.exports = (app) => {
  app.use("/api/user", user);
  app.use("/api/auth", auth);
  app.use("/api/plan", plan);
  app.use("/api/task", task);
};
