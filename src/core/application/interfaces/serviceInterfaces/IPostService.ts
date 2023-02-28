import Post from "../../../domain/entities/posts";

export interface IPostService {
    getPost(id: number): Promise<{post: Post}>;
    fetchAllPosts(): Promise<Post[]>;
    getPostsByUserId(id: number): Promise<Post[]>;
    deletePostById(id: number): Promise<boolean>;
    addPost(user_id: number, file_name: string, post_desc: string): Promise<Boolean>;
}