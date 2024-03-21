const todos = [
    { id: 1, text: 'Learn Node.js', done: false },
    { id: 2, text: 'Build a REST API', done: true },
];
export default {
    getAllTodos: () => todos,
    getTodoById: (id) => todos.find((todo) => todo.id === id),
    addTodo: (todo) => {
        todos.push(todo);
        return todo;
    },
    updateTodo: (id, updatedTodo) => {
        const index = todos.findIndex((todo) => todo.id === id);
        if (index !== -1) {
            todos[index] = updatedTodo;
            return updatedTodo;
        }
        return null;
    },
    deleteTodo: (id) => {
        const index = todos.findIndex((todo) => todo.id === id);
        if (index !== -1) {
            return todos.splice(index, 1)[0];
        }
        return null;
    },
};
