// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export class Claimed implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public accountId?: string;

    public amount?: bigint;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Claimed entity without an ID");
        await store.set('Claimed', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Claimed entity without an ID");
        await store.remove('Claimed', id.toString());
    }

    static async get(id:string): Promise<Claimed | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Claimed entity without an ID");
        const record = await store.get('Claimed', id.toString());
        if (record){
            return Claimed.create(record);
        }else{
            return;
        }
    }


    static async getByAccountId(accountId: string): Promise<Claimed[] | undefined>{
      
      const records = await store.getByField('Claimed', 'accountId', accountId);
      return records.map(record => Claimed.create(record));
      
    }


    static create(record: Partial<Omit<Claimed, FunctionPropertyNames<Claimed>>> & Entity): Claimed {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new Claimed(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
