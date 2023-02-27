import User from "../../../domain/entities/users";

export interface IUserService {
    getUserById(id: number): Promise<{user: User}>;
    // addPost(user_id: number, file_name: string, post_desc: string): Promise<any>;
    // editUserProfile(tableName: string, datas: Record<string, any>, condition: Record<string, any>, logicOperator: string): Promise<void>;
    editUserProfile(datas: Record<string, any>, condition: Record<string, any>, logicOperator: string): Promise<void>;
}