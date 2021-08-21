import axios from "axios";
import { LOCAL_STORAGE_KEY } from "../constant/common";

export const githubAxios = axios.create({
  baseURL: "https://api.github.com",
});

githubAxios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.GITHUB_TOKEN);
    if (accessToken) {
      config.headers["Authorization"] = `token ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
