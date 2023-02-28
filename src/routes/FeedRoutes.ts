import express, { Request, Response, NextFunction } from 'express';

import { PostService } from '../core/application/services/PostService';
import { PostController } from '../UI/controllers/PostController';
import { iBaseRepository } from '../core/application/interfaces/repositoryInterfaces/iBaseRepository';
import { BaseRepository } from '../infrastructure/repositories/BaseRepository';
import Post from '../core/domain/entities/posts';
import User from '../core/domain/entities/users';
import { IPostService } from '../core/application/interfaces/serviceInterfaces/IPostService';
import db from '../infrastructure/database/dbConn';


const router = express.Router();
const postRepository: iBaseRepository<Post>=new BaseRepository<Post>('post', db);
const userRepository: iBaseRepository<User> = new BaseRepository<User>('user_', db);
const postService:IPostService = new PostService(postRepository);
const postController=new PostController(postService);


router.get('/', postController.fetchAllPosts);
router.get('/:postId', postController.getPostById);

// router.get('/',(_req: Request, _res: Response, next: NextFunction) => {
//     console.log('done');
// });

export default router;