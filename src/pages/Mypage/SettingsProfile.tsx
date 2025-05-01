import styled from "styled-components";
import { MyPageSectionStyle } from "../../components/MyPage/MyPageSectionStyle";
import ConfirmModal from "../../components/common/ConfirmModal";
import AlertModal from "../../components/common/AlertModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FRONTEND_URLS } from "../../constants/Urls";
import MyProfileDefaultImg from "../../assets/mypage/MyProfileDefaultImage.png";
import MyProfileAddBtn from "../../assets/mypage/MyProfileAddButton.png";
import InputField from "../../components/common/Input/Input";
import { ModalType } from "../RecordAnswerPage";
import { useAuth } from "../../hooks/UseAuth";
import { MAX_PROFILE_IMAGE_SIZE } from "../../constants/User";

export interface SignUpInputs {
  password: string;
  nickname: string;
}

function SettingProfile() {
  const navigate = useNavigate();
  const { me, handleLogout, handleChangeProfileImage } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    toggleModal("confirm", true);
  };

  const [isModalsVisible, setIsModalsVisible] = useState({
    confirm: false,
    alert: false,
  });

  const toggleModal = (type: ModalType, state: boolean) => {
    setIsModalsVisible((prev) => ({
      ...prev,
      [type]: state,
    }));
  };

  const handleConfirmSubmit = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await handleLogout();
      toggleModal("confirm", false);
      toggleModal("alert", true);
    } catch (error) {
      setError("로그아웃에 실패했습니다. 다시 시도해주세요.");
      console.error("로그아웃 실패:", error);
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

      // 파일 크기 검증
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
      setError("프로필 이미지가 성공적으로 업데이트되었습니다.");
    } catch (error) {
      console.error("프로필 업로드 실패:", error);
      setError("프로필 업로드에 실패했습니다.");
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
              <p>{me?.nickname}</p>
            </ProfileDefaultInfo>
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
            />

            <InputField
              className="password-input"
              autoComplete="off"
              placeholder="새로운 비밀번호 입력"
              type="password"
              maxLength={30}
            />
          </PasswordChange>
        </ProfileWrap>
        <AccountStyle>
          <button type="submit" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "로그아웃 중..." : "로그아웃"}
          </button>
          <span>|</span>
          <button type="submit">회원탈퇴</button>
          {isModalsVisible.confirm && (
            <ConfirmModal
              onClose={() => toggleModal("confirm", false)}
              onConfirm={handleConfirmSubmit}
              message="로그아웃 하시겠습니까?"
            />
          )}
          {isModalsVisible.alert && (
            <AlertModal
              onClose={() => {
                toggleModal("alert", false);
                navigate(FRONTEND_URLS.LOGIN);
              }}
              message="로그아웃 되었습니다."
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
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const ProfileImgAddBtn = styled.div`
  position: absolute;
  top: -0.5em;
  right: -0.5em;
  width: 2em;
  height: 2em;
  cursor: pointer;
  background-color: white;
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

export default SettingProfile;
