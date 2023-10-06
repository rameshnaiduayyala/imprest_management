import axios from "axios";
import { User } from "../models/user.model";

export async function getData() {
  return await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}user`);
}

export async function postUserData(data: User) {
  return await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}user`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function putUserData(id: number, data: User) {
  return await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}user/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function deleteUserData(id: number) {
  return await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}user/${id}`);
}

export async function getOneUserData(id: number) {
  return await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}user/${id}`);
}
