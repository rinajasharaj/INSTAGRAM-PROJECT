import { QueryResult } from "pg";

export interface iBaseRepository<T> {

    tableName: string;

    // insertData(tableName: string, datas: Record<string, any>): Promise<QueryResult>;

    insertData(datas: Record<string, any>): Promise<QueryResult>;

    // findById(id: number, tableName: string): Promise<T[]>;
    findById(id: number): Promise<T[]>;
    
    // findByField(tableName: string, fields: Array<string>, condition: Record<string, any>, logicOperator: string): Promise<T[]>;
    findByField(fields: Array<string>, condition: Record<string, any>, logicOperator: string): Promise<T[]>;

    // fetchAll(tableName: string): Promise<T[]>;
    fetchAll(): Promise<T[]>;

    // updateData(tableName: string, datas: Record<string, any>, condition: Record<string, any>, logicOperator: string): Promise<QueryResult>;
    updateData(datas: Record<string, any>, condition: Record<string, any>, logicOperator: string): Promise<QueryResult>;

    // deleteById(id: number, tableName: string): Promise<void>;
    deleteById(id: number): Promise<void>;

}