import styled from "styled-components";
import { MyPageSectionStyle } from "../../components/MyPage/MyPageSectionStyle";
import ConfirmModal from "../../components/common/ConfirmModal";
import AlertModal from "../../components/common/AlertModal";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FRONTEND_URLS } from "../../constants/Urls";
import MyProfileDefaultImg from "../../assets/mypage/MyProfileDefaultImage.png";
import MyProfileAddBtn from "../../assets/mypage/MyProfileAddButton.png";
import InputField from "../../components/common/Input/Input";
import { ModalType } from "../RecordAnswerPage";
import { useAuth } from "../../hooks/UseAuth";
import { MAX_PROFILE_IMAGE_SIZE } from "../../constants/User";
import InputWithCheckButton from "../../components/SignUpPage/InputWithCheckButton";
import { RegisterOptions, useForm } from "react-hook-form";
import { NICKNAME_MAX_LENGTH, NICKNAME_MIN_LENGTH } from "../../constants/Auth";
import { checkNicknameExists } from "../../api/Auth.api";

export interface SignUpInputs {
  password: string;
  nickname: string;
}

function SettingProfile() {
  const navigate = useNavigate();
  const {
    me,
    handleLogout,
    handleChangeProfileImage,
    handleChangeNickname,
    handleChangePassword,
  } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isModalsVisible, setIsModalsVisible] = useState({
    confirm: false,
    alert: false,
  });
  const [modalMessage, setModalMessage] = useState("");
  const [currentNickname, setCurrentNickname] = useState("");

  useEffect(() => {
    if (me?.nickname) {
      setCurrentNickname(me.nickname);
    }
  }, [me?.nickname]);

  const {
    register,
    getValues,
    trigger,
    setError: setFormError,
    clearErrors,
    formState: { errors },
    setValue,
  } = useForm<SignUpInputs>({ mode: "onChange" });

  const [isNicknameUnique, setIsNicknameUnique] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const toggleModal = (type: ModalType, state: boolean) => {
    setIsModalsVisible((prev) => ({
      ...prev,
      [type]: state,
    }));
  };

  const handleLogoutClick = () => {
    setModalMessage("로그아웃 하시겠습니까?");
    toggleModal("confirm", true);
  };

  const handleConfirmSubmit = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (modalMessage.includes("닉네임")) {
        const success = await handleChangeNickname(getValues("nickname"));
        if (!success) {
          throw new Error("닉네임 변경에 실패했습니다.");
        }
        setCurrentNickname(getValues("nickname"));
        setValue("nickname", "");
        setIsNicknameUnique(false);
      } else if (modalMessage.includes("비밀번호")) {
        const success = await handleChangePassword(oldPassword, newPassword);
        if (!success) {
          throw new Error("비밀번호 변경에 실패했습니다.");
        }
        setOldPassword("");
        setNewPassword("");
      } else {
        await handleLogout();
        navigate(FRONTEND_URLS.LOGIN);
      }

      toggleModal("confirm", false);
      toggleModal("alert", true);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "변경에 실패했습니다. 다시 시도해주세요."
      );
      console.error("변경 실패:", error);
      toggleModal("confirm", false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadProfile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      if (file.size > MAX_PROFILE_IMAGE_SIZE) {
        setError(
          `파일 크기는 ${MAX_PROFILE_IMAGE_SIZE}MB를 초과할 수 없습니다.`
        );
        return;
      }

      if (!file.type.match(/^image\/(jpeg|jpg|png)$/)) {
        setError("jpg, jpeg, png 형식의 이미지만 업로드 가능합니다.");
        return;
      }

      setIsLoading(true);
      await handleChangeProfileImage(file);
      setError("프로필 이미지가 업데이트되었습니다.");
    } catch (error) {
      console.error("프로필 업로드 실패:", error);
      setError("프로필 업로드에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const onClickNicknameCheck = async (nickname: string) => {
    await trigger("nickname");

    if (errors.nickname !== undefined) {
      return;
    }

    try {
      const isExists = await checkNicknameExists(nickname);

      if (isExists) {
        setFormError("nickname", {
          type: "manual",
          message: "중복된 닉네임입니다.",
        });
        setIsNicknameUnique(false);
      } else {
        setIsNicknameUnique(true);
      }
    } catch (error) {
      console.error("Error during nickname check:", error);
      setFormError("nickname", {
        type: "manual",
        message: "오류가 발생했습니다.",
      });
    }
  };

  const onChangeNickname = async () => {
    if (isNicknameUnique) {
      setIsNicknameUnique(false);
      clearErrors("nickname");
    } else {
      await trigger("nickname");

      if (errors.nickname !== undefined) return;

      setFormError("nickname", {
        type: "manual",
        message: "닉네임 중복 검사를 해주세요.",
      });
    }
  };

  const checkNickname: RegisterOptions<SignUpInputs, "nickname"> = {
    required: {
      value: true,
      message: "닉네임을 입력해주세요.",
    },
    pattern: {
      value: new RegExp(
        `^[가-힣a-zA-Z0-9]{${NICKNAME_MIN_LENGTH},${NICKNAME_MAX_LENGTH}}$`
      ),
      message: `한글, 영문, 숫자 ${NICKNAME_MIN_LENGTH} - ${NICKNAME_MAX_LENGTH}자`,
    },
    onChange: onChangeNickname,
  };

  const onSubmitNickname = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!isNicknameUnique) {
        setError("닉네임 중복 검사를 해주세요.");
        return;
      }

      setModalMessage("닉네임을 변경하시겠습니까?");
      toggleModal("confirm", true);
    } catch (error) {
      setError("닉네임 변경에 실패했습니다.");
      console.error("닉네임 변경 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitPassword = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!oldPassword || !newPassword) {
        setError("현재 비밀번호와 새로운 비밀번호를 모두 입력해주세요.");
        return;
      }

      setModalMessage("비밀번호를 변경하시겠습니까?");
      toggleModal("confirm", true);
    } catch (error) {
      setError("비밀번호 변경에 실패했습니다.");
      console.error("비밀번호 변경 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <EditProfileStyle>
        <ProfileWrap>
          <ProfileImageSetting>
            <img
              src={me?.profileImageUrl || MyProfileDefaultImg}
              alt="프로필 이미지"
            />
            <ProfileImgAddBtn
              onClick={() =>
                !isLoading && document.getElementById("profile-upload")?.click()
              }
            >
              <img src={MyProfileAddBtn} alt="프로필 이미지 추가" />
              <input
                id="profile-upload"
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                onChange={handleUploadProfile}
                disabled={isLoading}
              />
            </ProfileImgAddBtn>
          </ProfileImageSetting>
          <ProfileInfo>
            <ProfileDefaultInfo>
              <h2>이메일</h2>
              <p>{me?.email}</p>
            </ProfileDefaultInfo>
          </ProfileInfo>

          <ProfileInfo>
            <ProfileDefaultInfo>
              <h2>닉네임</h2>
              <p>{currentNickname}</p>
            </ProfileDefaultInfo>
            <InputWithCheckButton
              name="nickname"
              placeholder="닉네임을 입력하세요"
              isUnique={isNicknameUnique}
              onCheck={() => onClickNicknameCheck(getValues("nickname"))}
              register={register("nickname", checkNickname)}
              error={errors.nickname}
              onChange={onChangeNickname}
              successMessage="사용 가능한 닉네임입니다."
            />
            <NicknameChangeConfirmButton
              onClick={onSubmitNickname}
              disabled={!isNicknameUnique || isLoading}
            >
              {isLoading ? "수정 중..." : "닉네임 변경"}
            </NicknameChangeConfirmButton>
          </ProfileInfo>

          <PasswordChange>
            <ProfileDefaultInfo>
              <h2>비밀번호</h2>
            </ProfileDefaultInfo>
            <InputField
              className="password-input"
              autoComplete="off"
              placeholder="현재 비밀번호 입력"
              type="password"
              maxLength={30}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />

            <InputField
              className="password-input"
              autoComplete="off"
              placeholder="새로운 비밀번호 입력"
              type="password"
              maxLength={30}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <PasswordChangeConfirmButton
              onClick={onSubmitPassword}
              disabled={!oldPassword || !newPassword || isLoading}
            >
              {isLoading ? "수정 중..." : "비밀번호 변경"}
            </PasswordChangeConfirmButton>
          </PasswordChange>
        </ProfileWrap>
        <AccountStyle>
          <button
            type="button"
            onClick={handleLogoutClick}
            disabled={isLoading}
          >
            {isLoading ? "로그아웃 중..." : "로그아웃"}
          </button>
          <span>|</span>
          <button type="button">회원탈퇴</button>
          {isModalsVisible.confirm && (
            <ConfirmModal
              onClose={() => toggleModal("confirm", false)}
              onConfirm={handleConfirmSubmit}
              message={modalMessage}
            />
          )}
          {isModalsVisible.alert && (
            <AlertModal
              onClose={() => {
                toggleModal("alert", false);
                if (modalMessage.includes("로그아웃")) {
                  navigate(FRONTEND_URLS.LOGIN);
                }
              }}
              message={
                modalMessage.includes("닉네임")
                  ? "닉네임이 변경되었습니다."
                  : modalMessage.includes("비밀번호")
                    ? "비밀번호가 변경되었습니다."
                    : "로그아웃 되었습니다."
              }
            />
          )}
          {error && (
            <AlertModal onClose={() => setError(null)} message={error} />
          )}
        </AccountStyle>
      </EditProfileStyle>
    </>
  );
}

