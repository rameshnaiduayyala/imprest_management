import { ImprestProduct } from '../models/imprestProduct.model';
import axiosInstance from '../Interceptors/request.interceptor';
const url = import.meta.env.VITE_REACT_APP_API_URL + "imprestproduct";

export const getImprestProduct = async () => {
    const response = await axiosInstance.get(`${url}`);
    if (response.status === 200) {
        return response.data;
    }

};

export const createImprestProduct = async (imprestProducts: ImprestProduct) => {
    const response = await axiosInstance.post(`${url}`, imprestProducts, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (true) {
        return response.data;
    }
}


//Upadte Imprest_product
export async function updateImprestProduct(id: number | string, imprestProducts: any) {
    const response = await axiosInstance.put(`${url}/${id}`, imprestProducts, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.status === 201) {
        return response.data;
    }
}

//Fetch One Imprest Product
export const getImprestProductById = async (id: number | string) => {
    const response = await axiosInstance.get(`${url}/${id}`);
    if (response.status === 200) {
        return response.data;
    }
}

// Delete Imprest Product
export const deleteImprestProduct = async (id: number) => {
    return await axiosInstance.delete(`${url}/${id}`);
}