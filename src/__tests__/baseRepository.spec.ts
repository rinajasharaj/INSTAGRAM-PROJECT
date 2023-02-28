import { BaseRepository } from "../infrastructure/repositories/BaseRepository";

describe("BaseRepository", () => {
    it("fetchAll() -> Should return an array of datas", async() => {
        const tableName = 'post';
        const mockData = [{id: 1, user_id: 1, file_name: 'lew.jpg', post_desc: 'w'}];
        
        //through jest.fn().mockResolvedValue({ rows: mockData })
        //we replace the fetchAll() function from BaseRepo, and we 
        //decide what datas should it return 
        const mockFetchAllQuery = jest.fn().mockResolvedValue({ rows: mockData });
        const mockDb = { query: mockFetchAllQuery };

        const repository = new BaseRepository(tableName, mockDb);

        const result = await repository.fetchAll();
        expect(result).toEqual(mockData);
        expect(mockDb.query).toHaveBeenCalledTimes(1);
        expect(mockDb.query).toHaveBeenCalledWith(`SELECT * FROM ${tableName}`);
    });
});