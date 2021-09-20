import { myFirebase } from "./firebase";

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

export interface CodeReview {
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

export interface Profile {
  nickname: string;
  avatarURL: string;
  githubToken?: string;
}

export interface PullRequestURL {
  url: string;
  nickname: string;
  modificationTime: myFirebase.firestore.Timestamp;
  isFailedURL: boolean;
}

export interface HttpResponse<T> {
  endPointURL: string;
  error?: {
    errorMessage: string;
  };
  resolvedValue: T;
}

export type RequiredOnly<T, K extends keyof T> = Partial<Exclude<T, K>> &
  Required<Pick<T, K>>;
