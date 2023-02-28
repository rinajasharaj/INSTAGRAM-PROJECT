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
            fetchAll: jest.fn()
        } as unknown as jest.Mocked<iBaseRepository<Post>>;

        postService = new PostService(mockRepository);
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
});