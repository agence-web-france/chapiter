import axios, { AxiosRequestConfig } from "axios";

const baseURL = typeof process.env.NEXT_PUBLIC_API_URL === "string" ? process.env.NEXT_PUBLIC_API_URL : "http://localhost:3000/api"

const axiosConfig: AxiosRequestConfig = {
  baseURL,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
};

export const API = axios.create(axiosConfig);
