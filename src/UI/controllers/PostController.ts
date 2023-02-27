import { Request, Response, NextFunction } from "express";
import  db  from "../../infrastructure/database/dbConn";
import { IPostService } from "../../core/application/interfaces/serviceInterfaces/IPostService";

export class PostController {
    constructor(private postService: IPostService){}

    getPostById = async(req: Request, res: Response, next: NextFunction) => {
        const postId: number = Number(req.params.postId);
        const result = await this.postService.getPost(postId);
        res.json(result);
    }

    fetchAllPosts = async(req: Request, res: Response, next: NextFunction) => {
        const posts = await this.postService.fetchAllPosts();
       
        res.render('feed/feed', {
            posts: posts
            //usernames: usernames 
        });
    }

    // getPostsByUserId =async (req: Request, res: Response, next: NextFunction) => {
    //     const userId: number = Number(req.params.userId);
    //     const posts = await this.postService.getPostsByUserId(userId);
    // }
}