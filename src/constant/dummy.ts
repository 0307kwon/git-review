import { genNewId } from "../util/common";
import { Author, CodeReview } from "../util/types";

const getNewId = genNewId();

const makeCodeReview = (code: string) => {
  return code.replace(/(.)$\s*/gm, "$1\n").trim();
};

type AuthorName = "MICKEY";

const DUMMY_AUTHOR: Record<AuthorName, Author> = {
  MICKEY: {
    avatarUrl: "https://avatars.githubusercontent.com/u/48755175?v=4",
    userName: "리뷰어 1",
  },
};

export const DUMMY_REVIEWS: CodeReview[] = [
  {
    author: DUMMY_AUTHOR.MICKEY,
    content: "이 부분이 조금 문제가 있네요~",
    plainText: "이 부분이 조금 문제가 있네요~",
    id: getNewId.next().value,
    url: "https://github.com/0307kwon/git-review",
    urlNickname: "코드 리뷰 예시 2",
    createdAtInApp: 1,
    code: {
      diffHunk: makeCodeReview(`
      @@ -0,0 +1,185 @@
      +import PropTypes from 'prop-types';
      +import React, { FC, FormEventHandler, useEffect, useMemo } from 'react';
      +import { useSelector } from 'react-redux';
      +import { LABEL_TEXT } from '../../constants/a11y';
      +import { LINE, LINE_COLORS, SECTION } from '../../constants/appInfo';
      +import { ERROR_MESSAGE } from '../../constants/message';
      +import useInput from '../../hooks/useInput/useInput';
      +import useNotificationInput from '../../hooks/useNotificationInput/useNotificationInput';
      +import useReadyToSubmit from '../../hooks/useReadyToSubmit/useReadyToSubmit';
      +import { addLine } from '../../redux/slice/lineSlice';
      +import { loadStations } from '../../redux/slice/stationSlice';
      +import { RootState, useAppDispatch } from '../../redux/store';
      +import { isKoreanAndNumber } from '../../util/validator';
      +import Button from '../@common/Button/Button';
      +import ColorRadio from '../@common/ColorRadio/ColorRadio';
      +import Input from '../@common/Input/Input';
      +import Modal from '../@common/Modal/Modal';
      +import NotificationInput from '../@common/NotificationInput/NotificationInput';
      +import SectionSelectBox from '../@shared/SectionSelectBox/SectionSelectBox';
      +import { LineColorContainer, LineForm, LineModalButtonContainer } from './LinesModal.styles';
      +
      +interface Props {
      +  onClose: () => void;
      `),
      path: "index.js",
    },
  },
  {
    author: DUMMY_AUTHOR.MICKEY,
    content: "# 코드리뷰 \n 안녕하세요! 이 코드에 대해서 설명 가능하실까요?",
    plainText: "이 코드에 대해서 설명 가능하실까요?",
    id: getNewId.next().value,
    url: "https://github.com/0307kwon/git-review",
    urlNickname: "코드 리뷰 예시 1",
    createdAtInApp: 2,
    code: {
      diffHunk: makeCodeReview(`
      @@ -0,0 +1,30 @@
      +import PropTypes from 'prop-types';
      +import React, { FC } from 'react';
      +import PALETTE from '../../../constants/palette';
      +
      +interface Props {
      +  width?: string;
      `),
      path: "index.js",
    },
  },
  {
    author: DUMMY_AUTHOR.MICKEY,
    content: "`preload` 사용 좋습니다! 👍👍",
    plainText: "이 부분에 대해서 설명 가능하실까요?",
    id: getNewId.next().value,
    url: "https://github.com/0307kwon/git-review",
    urlNickname: "코드 리뷰 예시 1",
    createdAtInApp: 3,
    code: {
      diffHunk: makeCodeReview(`
      @@ -5,6 +5,12 @@
      +    <meta charset="UTF-8">
      +    <meta http-equiv="X-UA-Compatible" content="IE=edge">
      +    <meta name="viewport" content="width=device-width, initial-scale=1.0">
      +
      +    <link rel="preload" as="image" href="/static/hero.webp" crossorigin="anonymous" />
      `),
      path: "index.js",
    },
  },
];
