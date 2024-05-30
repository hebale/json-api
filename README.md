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

### 콘셉트

front 와 back의 개발기간의 갭으 줄이기위한 json api 생성 테스트 app
s

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
    ├── config # 번들 config
    │   └── webpack.config.cjs
    ├── context # 전역적으로 선어된 context모
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
    ├── feature # 최소 기능 단위 UI
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
    ├── json # API json 데이터 저장경로
    │   └── ...
    ├── layout # 화면 레이아웃 구성 UI
    │   ├── Body.tsx
    │   └── Header.tsx
    ├── loader # express 초기로더 모음
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

## 이슈사항

- Optimistic Update 에러 확인 필요
- <!-- Headers 자동 폼태그 삽입 로직 제작필요(ex. postman) -->
- MapInput default value 로직 제작

### test

- validation 작업
- monaco 스키마 설정 확인
- 다운로드 버튼 기능확인
- 다중등록 -> json파일 스카마 작성

### ui

- pipeline 구성 ui 제작
- monaco 커스텀스타일 작성
- 탭구조 확장

- MapInput 컴포넌트 기능정의

1. 자료구조
   {
   isActive: boolean;
   key: string;
   value: string | number;
   }

2. 기능

   - create : 하위에 항목추가 (default: false, "", "" ) - onChange(x)
   - read : 항목 로드
   - update : key, value 업데이트 시 - onChange(o) debounce
     : isActive - onChange(o) - immediately
   - delete : 선택된 항목제거 - onChange(o) - immediately

3. 상세 UI

   - update 행위가 일어나도 focus된 항목은 유지 (header)
   - 동일한 key가 입력될시 onChange(x) 오류 표시
   - 반복적인 호출로 인한 optimistic update 값이 오염되지 않음 ((처리)
   -

4. 이슈사항
   - 리스트의 key값을 유지해야하는지 따로 업데이트가 필요한 값으로 대체할지 선택(ex. cryto.randomUUID());
