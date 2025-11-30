
interface IPaginated<T> {
    total: number,
    page: number,
    pageSize: number,
    pages: number,
    hasNext: boolean,
    hasPrev: boolean,
    items: T[]
}

interface IOperation {
    id: string,
    an_real_start: string,
    op_real_start: string,
    op_real_end: string,
    an_real_end: string,
    op_plan_start: string,
    op_plan_end: string,
    identifier: string,
    price: number
}

interface IPersonal {
    id: string,
    name: string
}

interface IRoomRow {
    id: string;
    identifier: string;
    operations: IOperation[];
    status: string
}

interface IRoom {
    id: string;
    identifier: string;
    personal: IPersonal[];
    operations: IOperation[];
}


export {
    type IOperation,
    type IPersonal,
    type IRoom,
    type IPaginated,
    type IRoomRow
}
