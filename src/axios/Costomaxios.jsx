import axios from "axios";

// const CustomFetch = axios.create({
//   baseURL: "http://localhost:5000",
//   headers: {
//     Accept: "application/json",
//     // Authorization: `Bearer ${token}`,
//   },
//   withCredentials: true,
// });

// const productUrl = "http://localhost:5000";

// Use the hosted backend URL for the production environment
const CustomFetch = axios.create({
  baseURL: "https://ayurbharatbackend.onrender.com", // Updated URL
  headers: {
    Accept: "application/json",
    // Authorization: `Bearer ${token}`, // Uncomment and use token if needed
  },
  withCredentials: true, // Ensures cookies are sent with the request
});

// const productUrl = "https://ayurbharatbackend.onrender.com"; // Updated URL

export { CustomFetch };
