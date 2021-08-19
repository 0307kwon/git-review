import { AxiosResponse } from "axios";
import { githubAxios } from "../util/axiosInstance";
import {
  CodeReview,
  IssueResponse,
  PullRequest,
  PullRequestResponse,
} from "../util/types";
import { storeIdbCodeReview } from "./indexedDB";
import removeMd from "remove-markdown";

type PullRequestInfo = (
  pullRequest: PullRequest
) => Promise<AxiosResponse<PullRequestResponse>>;

type RequestReview = (
  pullRequest: PullRequest
) => Promise<AxiosResponse<PullRequestResponse[]>>;

type RequestDiscussion = (
  pullRequest: PullRequest
) => Promise<AxiosResponse<PullRequestResponse[]>>;

type RequestComment = (
  pullRequest: PullRequest
) => Promise<AxiosResponse<PullRequestResponse[]>>;

const requestPullRequestInfo: PullRequestInfo = ({
  owner,
  repo,
  pullNumber,
}) => {
  return githubAxios.get(`/repos/${owner}/${repo}/pulls/${pullNumber}`);
};

const requestReview: RequestReview = ({ owner, repo, pullNumber }) => {
  return githubAxios.get(
    `/repos/${owner}/${repo}/pulls/${pullNumber}/reviews?per_page=100`
  );
};

const requestDiscussion: RequestDiscussion = ({ owner, repo, pullNumber }) => {
  return githubAxios.get(
    `/repos/${owner}/${repo}/pulls/${pullNumber}/comments?per_page=100`
  );
};

const requestComment: RequestComment = async ({ owner, repo, pullNumber }) => {
  const response = await githubAxios.get<IssueResponse[]>(
    `/repos/${owner}/${repo}/issues/${pullNumber}/comments?per_page=100`
  );

  return response;
};

const filterResponse = (
  { data }: AxiosResponse<PullRequestResponse[]>,
  pullRequestAuthor: string
): CodeReview[] => {
  return data
    .filter((item) => item.body && item.user.login !== pullRequestAuthor)
    .map(
      (item): CodeReview => ({
        id: item.id,
        url: item.html_url,
        author: {
          avatarUrl: item.user.avatar_url,
          userName: item.user.login,
        },
        content: item.body,
        plainText: removeMd(item.body),
      })
    );
};

export const requestCodeReview = async (url: string): Promise<CodeReview[]> => {
  const reg = url.split("/");

  const requestParameter = {
    owner: reg[3],
    repo: reg[4],
    pullNumber: reg[6],
  };

  const {
    data: {
      user: { login: pullRequestAuthor },
    },
  } = await requestPullRequestInfo(requestParameter);

  const reviews = filterResponse(
    await requestReview(requestParameter),
    pullRequestAuthor
  );
  const discussions = filterResponse(
    await requestDiscussion(requestParameter),
    pullRequestAuthor
  );
  const comments = filterResponse(
    await requestComment(requestParameter),
    pullRequestAuthor
  );

  const codeReviews = [...reviews, ...discussions, ...comments];

  storeIdbCodeReview(codeReviews);

  return codeReviews;
};