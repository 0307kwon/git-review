export interface PullRequest {
  owner: string;
  repo: string;
  pullNumber: string;
}

export interface PullRequestResponse {
  id: number;
  author_association: string;
  body: string;
  user: {
    avatar_url: string;
    login: string;
  };
}

export interface IssueResponse extends PullRequestResponse {
  pull_request?: {
    url: string;
  };
}

export interface CodeReview {
  id: number;
  author: {
    avatarURL: string;
    userName: string;
  };
  content: string;
}
