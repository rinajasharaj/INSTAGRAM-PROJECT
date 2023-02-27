import { Request, Response, NextFunction } from "express";
import  db  from "../../infrastructure/database/dbConn";
import { IUserService } from "../../core/application/interfaces/serviceInterfaces/IUserService";
import { IPostService } from "../../core/application/interfaces/serviceInterfaces/IPostService";

export class UserController {
    constructor(private userService: IUserService, private postService: IPostService){}

    getUserById = async(req: Request, res: Response, next: NextFunction) => {
        const userId: number = Number(req.params.userId);
        const user = await this.userService.getUserById(userId);
        const posts = await this.postService.getPostsByUserId(userId);
        // res.json(posts);
        res.render('profile/profile', {
            user: user,
            posts: posts
        });
    }

    // addUser = async(req: Request, res: Response, next: NextFunction) => {
    //     await db.query(
    //        "INSERT INTO user_(username, profile_name, profile_desc) VALUES ('orgesja', 'orges jasharaj', 'orges sdc');");
    //     res.redirect('/profile/1');
    // }
    
    addPost = async(req: Request, res: Response, next: NextFunction) => {
        const userId = req.body.user_id;
        const media_file = String(req.file?.originalname);
        const desc = req.body.description;
        // const result = await this.userService.addPost(userId, media_file, desc);
        await this.postService.addPost(userId, media_file, desc);
        console.log(req.file);
        res.redirect(`/profile/${userId}`);
    }

    deleteUserPost =async (req: Request, res: Response, next: NextFunction) => {
        const postId = req.body.postId;
        const userId = req.body.userId;
        await this.postService.deletePostById(postId);
        res.redirect(`/profile/${userId}`);
    }

    editProfile = async(req: Request, res: Response, next: NextFunction) => {
        const userId = req.body.user_id;
        const media_file = String(req.file?.originalname);
        const username = req.body.username;
        const profileName = req.body.profileName;
        const profileDesc = req.body.profileDesc;
        await this.userService
        .editUserProfile(
        {'username' : username, 'profile_picture' : media_file,
        'profile_name' : profileName,'profile_desc' : profileDesc}, 
        {'id': userId}, 
        '');
        res.redirect(`/profile/${userId}`);
    }

}