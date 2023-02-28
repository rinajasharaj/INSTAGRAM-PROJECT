import { iBaseRepository } from "../../core/application/interfaces/repositoryInterfaces/iBaseRepository";
// import db from "../database/dbConn";
import { Pool, QueryResult } from "pg";

export class BaseRepository<T> implements iBaseRepository<T> {
    
    constructor(public tableName: string, private db: any){
        this.tableName = tableName;
    }

    //CREATE
    // async insertData(tableName: string, datas: Record<string, any>): Promise<QueryResult> {
    //     const fields = Object.keys(datas);
    //     const querySyntax = `
    //         INSERT INTO ${tableName}
    //         (${fields.map((key) => `${key}`).join(', ')}) 
    //         VALUES (${fields.map((c, i) => `$${i + 1}`).join(', ')}) 
    //         `;
        
    //     const toAddDatas = [...Object.values(datas)];
    //     const addedData = await db.query(querySyntax, toAddDatas);
    //     return addedData;
    // }

    async insertData(datas: Record<string, any>): Promise<Boolean> {
        const fields = Object.keys(datas);
        const querySyntax = `
            INSERT INTO ${this.tableName}
            (${fields.map((key) => `${key}`).join(', ')}) 
            VALUES (${fields.map((c, i) => `$${i + 1}`).join(', ')}) 
            `;
        
        const toAddDatas = [...Object.values(datas)];
        const addedData = await this.db.query(querySyntax, toAddDatas);
        return addedData.rowCount === 1;
    }

    //READ
    async findById(id: number): Promise<T[]>{
        const queryResult=await this.db.query(`SELECT * FROM ${this.tableName} WHERE id = $1`, [id]);
        const filteredById=queryResult.rows[0];
        return filteredById;
    };

    async findByField(fields: string[], condition: Record<string, any>, logicOperator: string): Promise<T[]> {
        const field = fields.toString();

        const mappedConditions = Object.keys(condition).map(key => {
            return `${key} = ${condition[key]}`;
          }).join(` ${logicOperator} `);

        const queryResult = await this.db.query(`SELECT ${field} FROM ${this.tableName} WHERE ${mappedConditions}`);
        // const filteredByCondition = Array.from(queryResult.rows);
        const filteredByCondition = queryResult.rows;
        return filteredByCondition;
    }

    async fetchAll(): Promise<T[]> {
        const queryResult = await this.db.query(`SELECT * FROM ${this.tableName}`);
        // const datas = Array.from(queryResult.rows);
        const datas = queryResult.rows;
        return datas;
    }

    //UPDATE
    async updateData(datas: Record<string, any>, conditions: Record<string, any>, logicOperator: string): Promise<QueryResult<any>> {
        const fields = Object.keys(datas);
        const conditionsFields = Object.keys(conditions);
      
        const querySyntax = `
          UPDATE ${this.tableName}
          SET ${fields.map((keyName, num) => `"${keyName}"=$${num + 1}`).join(', ')}
          WHERE ${conditionsFields.map((keyName, num) => `"${keyName}"=$${num + fields.length + 1}`)
          .join(`' ${logicOperator} '`)}
        `;
      
        const toUpdateDatas = [...Object.values(datas), ...Object.values(conditions)];
        const updatedData = await this.db.query(querySyntax, toUpdateDatas);
        return updatedData;
    }

    //DELETE
    async deleteById(id: number): Promise<boolean>{
        return await this.db.query(`DELETE FROM ${this.tableName} WHERE id = $1`, [id]);
    };


}