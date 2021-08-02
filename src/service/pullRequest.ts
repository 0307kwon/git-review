import { AxiosResponse } from "axios";
import {
  requestComment,
  requestDiscussion,
  requestPullRequestInfo,
  requestReview,
} from "../database/githubAPI";
import { storeIdbCodeReview } from "../database/indexedDB";
import { CodeReview, PullRequestResponse } from "../util/types";

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
      })
    );
};

export const requestCodeReview = async (url: string): Promise<CodeReview[]> => {
  //TODO: 1. indexedDB에 저장되어 있으면 그걸 꺼내서 바로 리턴
  //2. 저장되어 있지 않으면 서버에서 가져와서 indexedDB에 저장하고 해당 데이터를 리턴

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
