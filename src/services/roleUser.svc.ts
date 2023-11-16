
import axiosInstance from "../Interceptors/request.interceptor";
import { UserRole } from "../models/userRole.model";
const url = import.meta.env.VITE_REACT_APP_API_URL + "userrole";


export async function getUserRoleData() {
  return await axiosInstance.get(`${url}`);
}

export const createUserRole = async (userRoleData: UserRole) => {
  const response = await axiosInstance.post(`${url}`, userRoleData);
  return response.data;
};

export async function putUserRoleData(id: number, data: any) {
  return await axiosInstance.put(`${url}/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function getOneUserRoleData(id: number) {
  return await axiosInstance.get(`${url}/${id}`);
}


export async function deleteUserRoleData(id: number) {
  return await axiosInstance.delete(`${url}/${id}`);
}