import React, { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import FlexContainer from "../../../component/@common/FlexContainer/FlexContainer";
import Input from "../../../component/Input/Input";
import { LOCAL_STORAGE_KEY } from "../../../constant/common";
import useModal from "../../../context/modalProvider/useModal";
import useUser from "../../../context/UserProvider/useUser";
import {
  CustomATag,
  Form,
  SettingButton,
  SettingModalContainer,
} from "./TokenSettingModal.styles";

const TokenSettingModal = () => {
  const [token, setToken] = useState(
    localStorage.getItem(LOCAL_STORAGE_KEY.GITHUB_TOKEN) || ""
  );
  const modal = useModal();
  const user = useUser();

  const handleSaveToken = async (event: FormEvent) => {
    event.preventDefault();
    await user.modifyProfile({
      githubToken: token,
    });

    localStorage.setItem(LOCAL_STORAGE_KEY.GITHUB_TOKEN, token);
    modal.closeModal();
    alert("token 등록에 성공했습니다.");
  };

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setToken(event.target.value);
  };

  return (
    <SettingModalContainer>
      <FlexContainer flexDirection="column" gap="0.5rem">
        <h2>Github access token 등록</h2>
        <p>token 미등록 시 하루 60개의 요청 제한이 있어요</p>
      </FlexContainer>
      <Form onSubmit={handleSaveToken}>
        <FlexContainer flexDirection="column" gap="0.25rem">
          <Input
            value={token}
            onChange={handleChangeInput}
            placeholder="access token을 입력해주세요"
            required
          />
          <p>
            ({" "}
            <CustomATag
              target="blank"
              href="https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token"
            >
              여기
            </CustomATag>
            를 참고해주세요 )
          </p>
        </FlexContainer>
        <SettingButton>등록</SettingButton>
      </Form>
    </SettingModalContainer>
  );
};

export default TokenSettingModal;
