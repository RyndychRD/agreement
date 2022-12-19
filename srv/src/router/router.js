const Router = require('express').Router
const userController = require('../controllers/user-controller')
const departmentController = require('../controllers/catalogControllers/department-controller')
const router = new Router()
const { body } = require('express-validator')
const authMiddleware = require('../middlewares/auth-middleware')

router.post(
	'/registration',
	body('email').isEmail(),
	body('password').isLength({ min: 3, max: 32 }),
	userController.registration
)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/users', authMiddleware, userController.getUsers)

/**Справочники*/
//Департаменты
router.get(
	'/departments',
	authMiddleware,
	departmentController.getAllDepartments
)
router.post('/departments/create', authMiddleware,departmentController.createNewDepartment)

module.exports = router
