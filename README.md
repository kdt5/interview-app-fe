## 프로젝트 개요

이 프로젝트는 Interview It이라는 면접 답변 연습 어플리케이션의 프론트엔드 개발 프로젝트입니다.

빠른 프로젝트 설정을 위해서 Vite + TypeScript + React 템플릿을 사용하여 초기 프로젝트 세팅을 했습니다.

## 개발 문서

Workspace root에 `.env.development.local` 파일을 만들고 다음 내용을 정의합니다.

``` shell
    VITE_DEVELOPMENT_MSW_MODE = false
```

| 환경 변수                  | 설명                                      | 값 예시   |
|---------------------------|-----------------------------------------|----------|
| `VITE_DEVELOPMENT_MSW_MODE` | MSW를 활성화할지 여부를 지정합니다.<br />비활성화시 백엔드 서버로 연결합니다.          | `true` / `false` |
