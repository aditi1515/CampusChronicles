import axios from "axios";

export const makeRequest = axios.create({
 baseURL: "https://college-chronicles-backend.vercel.app",
});

export const baseURL = "https://college-chronicles-backend.vercel.app";
