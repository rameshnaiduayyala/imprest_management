import axios from "axios";
import { UserAuth, UserToken } from "../models/userAuth.modal";
import { Authentication } from "../models/authentication.model";

const url = import.meta.env.VITE_REACT_APP_API_URL + "auth";

export const userAuthentication = async (payload: UserAuth) => {
    type Nullable<T> = T | null;
    let authentication: Nullable<string> = null;
    const response = await axios.post(`${url}/login`, payload);
    if (response.status === 200) {
        authentication = response.data;
    }
    return authentication
}

export const fetchUserData = async (payload: UserToken) => {
    type Nullable<T> = T | null;
    let authentication: Nullable<Authentication> = null;
    const response = await axios.post(`${url}/userdata`, 
    {},
     {
        headers: {
            'Content-Type': 'application/json',
            'auth_header' : payload?.token
        },
    },
    );
    if (response.status === 200) {
        authentication = response.data.user;
    }
    return authentication
}