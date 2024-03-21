export default {
    
    getAllUsers: () => {
        return [];
    },
    addUser: (req) => {
        console.log(req.files['avatar']);
        return req.body;
    },
    // getTodoById: (id) => todos.find((todo) => todo.id === id),
    // addTodo: (todo) => {
    //     todos.push(todo);
    //     return todo;
    // },
    // updateTodo: (id, updatedTodo) => {
    //     const index = todos.findIndex((todo) => todo.id === id);
    //     if (index !== -1) {
    //         todos[index] = updatedTodo;
    //         return updatedTodo;
    //     }
    //     return null;
    // },
    // deleteTodo: (id) => {
    //     const index = todos.findIndex((todo) => todo.id === id);
    //     if (index !== -1) {
    //         return todos.splice(index, 1)[0];
    //     }
    //     return null;
    // },
};
