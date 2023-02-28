import express, { Request, Response, NextFunction } from 'express';
import { UserService } from '../core/application/services/UserService';
import { UserController } from '../UI/controllers/UserController';
import { iBaseRepository } from '../core/application/interfaces/repositoryInterfaces/iBaseRepository';
import { BaseRepository } from '../infrastructure/repositories/BaseRepository';
import User from '../core/domain/entities/users';
import Post from '../core/domain/entities/posts';
import { IUserService } from '../core/application/interfaces/serviceInterfaces/IUserService';
import { IPostService } from '../core/application/interfaces/serviceInterfaces/IPostService';
import { PostService } from '../core/application/services/PostService';
import db from '../infrastructure/database/dbConn';

const router = express.Router();

const userRepository: iBaseRepository<User>=new BaseRepository<User>('user_', db);
const postRepository: iBaseRepository<Post>=new BaseRepository<Post>('post', db);

const userService:IUserService = new UserService(userRepository);
const postService:IPostService = new PostService(postRepository);

const userController=new UserController(userService, postService);

const upload = require('../UI/controllers/multer');

router.post('/deletePost', userController.deleteUserPost);
router.post('/addPost', upload.single('media_picture'), userController.addPost);
router.post('/editProfile', upload.single('profile_picture'), userController.editProfile);
router.get('/:userId', userController.getUserById);
// router.get('', userController.getUserById);


export default router;