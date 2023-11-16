
import axiosInstance from "../Interceptors/request.interceptor";
import { KeyValue } from "../models/keyvalue.model";

const url = import.meta.env.VITE_REACT_APP_API_URL;

export async function getGenerics() {
  let keyValues: KeyValue[] = [];
  const response = await axiosInstance.get(`${url}generic`);
  if (response.status === 200) {
    keyValues = response.data.map((data: any) => ({
      name: data.name,
      value: data.id,
    }));
  }

  return keyValues;
}

export async function getBrands() {
  let keyValues: KeyValue[] = [];
  const response = await axiosInstance.get(`${url}brand`);
  if (response.status === 200) {
    keyValues = response.data.map((data: any) => ({
      name: data.name,
      value: data.id,
    }));
  }

  return keyValues;
}

export async function getPackUoms() {
  let keyValues: KeyValue[] = [];
  const response = await axiosInstance.get(`${url}packuom`);
  if (response.status === 200) {
    keyValues = response.data.map((data: any) => ({
      name: data.name,
      value: data.id,
    }));
  }

  return keyValues;
}

export async function getUoms() {
  let keyValues: KeyValue[] = [];
  const response = await axiosInstance.get(`${url}uom`);
  if (response.status === 200) {
    keyValues = response.data.map((data: any) => ({
      name: data.name,
      value: data.id,
    }));
  }

  return keyValues;
}

export async function getProductForms() {
  let keyValues: KeyValue[] = [];
  const response = await axiosInstance.get(`${url}productform`);
  if (response.status === 200) {
    keyValues = response.data.map((data: any) => ({
      name: data.name,
      value: data.id,
    }));
  }

  return keyValues;
}

//Get Hospitals
export async function getHospitals() {
  let keyValues: KeyValue[] = [];
  const response = await axiosInstance.get(`${url}hospital`);
  if (response.status === 200) {
    keyValues = response.data.map((data: any) => ({
      name: data.name,
      value: data.id,
    }));
  }

  return keyValues;
}

//Get Imprests
export async function getImprests() {
  let keyValues: KeyValue[] = [];
  const response = await axiosInstance.get(`${url}imprest`);
  if (response.status === 200) {
    keyValues = response.data.map((data: any) => ({
      name: data.name,
      value: data.id,
    }));
  }

  return keyValues;
}

//Get Products
export async function getProducts() {
  let keyValues: KeyValue[] = [];
  const response = await axiosInstance.get(`${url}product`);
  if (response.status === 200) {
    keyValues = response.data.map((data: any) => ({
      name: data.description,
      value: data.id,
    }));
  }

  return keyValues;
}