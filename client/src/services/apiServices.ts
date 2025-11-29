import { authorizedClient } from '@/services/axiosClient.ts';
import type { IRoom, IPaginated } from '@/types.ts';


const getAllRooms = async (page: number, pageSize: number, sortBy: string, sortOrderDesc: string): Promise<IPaginated<IRoom>> => {
    const response = await authorizedClient.get<IPaginated<IRoom>>('/operation_rooms', { params: { offset: (page - 1) * pageSize, limit: pageSize, order: `${sortBy}.${sortOrderDesc ? "desc" : "asc"}` } });

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
