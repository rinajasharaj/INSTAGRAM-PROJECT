import { PostService } from "../core/application/services/PostService";
import { iBaseRepository } from "../core/application/interfaces/repositoryInterfaces/iBaseRepository";
import Post from "../core/domain/entities/posts";
import { mock } from "node:test";

describe("PostService", () => {

    //jest.mocked<>() is a utility function provided by the Jest testing framework that creates a mocked 
    //version of a module or object.
    let mockRepository: jest.Mocked<iBaseRepository<Post>>;
    let postService: PostService;

    beforeEach(() => {
        mockRepository = {
            fetchAll: jest.fn(),
            findById: jest.fn(),
            findByField: jest.fn(),
            deleteById: jest.fn(),
            insertData: jest.fn()
        } as unknown as jest.Mocked<iBaseRepository<Post>>;

        postService = new PostService(mockRepository);
    });

    describe('getPost by Id', () => {
        it('Should return an object of type Post when id is null', async() => {
            const mockData = [{post_id: 1, user_id: 1, file_name: 'lew.jpg', post_desc: 'w'}];
            mockRepository.findById.mockResolvedValue(mockData);

            const result = await postService.getPost(1);
            expect(result).toEqual(mockData);
            expect(mockRepository.findById).toHaveBeenCalledTimes(1);
        });
        // it('Should return null Post when id is null', async() => {
        //     const mockData = [{post_id: 1, user_id: 1, file_name: 'lew.jpg', post_desc: 'w'}];
        //     mockRepository.findById.mockResolvedValue(mockData);

        //     const result = await postService.getPost(1);
        //     expect(result).toEqual(mockData);
        //     expect(mockRepository.findById).toHaveBeenCalledTimes(1);
        // });
    });

    describe('fetchAllPosts', () => {
        it('Should return an array containing all excisting posts', async() => {
            const mockData = [{post_id: 1, user_id: 1, file_name: 'lew.jpg', post_desc: 'w'}];
            mockRepository.fetchAll.mockResolvedValue(mockData);

            const result = await postService.fetchAllPosts();
            expect(result).toEqual(mockData);
            expect(mockRepository.fetchAll).toHaveBeenCalledTimes(1);
        });
    });
    
    describe('getPostsByUserId', () => {
        it('Should return an array containing of posts', async() => {
            const mockData = [{post_id: 1, user_id: 1, file_name: 'lew.jpg', post_desc: 'w'},
            {post_id: 2, user_id: 1, file_name: 'carlos.jpg', post_desc: '55'}];
            mockRepository.findByField.mockResolvedValue(mockData);

            const result = await postService.getPostsByUserId(1);
            expect(result).toEqual(mockData);
            expect(mockRepository.findByField).toHaveBeenCalledTimes(1);
        });
    });

    describe('deletePostById', () => {
        it('Should return an boolean value', async() => {
            mockRepository.deleteById.mockResolvedValue(true);

            const result = await postService.deletePostById(1);
            expect(result).toEqual(true);
            expect(mockRepository.deleteById).toHaveBeenCalledTimes(1);
        });
    });

    describe('addPost', () => {
        it('Should return an boolean value', async() => {
            mockRepository.insertData.mockResolvedValue(true);

            const result = await postService.addPost(1, 'file', 'post desc');
            expect(result).toEqual(true);
            expect(mockRepository.insertData).toHaveBeenCalledTimes(1);
        });
    });
});