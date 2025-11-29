import axios, { AxiosInstance } from "axios"
import {
    IPaginated,
    IRoomRow,
    IRoom
} from "./types"


const clientConfig = {
    baseURL: "https://fteluhaoexouutmtrcas.supabase.co/rest/v1",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "apiKey": "sb_publishable_NZhEVWBOlhXsHg5LlL-ZRQ_6JoZr82e",
        "Accept": "application/json"
    },
    transformResponse: [(data: string) => {
        if (data) return JSON.parse(data)
    }]
};

export const apiClient = axios.create(clientConfig);


const getAllRooms = async (): Promise<IRoomRow[]> => {
// const getAllRooms = async (page: number, pageSize: number, sortBy: string, sortOrderDesc: string): Promise<IRoomRow[]> => {
//     const response = await apiClient.get<IRoomRow[]>('/rooms', { params: { offset: (page - 1) * pageSize, limit: pageSize, order: `${sortBy}.${sortOrderDesc ? "desc" : "asc"}` } });
    const response = await apiClient.get<IRoomRow[]>('/room_with_operations');

    var data =  response.data.map(r => {
        r.status = "available";

        if (!r.operations) return r;

        if (r.operations.some(o => o.an_real_start != null && o.an_real_end == null )) {
            console.debug(r)
            r.status = "in_use"
        }

        return r
    }) as IRoomRow[];
    console.debug(data)
    return data
};

const getRoomById = async (id: string): Promise<IRoom> => {
    const response = await apiClient.get<IRoom[]>(`/room_with_operations?id=eq.${id}`);
    return response.data[0];
};


const backendServices = {
    getAllRooms,
    getRoomById,
};

export default backendServices;