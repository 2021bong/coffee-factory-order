# 커피 공장 주문 받습니다

점심 시간 커피 주문을 편하게 하기 위한 커피 주문 취합 프로젝트

![커피 공장 주문 받습니다 썸네일](https://velog.velcdn.com/images/2021bong/post/9db4d102-2bc1-48dd-8cd3-0401ba9fd26f/image.png)

<br />

## 목차

[한국어](README.md) | [ENGLISH](README.en.md)

- [설명](#설명)
- [배포](#배포)
- [특징](#특징)
- [설치&nbsp;및&nbsp;실행](#설치 및 실행)

<br />

## 설명

수동으로 커피 주문을 취합할 때 불편했던 점 개선을 위한 프로젝트

_불편했던 점_

1. 카톡 채팅으로 주문을 받으니 다른 대화와 섞여 주문이 누락되는 경우가 발생
2. 규격화 되지 않은 메세지를 보고 취합 해야하는 불편함과 그에 따른 실수 발생 가능성
3. 주문 마감 시간을 넘겨 주문 했을 때 주문을 받아야할지에 대한 애매함

_추가할 기능_

- 연하게, 덜달게 옵션 추가
- 주문 취소
- 스타일링

## 배포

[📌 커피 공장 주문 받습니다](https://coffee-factory-order.vercel.app/)

<br />

## 특징

1. 커피 주문

커피를 주문할 수 있습니다. 선택에 없는 메뉴는 기타로 선택하면 입력하여 주문할 수 있습니다.

<img width="530" alt="메뉴 선택" src="https://github.com/2021bong/coffee-factory-order/assets/49029756/b4874576-1283-44c9-b35f-7f83a6c59de8">
<img width="530" alt="기타 선택 시" src="https://github.com/2021bong/coffee-factory-order/assets/49029756/e5766bb2-09bd-4f11-8414-800a35530c16">

2. 주문 시간 제한

주문 시작 후 10분 안에 주문을 완료해야합니다. 그 이후에는 주문이 불가합니다.

<img width="300" alt="시간 제한" src="https://github.com/2021bong/coffee-factory-order/assets/49029756/4b610c45-727e-482d-8e7a-ed61a8d3b0b2">
<img width="300" alt="주문 마감" src="https://github.com/2021bong/coffee-factory-order/assets/49029756/306d6b18-9ce1-46dd-9d6d-b5dca4b57349">

3. 주문 & 배달 모드

주문할 때 키오스크에 입력하기 편한 주문 모드, 누가 주문했는지 확인하는 배달 모드 두가지 모드가 있습니다.

<img width="300" alt="주문 모드" src="https://github.com/2021bong/coffee-factory-order/assets/49029756/fe257b31-92cf-441d-844a-bbf322d42017">
<img width="300" alt="배달 모드" src="https://github.com/2021bong/coffee-factory-order/assets/49029756/041b4bb6-784f-4ae5-bd61-0fa0ec767e61">

4. 내 주문 내역

내가 마지막으로 주문한 내역을 확인할 수 있습니다.

<img width="300" alt="내 주문 내역" src="https://github.com/2021bong/coffee-factory-order/assets/49029756/ef287920-7f19-470e-8e63-b7862b60d656">

<br />

## 설치&nbsp;및&nbsp;실행

### 준비 사항

프로젝트를 켜기 전에, 컴퓨터에 아래 사항들이 설치되어 있어야합니다.

- [Node.js](https://nodejs.org/) (>=14.x)
- [npm](https://www.npmjs.com/)
- [Vercel CLI](https://vercel.com/download)

### 설치

1. 레포지토리 클론 :

```bash
git clone https://github.com/your-username/your-project.git

cd coffe-factory-order
```

2. npm 패키지 설치 :

```bash
npm install
```

3. Vercel Postgres 연결 :

[vercel-postgres/quickstart](https://vercel.com/docs/storage/vercel-postgres/quickstart)를 참고하여 3단계까지 진행합니다.

2단계는 파일 프로젝트 root 경로에 `.env`파일을 생성해 붙여 넣습니다.

(4단계의 테이블 생성은 프로젝트 내부의 `/api/create-tables/route.ts`에서 주석을 해제하고 다음 단계인 '4. 프로젝트 실행'을 진행한 뒤 url을 방문하여 생성합니다.)

4. 프로젝트 실행 :

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)로 접속하면 프로젝트를 확인할 수 있습니다.
