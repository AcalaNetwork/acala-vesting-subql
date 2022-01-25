// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export class VestingSchedule implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public accountId?: string;

    public perPeriod?: bigint;

    public period?: bigint;

    public periodCount?: bigint;

    public start?: bigint;

    public from?: number;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save VestingSchedule entity without an ID");
        await store.set('VestingSchedule', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove VestingSchedule entity without an ID");
        await store.remove('VestingSchedule', id.toString());
    }

    static async get(id:string): Promise<VestingSchedule | undefined>{
        assert((id !== null && id !== undefined), "Cannot get VestingSchedule entity without an ID");
        const record = await store.get('VestingSchedule', id.toString());
        if (record){
            return VestingSchedule.create(record);
        }else{
            return;
        }
    }


    static async getByAccountId(accountId: string): Promise<VestingSchedule[] | undefined>{
      
      const records = await store.getByField('VestingSchedule', 'accountId', accountId);
      return records.map(record => VestingSchedule.create(record));
      
    }


    static create(record: Partial<Omit<VestingSchedule, FunctionPropertyNames<VestingSchedule>>> & Entity): VestingSchedule {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new VestingSchedule(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