const EditProfileStyle = styled.div`
  background-color: #fbfbfb;
  min-height: 100dvh;
  height: fit-content;
  padding: 30px;
`;

const ProfileWrap = styled(MyPageSectionStyle)``;

const AccountStyle = styled.div`
  width: auto;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    background-color: transparent;
    border: none;
  }

  button,
  span {
    color: #333;
  }
`;

const ProfileImageSetting = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;
  margin: 0 auto 10px;

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const ProfileImgAddBtn = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 2em;
  height: 2em;
  cursor: pointer;
  background-color: #6ea1ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  img {
    width: 1em;
    height: 1em;
    display: block;
  }

  input {
    display: none;
  }
`;

const ProfileInfo = styled.div`
  padding: 25px 0;
  border-bottom: solid 1px #f5f5f5;
`;

const ProfileDefaultInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    font-weight: 600;
    color: #333;
  }

  p {
    font-weight: 400;
    color: #ccc;
  }
`;

const PasswordChange = styled.div`
  padding: 25px 0;

  .password-input {
    margin: 15px 0;
  }
`;

const NicknameChangeConfirmButton = styled.button`
  width: 100%;
  height: 50px;
  border: solid 1px #d4dcea;
  background-color: #fff;
  text-align: center;
  font-size: 16px;
  color: #d4dcea;
  border-radius: 5px;
  margin-top: 10px;

  &:not(:disabled) {
    border: none;
    background-color: #6ea1ff;
    color: #ffffff;
  }
`;

const PasswordChangeConfirmButton = styled.button`
  width: 100%;
  height: 50px;
  border: solid 1px #d4dcea;
  background-color: #fff;
  text-align: center;
  font-size: 16px;
  color: #d4dcea;
  border-radius: 5px;
  margin-top: 25px;

  &:not(:disabled) {
    border: none;
    background-color: #6ea1ff;
    color: #ffffff;
  }
`;

export default SettingProfile;
