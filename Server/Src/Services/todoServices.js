const Prisma = require("../Config/database");

const getUserTodosService = async (userId) => {
  return await Prisma.todo.findMany({ where: { userId } });
};

const createTodoService = async (userId, title, description) => {
  return Prisma.todo.create({
    data: { title, description, userId },
  });
};

const updateTodoService = async (id, data, userId) => {
  const todo = await Prisma.todo.findUnique({ where: { id } });
  if (!todo || todo.userId !== userId)
    throw new Error("Not found or unauthorized");

  return Prisma.todo.update({
    where: { id },
    data,
  });
};

const deleteTodoService = async (id, userId) => {
  const todo = await Prisma.todo.findUnique({ where: { id } });
  if (!todo || todo.userId !== userId)
    throw new Error("Not found or unauthorized");

  return Prisma.todo.delete({ where: { id } });
};

module.exports = {
  createTodoService,
  deleteTodoService,
  getUserTodosService,
  updateTodoService,
};
