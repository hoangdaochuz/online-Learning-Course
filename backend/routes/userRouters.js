const express = require("express");
const router = express.Router();
const {
  getUsers,
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
  getMe,
  getUserById,
  getUsersWithoutAdmin,
} = require("../controller/userController");

const {protect} = require('../middleware/authMiddleware')

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.get("/list", getUsers);
router.route("/:id").put(updateUser).delete(deleteUser).get(getUserById);
router.post("/management-accounts", getUsersWithoutAdmin);
module.exports = router;
