import { ProfileResponse } from "./types";

export const isProfileResponse = (item: any): item is ProfileResponse => {
  const profile: ProfileResponse = {
    avatarURL: "",
    nickname: "",
    githubToken: "",
  };

  return Object.keys(profile).every((key) => item[key] !== undefined);
};
