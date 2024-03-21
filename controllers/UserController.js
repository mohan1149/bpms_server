import User from '../models/User.js';
export default {
    getAllUsers: (req, res) => {
        const allUser = User.getAllUsers();
        res.json(allUser);
    },
    addUser: (req, res) => {
        const user = User.addUser(req);
        res.json(user);
    },
    // getTodoById: (req, res) => {
    //     const id = parseInt(req.params.id);
    //     const todo = Todo.getTodoById(id);
    //     if (todo) {
    //         res.json(todo);
    //     } else {
    //         res.status(404).json({ error: 'Todo not found' });
    //     }
    // },
    // addTodo: (req, res) => {
    //     const newTodo = req.body;
    //     const addedTodo = Todo.addTodo(newTodo);
    //     res.status(201).json(addedTodo);
    // },
    // updateTodo: (req, res) => {
    //     const id = parseInt(req.params.id);
    //     const updatedTodo = req.body;
    //     const todo = Todo.updateTodo(id, updatedTodo);
    //     if (todo) {
    //         res.json(todo);
    //     } else {
    //         res.status(404).json({ error: 'Todo not found' });
    //     }
    // },
    // deleteTodo: (req, res) => {
    //     const id = parseInt(req.params.id);
    //     const deletedTodo = Todo.deleteTodo(id);
    //     if (deletedTodo) {
    //         res.json(deletedTodo);
    //     } else {
    //         res.status(404).json({ error: 'Todo not found' });
    //     }
    // },
};
