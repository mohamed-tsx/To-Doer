const express = require("express");
const {
  Register,
  Login,
  me,
  logout,
} = require("../Controllers/userController");
const Verify = require("../Middlewares/Verify");
const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/me", Verify, me);
router.post("/logout", logout);

module.exports = router;
