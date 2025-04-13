const jwt = require("jsonwebtoken");

const generateToken = async (id, username) => {
  const secretKey = process.env.JWT_SECRET;
  if (!secretKey)
    throw new Error("JWT_SECRET is not defined in environment variables.");
  const payload = { id, username };
  const token = jwt.sign(payload, secretKey, { expiresIn: "7d" });
  return token;
};

module.exports = {
  generateToken,
};
