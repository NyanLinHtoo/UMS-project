const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userControllers");
const validateToken = require("../middleware/validationHandler");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", validateToken, currentUser);

module.exports = router;
