
import axiosInstance from "../Interceptors/request.interceptor";
import { User } from "../models/user.model";

const url = import.meta.env.VITE_REACT_APP_API_URL + "user";

export const getusers = async () => {

  const response = await axiosInstance.get(`${url}`);
  if (response.status === 200) {
    return response.data;
  }

}

export const createUser = async (userdata: User) => {

  const response = await axiosInstance.post(`${url}`, userdata);

  if (response.status === 201) {
    return response.data;
  }

}

export async function updateUser(id: number, userData: User) {
  const response = await axiosInstance.put(`${url}/${id}`, userData);

  if (response.status === 200) {
    return response.data;
  }

}

export async function deleteOneUser(id: number) {
  return await axiosInstance.delete(`${url}/${id}`);
}

export const getUserById = async (id: number) => {
  const response = await axiosInstance.get(`${url}/${id}`);

  if (response.status === 200) {
    return response.data;
  }

}