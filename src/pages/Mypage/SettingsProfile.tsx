import styled from "styled-components";
import { MyPageSectionStyle } from "../../components/MyPage/MyPageSectionStyle";
import ConfirmModal from "../../components/common/ConfirmModal";
import AlertModal from "../../components/common/AlertModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/UseUser";
import { FRONTEND_URLS } from "../../constants/Urls";
import { ModalType } from "../AnswerPage";

function SettingProfile() {
  const navigate = useNavigate();
  const { me, logout } = useUser();

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
      await logout();
      toggleModal("confirm", false);
      toggleModal("alert", true);
    } catch (error) {
      console.log("로그아웃에 실패하였습니다.", error);
    }
  };

  return (
    <>
      <EditProfileStyle>
        <ProfileWrap>asd</ProfileWrap>
        <button type="submit" className="logout-btn" onClick={handleSubmit}>
          로그아웃
        </button>
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
      </EditProfileStyle>
    </>
  );
}

const EditProfileStyle = styled.div`
  background-color: #fbfbfb;
  min-height: 100dvh;
  padding: 0 30px;
`;

const ProfileWrap = styled(MyPageSectionStyle)``;

export default SettingProfile;
