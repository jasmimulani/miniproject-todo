const express = require('express');
const todoRouter = express.Router();
const {getTodo , addTodo, editTodo , deleteTodo} = require('../controller/todoController')

// Route to display all TODOs
todoRouter.get('/', getTodo);

// Route to add a new TODO
todoRouter.post('/add',addTodo);

// Route to edit a TODO by ID
todoRouter.post('/:id/edit', editTodo);

// Route to delete a TODO by ID
todoRouter.post('/:id/delete', deleteTodo);

module.exports = todoRouter;