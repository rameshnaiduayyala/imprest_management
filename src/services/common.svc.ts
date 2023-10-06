/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { KeyValue } from "../models/keyvalue.model";

const url = import.meta.env.VITE_REACT_APP_API_URL;

export async function getGenerics() {
  let keyValues : KeyValue[] = [];
  const response = await axios.get(`${url}generic`);
  if (response.status === 200) {
    keyValues = response.data.map((data: any) => ({
      name: data.name,
      value: data.id,
    }));
  }

  return keyValues;
}

export async function getBrands() {
  let keyValues : KeyValue[] = [];
  const response = await axios.get(`${url}brand`);
  if (response.status === 200) {
    keyValues = response.data.map((data: any) => ({
      name: data.name,
      value: data.id,
    }));
  }

  return keyValues;
}

export async function getPackUoms() {
  let keyValues : KeyValue[] = [];
  const response = await axios.get(`${url}packuom`);
  if (response.status === 200) {
    keyValues = response.data.map((data: any) => ({
      name: data.name,
      value: data.id,
    }));
  }

  return keyValues;
}

export async function getUoms() {
  let keyValues : KeyValue[] = [];
  const response = await axios.get(`${url}uom`);
  if (response.status === 200) {
    keyValues = response.data.map((data: any) => ({
      name: data.name,
      value: data.id,
    }));
  }

  return keyValues;
}

export async function getProductForms() {
  let keyValues : KeyValue[] = [];
  const response = await axios.get(`${url}productform`);
  if (response.status === 200) {
    keyValues = response.data.map((data: any) => ({
      name: data.name,
      value: data.id,
    }));
  }

  return keyValues;
}
