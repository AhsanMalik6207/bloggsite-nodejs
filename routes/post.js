const express = require("express");
router = express.Router();
const Controller = require("../controllers/post");
const checkAuthMiddleware = require('../middleware/check-auth');

router.get("/getAll", Controller.getAll);
router.get("/:id", Controller.getPost);
router.get("/category/:id",Controller.getPostbyCategory)
router.post("/:userId/:categoryId/create", checkAuthMiddleware.checkAuth, Controller.create);
router.delete("/:postId/delete", checkAuthMiddleware.checkAuth,Controller.delete);
router.put("/:postId/update", checkAuthMiddleware.checkAuth,Controller.update);

module.exports = router;
