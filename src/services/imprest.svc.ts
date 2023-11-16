import { Imprest } from '../models/imprest.model'
import axiosInstance from '../Interceptors/request.interceptor';

const url = import.meta.env.VITE_REACT_APP_API_URL + "imprest";

export const getImprests = async () => {

  const response = await axiosInstance.get(`${url}`);
  if (response.status === 200) {
    console.log(response.data, "response.data")
    return response.data;

  }

}


export const createImprest = async (imprest: Imprest) => {


  const response = await axiosInstance.post(`${url}`, imprest, {
    headers: {
      'Content-Type': 'application/json',
    },


  });

  if (response.status === 201) {
    return response.data;
  }

}


export const getImprestrById = async (id: number) => {

  const response = await axiosInstance.get(`${url}/${id}`);
  if (response.status === 200) {
    return response.data;
  }


}

//Upadte Imprest
export async function updateImprest(imprestId: number, imprest: any) {


  const response = await axiosInstance.put(`${url}/${imprestId}`, imprest, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 201) {
    return response.data;
  }

}


export const deleteImprest = async (id: number) => {
  return await axiosInstance.delete(`${url}/${id}`);
}