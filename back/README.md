# 포트폴리오 공유 서비스 백엔드

## 파일 구조 설명

1. src폴더는 크게는 routers, services, db의 3개 폴더로 구분됩니다.

- routers:
  - request와 response가 처리됩니다. MVP 별로 1개씩, 총 5개 파일이 있게 됩니다.
- services:
  - 백엔드 로직 코드가 있습니다. MVP 별로 1개씩, 총 5개 파일이 있게 됩니다.
- db:
  - Mongoose와 mongodb 서버를 연결하는 코드가 있는 index.js
  - Mongoose 스키마가 있는 schemas 폴더,
  - Mongoose 모델 ORM 코드가 있는 models 폴더

2. 이외 폴더는 아래와 같습니다.

- src/middlewares:
  - jwt토큰을 다루는 미들웨어인 login_required.js
  - 일괄 http 400 코드로 에러를 변환하는 에러핸들러인 errorMiddleware.js
  - 토큰 검증하는 미들웨어인 verifyToken.js
