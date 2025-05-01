import { FRONTEND_URLS } from "../constants/Urls";
import { replaceUrlParams } from "./Url";

export function getAnsweredQuestionUrl(
  questionId: number,
  answerId?: number
): string {
  return answerId !== undefined
    ? replaceUrlParams(FRONTEND_URLS.ANSWER_DETAIL, {
        questionId: questionId.toString(),
        answerId: answerId.toString(),
      })
    : replaceUrlParams(FRONTEND_URLS.ANSWER, {
        questionId: questionId.toString(),
      });
}
