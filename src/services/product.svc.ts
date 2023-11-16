import axiosInstance from '../Interceptors/request.interceptor';
import { Product } from '../models/product.model';

const url = import.meta.env.VITE_REACT_APP_API_URL + "product";

// Get All Products
export const getProduct = async () => {
    const response = await axiosInstance.get(`${url}`);
    if (response.status === 200) {
        return response.data;
    }

}

// Create New Product
export const createProduct = async (product: Product) => {
    const productData = JSON.stringify(product);
    const response = await axiosInstance.post(`${url}`, productData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.status === 201) {
        return response.data;
    }

}

//Fetch One Product
export const getProductById = async (id: number | string) => {
    const response = await axiosInstance.get(`${url}/${id}`);
    if (response.status === 200) {
        return response.data;
    }
}

//Upadte Product
export async function updateProduct(id: number | string, product: Product) {
    const productData = JSON.stringify(product);
    const response = await axiosInstance.put(`${url}/${id}`, productData, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.status === 201) {
        return response.data;
    }
}

// Delete Product
export const deleteProduct = async (id: number) => {
    return await axiosInstance.delete(`${url}/${id}`);
}