// Import bcryptjs library for hashing and comparing passwords
const bcrypt = require("bcryptjs");

/**
 * This function hashes a given password using bcrypt.
 *
 * @param {string} password - The plain text password to be hashed.
 * @returns {Promise<string>} - A promise that resolves to the hashed password.
 */
const hashPassword = async (password) => {
  // Set the number of salt rounds for bcrypt hashing
  const saltRounds = 10;

  // Hash the password using the salt rounds and return the result
  return await bcrypt.hash(password, saltRounds);
};

/**
 * This function compares a manually entered password with a hashed password stored in the database.
 *
 * @param {string} manualPassword - The plain text password to compare.
 * @param {string} userPassword - The hashed password from the database.
 * @returns {Promise<boolean>} - A promise that resolves to true if passwords match, otherwise false.
 */
const comparePasswords = async (manualPassword, userPassword) => {
  // Compare the plain text password with the hashed password
  return await bcrypt.compare(manualPassword, userPassword);
};

// Export the functions for use in other parts of the application
module.exports = {
  hashPassword,
  comparePasswords,
};
