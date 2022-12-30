import express from 'express'
const router = express.Router()
import UserController from '../controllers/userController.js'
router.get('/', UserController.home);
router.get('/compose', UserController.compose);
router.post('/compose', UserController.composePage);
router.post('/posts/:postId', UserController.deletePost);
router.get('/posts/:postId', UserController.displayPost);
router.get('/about', UserController.about);
router.get('/contact', UserController.contact);
router.get('/login', UserController.signin);
router.post('/login', UserController.verifyLogin);
router.get('/signup', UserController.registration);
router.post('/signup', UserController.createUserDoc);
router.post('/userPost', UserController.verifyLogin);
// router.get('/userPost',UserController.userPosts);

export default router;
