import axios from "axios";

export const githubAxios = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: "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 OAUTH-TOKEN",
  },
});
