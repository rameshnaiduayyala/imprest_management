import axios from 'axios';

const url = import.meta.env.VITE_REACT_APP_API_URL + "imprest";

export async function getImprest() {
    return await axios.get(`${url}`);
  }