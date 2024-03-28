## JSON-API

JSON 데이터 타입 기반 API 생성 및 테스트 APP

### 실행

```bash
# node v20.11.1
npm -i -g pnpm # pnpm 패키지 메니저 설치
pnpm install
pnpm dev # 화면 UI 서버
pnpm start # api서버 & 화면 UI서버
```

### 폴더구조

확장자 분류
ts,tsx > 화면 UI 구성 파일
cjs > node서버 구동 commonjs

```bash
json-api
├── public # 빌드 경로
└── src
    ├── api
    │   ├── http.ts # http 통신 공통함수
    │   └── index.ts # json-api CRUD
    ├── assets # 콘텐츠 리소스 폴더(font,image,scss)
    │   └── style.css
    ├── components
    │   ├── ApiListItem # API 아코디언 리스트 항목
    │   │   ├── Editor.tsx
    │   │   ├── index.tsx
    │   │   ├── Methods.tsx
    │   │   └── Summary.tsx
    │   └── ApiSearchBar # API 검색바
    ├── config
    │   └── webpack.config.cjs # 웹팩 번들러 config
    ├── context
    │   ├── AlertContext.tsx # Action의 결과 상태(success, info, error, warning) 메시지 표시 UI
    │   ├── DialogContext.tsx # Dialog 모달|비모달 데이터 표현&수정 화면 UI
    │   └── ModalContext.tsx # 사용자의 의사 확인(alert, prompt, comfirm) 모달 UI(Promise 객체반환)
    ├── dialog
    │   ├── CreateApiDialog # API 생성 Dialog UI
    │   │   ├── index.tsx
    │   │   ├── InputForm.tsx
    │   │   ├── TabContext.tsx
    │   │   └── UploadForm.tsx
    │   └── EdidtApiDialog # API 수정 Dialog UI
    │       ├── Editor.tsx
    │       └── index.tsx
    ├── feature # 기능 단위의 최소 화면구성 UI
    │   ├── Alerts.tsx
    │   ├── CopyButton.tsx
    │   ├── Dialogs.tsx
    │   ├── DownloadButton.tsx
    │   ├── DropBox.tsx
    │   ├── Modals.tsx
    │   └── Monaco.tsx
    ├── hooks # 서비스 기능호출 hooks
    │   ├── useAlert.ts
    │   ├── useDialog.ts
    │   └── useModal.ts
    ├── json # DB용 json 데이터 저장경로
    │   └── ...
    ├── layout # 화면 레이아웃 구성 UI
    │   ├── Body.tsx
    │   └── Header.tsx
    ├── loader #
    │   └── index.cjs
    ├── schema # JSON 파일 스키마 정의
    │   └── index.ts
    ├── service # 노드서버 서비스 항목
    │   ├── api.cjs
    │   ├── error.cjs
    │   ├── index.cjs
    │   └── json.cjs
    ├── types # 타입스크립트 타입정의 폴더명 기준 파일생성
    │   ├── components.ts
    │   └── features.ts
    ├── utils # 공통사용 순수함수 유틸
    │   └── index.ts
    ├── app.cjs # 노드서버 실행 진입점
    └── index.tsx # 화면 UI 진입점
```
