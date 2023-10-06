import axios from 'axios';
import { Role } from '../models/role.model';

const url = import.meta.env.VITE_REACT_APP_API_URL + "role";
export const createRole = async (roleData: Role) => {
  return await axios.post(`${url}`, roleData, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

// Get RoleList

export const Roleslist = async () => {
  return await axios.get(`${url}`);
}
// Update Role
export const updateRole = async (id: number, roleData: Role) => {
  return await axios.put(`${url}/${id}`, roleData, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}


// Delete Role
export const deleteRole = async (id: number) => {
  return await axios.delete(`${url}/${id}`);
}
// fetch role by id

export const RoleDataById = async (id: number) => {
  return await axios.get(`${url}/${id}`);
}