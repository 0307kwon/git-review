import { AxiosResponse } from "axios";
import { githubAxios } from "../util/axiosInstance";
import { IssueResponse, PullRequest, PullRequestResponse } from "../util/types";

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

export const requestPullRequestInfo: PullRequestInfo = ({
  owner,
  repo,
  pullNumber,
}) => {
  return githubAxios.get(`/repos/${owner}/${repo}/pulls/${pullNumber}`);
};

export const requestReview: RequestReview = ({ owner, repo, pullNumber }) => {
  return githubAxios.get(
    `/repos/${owner}/${repo}/pulls/${pullNumber}/reviews?per_page=100`
  );
};

export const requestDiscussion: RequestDiscussion = ({
  owner,
  repo,
  pullNumber,
}) => {
  return githubAxios.get(
    `/repos/${owner}/${repo}/pulls/${pullNumber}/comments?per_page=100`
  );
};

export const requestComment: RequestComment = async ({
  owner,
  repo,
  pullNumber,
}) => {
  const response = await githubAxios.get<IssueResponse[]>(
    `/repos/${owner}/${repo}/issues/${pullNumber}/comments?per_page=100`
  );

  return response;
};
