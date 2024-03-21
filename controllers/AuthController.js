import Auth from '../models/Auth.js';
export default {
    validateUserToken: (req, res) => {
        const user = Auth.validateToken(req);
        res.json({user:user});
    },
    login: async (req, res) => {
        const user = await Auth.login(req);
        res.json(user);
    },
    
    getTodoById: (req, res) => {
        const id = parseInt(req.params.id);
        const todo = Todo.getTodoById(id);
        if (todo) {
            res.json(todo);
        } else {
            res.status(404).json({ error: 'Todo not found' });
        }
    },
    addTodo: (req, res) => {
        const newTodo = req.body;
        const addedTodo = Todo.addTodo(newTodo);
        res.status(201).json(addedTodo);
    },
    updateTodo: (req, res) => {
        const id = parseInt(req.params.id);
        const updatedTodo = req.body;
        const todo = Todo.updateTodo(id, updatedTodo);
        if (todo) {
            res.json(todo);
        } else {
            res.status(404).json({ error: 'Todo not found' });
        }
    },
    deleteTodo: (req, res) => {
        const id = parseInt(req.params.id);
        const deletedTodo = Todo.deleteTodo(id);
        if (deletedTodo) {
            res.json(deletedTodo);
        } else {
            res.status(404).json({ error: 'Todo not found' });
        }
    },
};
