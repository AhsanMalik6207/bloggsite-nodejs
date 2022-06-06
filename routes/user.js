const express = require("express"),
  router = express.Router();
const Controller = require("../controllers/user");

router.post("/register", Controller.register);
router.post("/login",Controller.login);
router.post("/renewaccesstoken",Controller.renewaccesstoken);
router.get("/:id",Controller.getUser)
module.exports = router;
