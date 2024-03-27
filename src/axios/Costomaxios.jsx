import axios from "axios";

const CustomFetch = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    Accept: "application/json",
    // Authorization: `Bearer ${token}`,
  },
  withCredentials: true,
});

const productUrl = "http://localhost:5000";

export { CustomFetch };
