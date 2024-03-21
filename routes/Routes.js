import express from 'express';
// import todoController from '../controllers/TodoController.js';
import AuthController from '../controllers/AuthController.js';
// import UserController from '../controllers/UserController.js';
// import StudentController from '../controllers/StudentController.js';
import multer from 'multer';
const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets/files');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });
router.post('/auth/validate-token', AuthController.validateUserToken);
router.post('/auth/login', AuthController.login);
// router.get('/todos', todoController.getAllTodos);
// router.get('/todos/:id', todoController.getTodoById);
// router.post('/todos', todoController.addTodo);
// router.put('/todos/:id', todoController.updateTodo);
// router.delete('/todos/:id', todoController.deleteTodo);

// router.get('/users', UserController.getAllUsers);
// router.post('/users/store', upload.fields([{ name: 'avatar' }]), UserController.addUser);




// router.get('/students', StudentController.getAllStudents);
// router.get('/students-per-by-gender', StudentController.getStudentsPerformanceByGender);
// router.get('/students-per-by-parenst-ed', StudentController.getStudentsPerformanceByParentsEdu);
// router.get('/students-avg-score', StudentController.getStudentsAvgScore);
// router.post('/import/students', upload.single('studentCSv'),StudentController.importStudents);
// router.get('/students-parents-jobs', upload.single('studentCSv'),StudentController.getStudentsParentsJob);




export default router;
