const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// @desc get all users
// @route Get /api/users/
// @access private
const getAllUserService = async (req, res) => {
  console.log("Starting getAllUserService");

  try {
    console.log("Attempting to fetch users from database");
    const users = await User.find();
    console.log("Users fetched successfully:", users);
    res.status(200).json(users);
  } catch (err) {
    console.error("Error in getAllUserService:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// @desc create user
// @route Post /api/users/
// @access private
const createUserService = async (req, res) => {
  try {
    const { name, email, phone, gender, role } = req.body;
    if (!name || !email || !phone || !gender || !role) {
      res.status(400);
      throw new Error("All Field are mandatory");
    }

    const hashedPassword = await bcrypt.hash("password123", 10);

    const user = await User.create({
      name,
      email,
      phone,
      gender,
      role,
      password: hashedPassword,
    });
    if (user) {
      res.status(201).json({
        _id: user.id,
        email: user.email,
        message: "User created successfully",
      });
    } else {
      res.status(400);
      throw new Error("User data is not valid");
    }
  } catch (err) {
    console.log(err);
  }
};

// @desc get user by id
// @route Get /api/users/:id
// @access private
const getUserByIdService = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error("User is not found");
    }
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// @desc update user by id
// @route Put /api/users/:id
// @access private
const updateUserService = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    console.log("Updateservice ===> ", user);
    if (!user) {
      res.status(404);
      throw new Error("User is not found");
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// @desc delete user by id
// @route Delete /api/users/:id
// @access private
const deleteUserService = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error("User is not found");
    }
    await User.deleteOne({ _id: req.params.id });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// @desc Register User
// @route Post /api/users/register
// @access public
const registerUserService = async (req, res) => {
  console.log("Req Body === >", req.body);
  try {
    const { name, email, phone, gender, password } = req.body;
    if (!name || !email || !phone || !gender || !password) {
      res.status(400);
      throw new Error("All Field are mandatory");
    }
    const availableUser = await User.findOne({ email });
    if (availableUser) {
      res.status(400);
      throw new Error("Email is already taken");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      phone,
      gender,
      password: hashedPassword,
      role: "user",
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        email: user.email,
        message: "Register is successfully",
      });
    } else {
      res.status(400);
      throw new Error("User data is not valid");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// @desc login user
// @route Post /api/users/login
// @access public
const loginUserService = async (req, res) => {
  try {
    console.log("Login attempt with body:", req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      console.log("Missing email or password");
      return res.status(400).json({ error: "All fields are mandatory" });
    }

    console.log("Searching for user with email:", email);
    const user = await User.findOne({ email });
    console.log("User search result:", user);

    if (!user) {
      console.log("No user found with email:", email);
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password validity:", isPasswordValid);

    if (!isPasswordValid) {
      console.log("Invalid password for user:", email);
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user._id,
        },
      },
      process.env.ACCESS_TOKEN_SERCET
      // { expiresIn: "30m" }
    );

    console.log("Login successful for user:", email);
    res.status(200).json({ accessToken });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// @desc current user
// @route Get /api/users/me
// @access private
const currentUserService = async (req, res) => {
  console.log("req user===>", req.user);
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ error: "Unauthorized. User not authenticated." });
    }
    res.json(req.user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllUserService,
  createUserService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
  registerUserService,
  loginUserService,
  currentUserService,
};
