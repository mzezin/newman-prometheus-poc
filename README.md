Service avaliability check with Newman + Prometheus PoC
=============================

Run application

1. `npm i`
2. `npm start`

Put Postman collection named as `collection.json` into `collection` folder.

Sample test cases:
1. Random User API (randomuser.me)
    - status 200 (always passing)
    - user gender is male (random passing)
2. Beer API (punkapi.com)
    - status 200 (always passing)
    - beer name is Buzz (always passing)
3. Failing API (some random 404 url)
    - status 200 (never passing)

Prometheus endpoint avaliable at http://localhost:3000/prometheus



