import axios from "axios";

export const ApiService = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Authorization: `Bearer ${process.env.API_KEY} `,
        "Content-Type": "application/json;charset=utf-8",
    },
});

ApiService.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    },
);
