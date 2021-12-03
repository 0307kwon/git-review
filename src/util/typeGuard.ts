import { Profile } from "./types";

export const isProfile = (item: any): item is Profile => {
  const profile: Profile = {
    avatarURL: "",
    nickname: "",
    githubToken: "",
  };

  return Object.keys(profile).every((key) => item[key] !== undefined);
};
