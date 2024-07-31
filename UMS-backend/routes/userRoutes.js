const express = require("express");
const router = express.Router();
const {
  getAllUser,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userControllers");
const validateToken = require("../middleware/validationHandler");

// router.post();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.use(validateToken);
router.route("/me").post(currentUser);
router.route("/").get(getAllUser).post(createUser);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
