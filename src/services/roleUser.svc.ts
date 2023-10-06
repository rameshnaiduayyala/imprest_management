/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { UserRoleData } from "../models/userRole.model";
const url = import.meta.env.VITE_REACT_APP_API_URL + "userrole";

//Get All Data
export async function getUserRoleData() {
  return await axios.get(`${url}`);
}
//Create Methode
export const createUserRole = async (userRoleData: UserRoleData) => {
  const response = await axios.post(`${url}`, userRoleData);
  return response.data;
};
//Upadte Methode
export async function putUserRoleData(id: number, data: any) {
  return await axios.put(`${url}/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

//Get One
export async function getOneUserRoleData(id: number) {
  return await axios.get(`${url}/${id}`);
}

//Delete Methode
export async function deleteUserRoleData(id: number) {
  return await axios.delete(`${url}/${id}`);
}