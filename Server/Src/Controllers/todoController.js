const asyncHandler = require("express-async-handler");
const {
  getUserTodosService,
  createTodoService,
  updateTodoService,
  deleteTodoService,
} = require("../Services/todoServices");

const createTodo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title && !description) {
    res.status(400);
    throw new Error("Please fill all the required fields.");
  }

  const userId = req.user.id;

  const todos = await createTodoService(userId, title, description);

  res.status(201).json({
    success: true,
    todos,
  });
});

const getUserTodos = asyncHandler(async (req, res) => {
  const todos = await getUserTodosService(req.user.id);
  res.status(200).json({
    success: true,
    todos,
  });
});

const updateTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const todo = await updateTodoService(id, req.body, req.user.id);
  res.status(200).json({
    success: true,
    todo,
  });
});

const deleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await deleteTodoService(id);
  res.json({
    success: true,
  });
});

module.exports = {
  createTodo,
  getUserTodos,
  updateTodo,
  deleteTodo,
};
