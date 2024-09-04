const Todo = require('../models/Todo'); // Make sure the path to your Todo model is correct

// Add a new TODO
exports.addTodo = async (req, res) => {
  try {
    // Check if the TODO item already exists
    let todo = await Todo.findOne({ task: req.body.task, isDelete: false });
    if (todo) {
      return res.redirect('/todo'); // Redirect to the TODO list page
    }

    // Create a new TODO item
    todo = new Todo({
      task: req.body.task,
      isDelete: false,
      completed: false // Assuming there's a completed field
    });
    await todo.save();

    // Redirect to the TODO list page
    return res.redirect('/todo');
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}
// Get all TODOs
exports.getTodo = async (req, res) => {
  try {
    // Retrieve all TODO items that are not deleted
    const todos = await Todo.find({ isDelete: false });

    // Render the TODO list page with the retrieved TODOs
    res.render('dashboard.ejs', { todos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Edit a TODO
exports.editTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const updatedTask = req.body.task;

    // Find the TODO item by ID
    let todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Update the task
    todo.task = updatedTask;
    await todo.save();

    // Redirect to the TODO list page
    res.redirect('/todo');
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Soft delete a TODO
exports.deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    let todo = await Todo.findById(todoId);
    if (!todo) {
      return res.redirect('/todo');
    }

    // Soft delete the TODO item by setting isDelete to true
    todo.isDelete = true;
    await todo.save();

    // Redirect to the TODO list page
    return res.redirect('/todo');
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};