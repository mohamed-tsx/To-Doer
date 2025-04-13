const asyncHandler = require("express-async-handler");
const { comparePasswords } = require("../Helpers/Password");
const {
  checkUserExistence,
  createNewUser,
} = require("../Services/userServices");
const { generateToken } = require("../Helpers/generateToken");
const Prisma = require("../Config/database");

const Register = asyncHandler(async (req, res) => {
  const { name, username, email, password, avatar } = req.body;

  // Check if all required fields are provided
  if (!(name && email && avatar && password && username)) {
    res.status(400);
    throw new Error("Please fill all the required fields!");
  }

  // Check if the user already exists
  if (await checkUserExistence(username)) {
    res.status(409);
    throw new Error("User already exists");
  }

  // Create the new user
  const user = await createNewUser(name, username, email, password, avatar);

  // Send a success response
  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user,
  });
});

const Login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // Check if all required fields are provided
  if (!(username && password)) {
    res.status(400);
    throw new Error("Please fill all the required fields!");
  }

  // Check if the user doesn't exists
  let user = await checkUserExistence(username);
  if (!user) {
    res.status(409);
    throw new Error("User doesn't exists");
  }

  const isPasswordMatching = await comparePasswords(password, user.password);

  if (!isPasswordMatching) {
    throw new Error("Invalid Cridentials");
  }

  const token = await generateToken(user.id, user.username);

  res.cookie("token", token, {
    httpOnly: true, // Prevents the client from accessing the cookie via JavaScript
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  res.status(200).json({
    success: true,
    message: "Succesfully logged in",
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    },
  });
});

const me = asyncHandler(async (req, res) => {
  const { email } = req.user;
  const user = await Prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      avatar: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  res.status(200).json({
    user,
  });
});

const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return res.json({ message: "Logged out successfully" });
});

module.exports = {
  Register,
  Login,
  me,
  logout,
};
