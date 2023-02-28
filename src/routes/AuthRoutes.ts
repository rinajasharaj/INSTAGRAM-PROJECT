import express, { Request, Response, NextFunction } from 'express';
import { AuthController } from '../UI/controllers/AuthController';

// import { PostService } from '../core/application/services/PostService';
// import { PostController } from '../UI/controllers/PostController';
// import { iBaseRepository } from '../core/application/interfaces/repositoryInterfaces/iBaseRepository';
// import { BaseRepository } from '../infrastructure/repositories/BaseRepository';
// import Post from '../core/domain/entities/posts';
// import User from '../core/domain/entities/users';
// import { IPostService } from '../core/application/interfaces/serviceInterfaces/IPostService';
// import db from '../infrastructure/database/dbConn';


const router = express.Router();
// const postRepository: iBaseRepository<Post>=new BaseRepository<Post>('post', db);
// const userRepository: iBaseRepository<User> = new BaseRepository<User>('user_', db);
// const postService:IPostService = new PostService(postRepository);
// const postController=new PostController(postService);

const authController = new AuthController();
router.get('/login', authController.getLoginPage);
router.post('/login', authController.postLogin);

export default router;