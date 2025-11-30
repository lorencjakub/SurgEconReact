import axios, { AxiosInstance } from "axios"
import {
    IPaginated, IRoomRow, IRoom
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

export const authorizedClient = axios.create(clientConfig);


// const getAllRooms = async (page: number, pageSize: number, sortBy: string, sortOrderDesc: string): Promise<IPaginated<IRoom>> => {
//     const response = await authorizedClient.get<IPaginated<IRoomRow>>('/operation_rooms', { params: { offset: (page - 1) * pageSize, limit: pageSize, order: `${sortBy}.${sortOrderDesc ? "desc" : "asc"}` } });
const getAllRooms = async (): Promise<IRoomRow[]> => {
    const response = await authorizedClient.get<IRoomRow[]>('/operation_rooms');

    return response.data;
};

const getRoomById = async (id: string): Promise<IRoom> => {
    const response = await authorizedClient.get<IRoom[]>(`/room_with_operations?id=eq.${id}`);
    return response.data[0];
};


const backendServices = {
    getAllRooms,
    getRoomById,
};

export default backendServices;