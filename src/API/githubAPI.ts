import { AxiosResponse } from "axios";
import removeMd from "remove-markdown";
import { githubAxios } from "../util/axiosInstance";
import {
  CodeReview,
  CodeReviewFromGithub,
  HttpResponse,
  IssueResponse,
  PullRequest,
  PullRequestResponse,
} from "../util/types";

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
): CodeReviewFromGithub[] => {
  return data
    .filter((item) => item.body && item.user.login !== pullRequestAuthor)
    .map(
      (item): CodeReviewFromGithub => {
        const codeReview: CodeReviewFromGithub = {
          id: item.id,
          url: item.html_url,
          author: {
            avatarUrl: item.user.avatar_url,
            userName: item.user.login,
          },
          content: item.body,
          plainText: removeMd(item.body),
        };

        if (item.diff_hunk && item.path) {
          codeReview.code = {
            diffHunk: item.diff_hunk,
            path: item.path,
          };
        }

        return codeReview;
      }
    );
};

export const requestCodeReview = async (
  url: string
): Promise<HttpResponse<CodeReviewFromGithub[]>> => {
  const httpResponse: HttpResponse<CodeReviewFromGithub[]> = {
    endPointURL: url,
    resolvedValue: [],
  };
  const reg = url.split("/");

  const requestParameter = {
    owner: reg[3],
    repo: reg[4],
    pullNumber: reg[6],
  };

  try {
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

    httpResponse.resolvedValue = codeReviews;

    return httpResponse;
  } catch (error) {
    httpResponse.error = {
      errorMessage: error.message,
    };

    return httpResponse;
  }
};
