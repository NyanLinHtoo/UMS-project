const {
  getAllUserService,
  createUserService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
  registerUserService,
  loginUserService,
  currentUserService,
} = require("../services/userServices");

const getAllUser = (req, res) => {
  getAllUserService(req, res);
};

const createUser = (req, res) => {
  createUserService(req, res);
};

const getUserById = (req, res) => {
  getUserByIdService(req, res);
};

const updateUser = (req, res) => {
  updateUserService(req, res);
};

const deleteUser = (req, res) => {
  deleteUserService(req, res);
};

const registerUser = (req, res) => {
  registerUserService(req, res);
};

const loginUser = (req, res) => {
  loginUserService(req, res);
};

const currentUser = (req, res) => {
  currentUserService(req, res);
};

module.exports = {
  getAllUser,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  registerUser,
  loginUser,
  currentUser,
};
