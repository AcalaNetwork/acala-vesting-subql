// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export class Vesting implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public total?: bigint;

    public claimed?: bigint;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Vesting entity without an ID");
        await store.set('Vesting', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Vesting entity without an ID");
        await store.remove('Vesting', id.toString());
    }

    static async get(id:string): Promise<Vesting | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Vesting entity without an ID");
        const record = await store.get('Vesting', id.toString());
        if (record){
            return Vesting.create(record);
        }else{
            return;
        }
    }



    static create(record: Partial<Omit<Vesting, FunctionPropertyNames<Vesting>>> & Entity): Vesting {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new Vesting(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
