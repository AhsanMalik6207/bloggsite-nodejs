const express = require("express"),
  router = express.Router();
const Controller = require("../controllers/userprofile");
const checkAuthMiddleware = require('../middleware/check-auth');

router.get('/:id',Controller.getUserprofile)
router.get('/getAll', Controller.getAll);
router.post('/:id',checkAuthMiddleware.checkAuth ,Controller.createorupdate);
router.delete("/:userprofileId/delete",Controller.delete);
module.exports = router;
