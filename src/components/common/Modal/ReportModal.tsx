import styled from "styled-components";
import { GoX } from "react-icons/go";
import { useState } from "react";

function ReportModal({ onClose }: { onClose?: () => void }) {
  const [isReported, setIsReported] = useState(false);
  const [reason, setReason] = useState("");

  const handleReport = () => {
    if (!isReported) {
      if (reason.trim() === "") {
        return;
      }
      setIsReported(true);
    } else {
      onClose?.();
    }
  };
  return (
    <>
      <ReportModalStyle>
        <ReportModalContainer>
          <ReportModalTitle>
            {isReported ? (
              <p>소중한 의견 감사합니다.</p>
            ) : (
              <>
                <p>신고하기</p>
                <button onClick={onClose}>
                  <GoX />
                </button>
              </>
            )}
          </ReportModalTitle>
          {isReported ? (
            <CompleteMessage>
              뷰잇님의 소중한 의견은 인터뷰잇 커뮤니티를
              <br />
              안전하게 유지하는데 도움이 됩니다.
            </CompleteMessage>
          ) : (
            <ReportArea
              placeholder="신고 내용을 작성해주세요."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          )}

          <ReportButton onClick={handleReport} isReported={isReported}>
            {isReported ? "닫기" : "신고하기"}
          </ReportButton>
        </ReportModalContainer>
      </ReportModalStyle>
    </>
  );
}

const ReportModalStyle = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  max-width: 380px;
  margin: 0 auto;
`;

const ReportModalContainer = styled.div`
  width: 100%;
  height: 40vh;
  border-radius: 10px 10px 0 0;
  background-color: #fff;
  box-sizing: border-box;
  padding: 20px 30px;
`;

const ReportModalTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    background-color: transparent;
    font-size: 18px;
    padding: 0 0;
  }
`;

const ReportArea = styled.textarea`
  background-color: #f4f4f4;
  color: #333;
  border: none;
  width: 100%;
  height: 20vh;
  margin-top: 15px;
  border-radius: 10px;
  padding: 20px;
`;

const ReportButton = styled.button<{ isReported: boolean }>`
  background-color: ${({ isReported }) => (isReported ? "#6EA1FF" : "#f2624f")};
  width: 100%;
  color: #fff;
  margin-top: 40px;
`;

const CompleteMessage = styled.div`
  text-align: left;
  font-size: 14px;
  color: #888;
  height: 20vh;
  margin-top: 15px;
  margin-bottom: 5px;
`;
export default ReportModal;
