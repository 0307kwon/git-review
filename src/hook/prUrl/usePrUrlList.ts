import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  actionAddPrUrl,
  actionDeletePrUrl,
  actionGetUrlList,
  actionModifyPrUrlList,
} from "../../redux/prUrlList/action";
import { useAppSelector } from "../../redux/util";
import { myFirebase } from "../../util/firebase";
import { PrUrl } from "../../util/types";

const usePrUrlList = () => {
  // TODO: prUrl 수정 시간 내림차순으로 나열해야함
  const prUrlMap = useAppSelector(({ prUrlList }) => prUrlList.byUrl);
  const profile = useAppSelector(({ loginInfo }) => loginInfo.data);
  const dispatch = useDispatch();

  const modifyUrlList = (urlList: PrUrl[]) => {
    if (!profile) {
      return;
    }

    dispatch(actionModifyPrUrlList(profile.uid, urlList));
  };

  const deleteUrl = (url: string) => {
    if (!profile) {
      return;
    }

    dispatch(actionDeletePrUrl(profile.uid, url));
  };

  const addUrl = (nickname: string, url: string) => {
    if (!profile) {
      return;
    }

    const newUrl: PrUrl = {
      nickname,
      url,
      isFailedURL: false,
      modificationTime: myFirebase.firestore.Timestamp.now(),
    };

    dispatch(actionAddPrUrl(profile.uid, newUrl));
  };

  const refetchUrls = () => {
    if (!profile) {
      return;
    }

    dispatch(actionGetUrlList(profile.uid));
  };

  useEffect(() => {
    if (!profile) {
      return;
    }

    refetchUrls();
  }, [profile]);

  return {
    data: prUrlMap,
    modifyUrlList,
    deleteUrl,
    addUrl,
    refetchUrls,
  };
};

export default usePrUrlList;
