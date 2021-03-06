import { Map } from "immutable";
import { myFirebase } from "../util/firebase";

export interface PullRequest {
  owner: string;
  repo: string;
  pullNumber: string;
}

export interface PullRequestResponse {
  id: number;
  html_url: string;
  author_association: string;
  body: string;
  user: {
    avatar_url: string;
    login: string;
  };
  diff_hunk?: string;
  path?: string;
}

export interface IssueResponse extends PullRequestResponse {
  pull_request?: {
    url: string;
  };
}

export interface Author {
  avatarUrl: string;
  userName: string;
}

export interface CodeReviewFromGithub {
  id: number;
  url: string;
  author: Author;
  content: string;
  plainText: string;
  code?: {
    diffHunk: string;
    path: string;
  };
}

export interface CodeReview extends CodeReviewFromGithub {
  urlNickname: string;
}

export interface ProfileResponse {
  nickname: string;
  avatarURL: string;
  githubToken?: string;
}

export interface Profile extends ProfileResponse {
  uid: string;
}

export interface PrUrl {
  url: string;
  nickname: string;
  modificationTime: myFirebase.firestore.Timestamp;
  isFailedURL: boolean;
}

export type PrUrlMap = Map<string, PrUrl>;

export interface HttpResponse<T> {
  endPointURL: string;
  error?: {
    errorMessage: string;
  };
  resolvedValue: T;
}

export type RequiredOnly<T, K extends keyof T> = Partial<Exclude<T, K>> &
  Required<Pick<T, K>>;

export interface SearchFilter {
  keyword?: string;
  urlNickname?: string;
}
