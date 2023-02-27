import { BaseRepository } from "../../../infrastructure/repositories/BaseRepository";
import User from "../../domain/entities/users";
// import { iBaseRepository } from "../../../infrastructure/repositoryInterfaces/iBaseRepository";
import { iBaseRepository } from "../interfaces/repositoryInterfaces/iBaseRepository";
import { IUserService } from "../interfaces/serviceInterfaces/IUserService";

export class UserService implements IUserService{
    
    constructor(private userRepository: iBaseRepository<User> = new BaseRepository('user_')){};

    getUserById = async(id: number): Promise<{user: User}> => {
        const user: any =  await this.userRepository.findById(id);
        return user;
    }

    // addPost = async(user_id: number, file_name: string, post_desc: string): Promise<any> => {
    //     const datas: Record<string, any> = {
    //         user_id: user_id,
    //         file_name: file_name,
    //         post_desc: post_desc
    //     };
    //     const post: any = await this.userRepository.insertData(datas);
    //     return post;
    // }

    

    editUserProfile = async(datas: Record<string,any>, condition: Record<string, any>, logicOperator: string): Promise<void> => {
        await this.userRepository.updateData(datas, condition, logicOperator);
    }
}