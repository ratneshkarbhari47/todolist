const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

const PORT = 8000;
const connectionString = 'mongodb://localhost:27017/todoAppDb'; // Add your database name here

// Connect to MongoDB
async function connect() {
  try {
    await mongoose.connect(connectionString); // Removed deprecated options
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if the connection fails
  }
}

// Define a schema for Todos
const todoSchema = new mongoose.Schema({
  todo: { type: String  },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create a model from the schema
const Todo = mongoose.model('Todo', todoSchema);

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Todo API!' });
});

// Fetch all todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find(); // Retrieve all documents from the collection
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todos', error });
  }
});

// Create a new todo
app.post('/create-todo', async (req, res) => {
  try {
    const { todo } = req.body; // Extract data from request body
    if (!todo) {
      return res.status(400).json({ message: 'Todo is required' });
    }

    const newTodo = new Todo({ "todo" : todo }); // Create a new document


    const savedTodo = await newTodo.save(); // Save the document to MongoDB
    res.status(201).json(savedTodo);

  } catch (error) {
    res.status(500).json({ message: 'Error creating todo', error });
  }
});

// Delete a todo by ID
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id); // Delete the document by ID
    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json({ message: 'Todo deleted successfully', deletedTodo });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting todo', error });
  }
});

// Update a todo by ID
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { todo } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { todo },
      { new: true, runValidators: true } // Return the updated document and validate inputs
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error updating todo', error });
  }
});

// Start the server
app.listen(PORT, async () => {
  console.log(`Server started on http://localhost:${PORT}`);
  await connect(); // Establish MongoDB connection when the server starts
});
