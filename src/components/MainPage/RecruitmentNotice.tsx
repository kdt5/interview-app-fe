import styled from "styled-components";

const jobList = [
  {
    company: "(주)심테크시스템",
    position: "FE 웹개발 경력자 구인",
    location: "서울 성동구",
    salary: "-",
    type: "경력 5년",
  },
  {
    company: "(주)유비케어",
    position: "웹 개발 FE/BE 구인",
    location: "서울 영등포구",
    salary: "250만원",
    type: "신입 + 경력",
  },
  {
    company: "(주)아리모아",
    position: "JAVA/JSP 웹개발 경력직 채용",
    location: "부산 연제구",
    salary: "350만원",
    type: "경력 2년",
  },
  {
    company: "필라넷",
    position: ".NET 웹 개발자 / 디자이너 채용",
    location: "서울 강남구",
    salary: "250만원",
    type: "신입",
  },
  {
    company: "(주)유니베이아이엔씨",
    position: "[금융/프로젝트] 업무시스템 구축 개발",
    location: "서울 용산구",
    salary: "550만원",
    type: "경력 9년",
  },
];

function RecruitmentNotice() {
  return (
    <>
      <RecruitmentNoticeStyle>
        {jobList.map((job, index) => (
          <RecruitmentNoticeList key={index}>
            <ListLeftInfo>
              <ListSpan>{job.company}</ListSpan>
              <h2>{job.position}</h2>
              <ListSpan>
                {job.location} <span>월</span>
                {job.salary}
              </ListSpan>
            </ListLeftInfo>
            <ListRightInfo>
              <ListSpan>{job.type}</ListSpan>
            </ListRightInfo>
          </RecruitmentNoticeList>
        ))}
      </RecruitmentNoticeStyle>
    </>
  );
}

const RecruitmentNoticeStyle = styled.ul`
  padding: 0 30px;
`;
const RecruitmentNoticeList = styled.li`
  list-style: none;
  padding: 20px 0;
  border-bottom: solid 1px #f8f8f8;

  display: flex;
  align-items: start;
  justify-content: space-between;

  &:first-child {
    padding-top: 10px;
  }
`;
const ListLeftInfo = styled.div`
  h2 {
    font-weight: 600;
    padding: 0 0 10px;
    color: #333;
    font-size: 16px;
  }
`;
const ListRightInfo = styled.div``;
const ListSpan = styled.span`
  font-size: 14px;
  color: #888;
  font-weight: 400;

  span {
    color: #6ea1ff;
    font-size: 14px;
    margin: 0 3px 0 10px;
  }
`;
export default RecruitmentNotice;
