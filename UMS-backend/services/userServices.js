const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// @desc get all users
// @route Get /api/users/
// @access private
const getAllUserService = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
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
  }
};

// @desc update user by id
// @route Put /api/users/:id
// @access private
const updateUserService = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error("User is not found");
    }
    const updatedUser = await User.findByIdAndUpdate(req.body);
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
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
  }
};

// @desc Register User
// @route Post /api/users/register
// @access public
const registerUserService = async (req, res) => {
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
  }
};

// @desc login user
// @route Post /api/users/login
// @access public
const loginUserService = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("All Field are mandatory");
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(user.password, password))) {
      const accessToken = await jwt.sign(
        {
          user: {
            username: user.username,
            email: user.email,
            id: user._id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30m" }
      );
      res.status(200).json({ accessToken });
    }
  } catch (err) {
    console.log(err);
  }
};

// @desc current user
// @route Get /api/users/me
// @access private
const currentUserService = async (req, res) => {
  res.json(req.user);
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
