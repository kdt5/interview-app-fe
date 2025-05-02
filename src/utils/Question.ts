import { FRONTEND_URLS } from "../constants/Urls";
import { replaceUrlParams } from "./Url";

export function getAnsweredQuestionUrl(
  questionId: number,
  answerId?: number
): string {
  return answerId !== undefined
    ? replaceUrlParams(FRONTEND_URLS.COMMUNITY.ANSWERS, {
        questionId: questionId.toString(),
      })
    : replaceUrlParams(FRONTEND_URLS.ANSWER, {
        questionId: questionId.toString(),
      });
}
