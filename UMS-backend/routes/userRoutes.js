const express = require("express");
const router = express.Router();
const {
  getAllUser,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");
const validateToken = require("../middleware/validationHandler");

router.use(validateToken);
router.route("/lists").get(getAllUser).post(createUser);
router.route("/add").post(createUser);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
