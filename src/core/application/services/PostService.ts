import { BaseRepository } from "../../../infrastructure/repositories/BaseRepository";
import Post from "../../domain/entities/posts";
import User from "../../domain/entities/users";
import { iBaseRepository } from "../interfaces/repositoryInterfaces/iBaseRepository";
import { IPostService } from "../interfaces/serviceInterfaces/IPostService";
import db from "../../../infrastructure/database/dbConn";

export class PostService implements IPostService{
    
    constructor(private postRepository: iBaseRepository<Post> = new BaseRepository('post', db)){};
    

    getPost = async(id: number): Promise<{post: Post}> => {
        const post: any =  await this.postRepository.findById(id);
        return post;
    }

    fetchAllPosts = async(): Promise<Post[]> => {
        const posts: Post[] = await this.postRepository.fetchAll();
        return posts;
    }

    getPostsByUserId =async(id: number): Promise<Post[]> => {
        const postsByUserId: Post[] = await this.postRepository
        .findByField( ['ID', 'user_id', 'file_name', 'post_desc'], {'user_id': id}, '');
        return postsByUserId;
    }

    deletePostById =async (id: number): Promise<void> => {
        await this.postRepository.deleteById(id);
    }

    addPost = async(user_id: number, file_name: string, post_desc: string): Promise<any> => {
        const datas: Record<string, any> = {
            user_id: user_id,
            file_name: file_name,
            post_desc: post_desc
        };
        const post: any = await this.postRepository.insertData(datas);
        return post;
    }






    //Select username from user_ where id = post.user_id

    // fetchAllPosts = async(): Promise<any> => {
        // const posts = await this.postRepository.fetchAll('post');
        // const usernamesRec: Record<number, Post> = {};
        // const queryRes: any = "";
        // const usernames = await this.postRepository.findByField('post', ['username'], {'id': 'postid'}, '');
        // posts.forEach(async post => {
        //     var queryRes = await this.postRepository.findByField('user_', ['username'], {'id': `${post.user_id}`}, '');
        //     usernamesRec[post] = queryRes;
        // })
        
        // return await this.postRepository.fetchAll('post');
        // return posts;
    // }

}