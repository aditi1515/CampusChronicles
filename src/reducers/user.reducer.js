import axios from "axios";
import { makeRequest } from "../utils/makeRequest";

export const registerUser = async (formdata) => {
 const { data } = await makeRequest.post("/api/auth/register", formdata, {
  withCredentials: true,
 });
};
