import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { requestUpdateUserProfile } from "../../API/firebaseAPI";
import { LOCAL_STORAGE_KEY } from "../../constant/common";
import {
  actionLoginByPopup,
  actionLoginByUid,
  actionLogout,
} from "../../redux/loginInfo/action";
import { useAppSelector } from "../../redux/util";
import { Profile } from "../../util/types";

const useUserInfo = () => {
  const { data } = useAppSelector(({ loginInfo }) => loginInfo);
  const dispatch = useDispatch();

  const login = () => {
    const uid = localStorage.getItem(LOCAL_STORAGE_KEY.UID);

    if (!uid) {
      dispatch(actionLoginByPopup());
      return;
    }

    dispatch(actionLoginByUid(uid));
  };

  const logout = () => {
    dispatch(actionLogout());
  };

  const modifyProfile = async (profile: Partial<Profile>) => {
    if (!data) {
      return;
    }

    // TODO: 수정 후 refetch 신경써야함.

    return requestUpdateUserProfile({
      ...data,
      ...profile,
    });
  };

  useEffect(() => {
    login();
  }, []);

  return {
    data,
    login,
    logout,
    modifyProfile,
  };
};

export default useUserInfo;
