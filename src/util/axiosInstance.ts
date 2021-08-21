import axios from "axios";
import { LOCAL_STORAGE_KEY } from "../constant/common";

export const githubAxios = axios.create({
  baseURL: "https://api.github.com",
  //TODO: 미인증 토큰은 1시간에 60번만 보낼 수 있음
  headers: {
    Authorization: localStorage.getItem(LOCAL_STORAGE_KEY.GITHUB_TOKEN) || "",
  },
});
