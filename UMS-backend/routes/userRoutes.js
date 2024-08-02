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
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", validateToken, currentUser);
router.use(validateToken);
router.route("/").get(getAllUser).post(createUser);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
