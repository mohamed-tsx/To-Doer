const Prisma = require("../Config/database");
const { hashPassword } = require("../Helpers/Password");

const checkUserExistence = async (username) => {
  const user = await Prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (!user) {
    return false;
  }
  return user;
};
const createNewUser = async (name, username, email, password, avatar) => {
  const hashedPassword = await hashPassword(password);
  const newUser = await Prisma.user.create({
    data: {
      name,
      username,
      email,
      password: hashedPassword,
      avatar,
    },
  });
  return newUser;
};

module.exports = {
  checkUserExistence,
  createNewUser,
};
