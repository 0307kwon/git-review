import { AxiosResponse } from "axios";
import {
  requestComment,
  requestDiscussion,
  requestPullRequestInfo,
  requestReview,
} from "../database/githubAPI";
import { CodeReview, PullRequestResponse } from "../util/types";

const filterResponse = (
  { data }: AxiosResponse<PullRequestResponse[]>,
  pullRequestAuthor: string
): CodeReview[] => {
  return data
    .filter((item) => item.body && item.user.login !== pullRequestAuthor)
    .map(
      (item): CodeReview => ({
        author: {
          avatarURL: item.user.avatar_url,
          userName: item.user.login,
        },
        content: item.body,
      })
    );
};

export const getCodeReview = async (url: string): Promise<CodeReview[]> => {
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

  console.log([...reviews, ...discussions, ...comments]);

  return [...reviews, ...discussions, ...comments];
};
