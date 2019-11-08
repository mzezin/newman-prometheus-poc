![Perseus](https://raw.githubusercontent.com/mzezin/newman-prometheus-poc/master/logo.png "Perseus")

# Service avaliability check with Newman + Prometheus (PoC)


## Run application:
1. `npm install`
2. `npm start`

Prometheus endpoint avaliable at http://localhost:3000/prometheus

## Sample collecton

Put Postman collection named as `collection.json` into `collections` folder.

## Sample test cases:
1. Random User API (https://randomuser.me)
    - status 200 (always passing)
    - user gender is male (random passing)
2. Beer API (https://punkapi.com)
    - status 200 (always passing)
    - beer name is Buzz (always passing)
3. Failing API (some random 404 url)
    - status 200 (never passing)


## Build docker image: 

`docker build -t perseus-monitoring:latest . ` 

or 

`npm run docker:build `

## Run docker image:

`docker run -d -p 3000:3000 --name perseus-monitoring perseus-monitoring`

or 

`npm run docker:run `

## Path variables:

- `PORT` - server port (defaults to 3000)
- `INTERNAL_METRICS` - add node.js app metrics to prometheus (defaults to false)
- `POLLING_INTERVAL` - API check interval (defaults to 10000 ms) 

## Find port in use(MacOS):

`lsof -nP -i4TCP:3000 | grep LISTEN`
