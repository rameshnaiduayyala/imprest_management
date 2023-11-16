import axiosInstance from '../Interceptors/request.interceptor';
import { Role } from '../models/role.model';
const url = import.meta.env.VITE_REACT_APP_API_URL + "role";
export const createRole = async (roleData: Role) => {

  const response = await axiosInstance.post(`${url}`, roleData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 201) {
    return response.data;
  }
}


export const getRoles = async () => {

  const response = await axiosInstance.get(`${url}`);
  if (response.status === 200) {
    return response.data;
  }
}


export async function updateRole(id: number, roleData: any) {
  const response = await axiosInstance.put(`${url}/${id}`, roleData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 201) {
    return response.data;
  }

}

// Delete Role
export const deleteRole = async (id: number) => {
  return await axiosInstance.delete(`${url}/${id}`);
}

export const getRoleById = async (id: number) => {
  const response = await axiosInstance.get(`${url}/${id}`);
  if (response.status === 200) {
    return response.data;
  }

}