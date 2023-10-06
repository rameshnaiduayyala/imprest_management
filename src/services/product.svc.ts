/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { Product } from '../models/product.model';

const url = import.meta.env.VITE_REACT_APP_API_URL + "product";

// Get All Products
export const getProduct = async () => {
    return await axios.get(`${url}`);
}

// Create New Product
export const createProduct = async (productData: Product) => {
    const response = await axios.post(`${url}`, productData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.status === 201) {
        return response.data;
    } else {
        throw new Error('Failed to create product');
    }
}

//Fetch One Product
export async function getOneProduct(id: number) {
    return await axios.get(`${url}/${id}`);
}

//Upadte Product
export async function updateProduct(id: number, product: any) {
    return await axios.put(`${url}/${id}`, product, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}