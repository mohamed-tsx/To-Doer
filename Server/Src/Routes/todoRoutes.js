const express = require("express");
const Verify = require("../Middlewares/Verify");
const {
  createTodo,
  getUserTodos,
  updateTodo,
  deleteTodo,
} = require("../Controllers/todoController");
const router = express.Router();

router.post("/", Verify, createTodo);
router.get("/todos", Verify, getUserTodos);
router.put("/:id", Verify, updateTodo);
router.delete("/:id", Verify, deleteTodo);

module.exports = router;
