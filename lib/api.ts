import axios from "axios";

const apiInstance = axios.create({
  timeout: 5000,
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
});

export { apiInstance };
