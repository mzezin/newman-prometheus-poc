![Perseus](https://raw.githubusercontent.com/mzezin/newman-prometheus-poc/master/logo.png "Perseus")

# Service avaliability check with Newman + Prometheus (PoC)


Put Postman collection named as `collection.json` into `collections` folder.

## Run application:
1. `npm install`
2. `npm start`

Prometheus endpoint avaliable at http://localhost:3000/prometheus

## Build docker image: 

`docker build -t perseus-monitoring:latest . ` 

or 

`npm run docker:build `

## Run docker image:

`docker run -d -p 3000:3000 --name perseus-monitoring perseus-monitoring`

or 

`npm run docker:run `

## Path variables:
#### Mandatory:
- `BASEURL` - use {{baseUrl}} in Postman
- `USERNAME` - use {{username}} in Postman
- `PASSWORD` - use {{password}} in Postman
#### Optional: 
- `TIMEOUT` - request timeout (defaults to 500)
- `ENDPOINT_NAME` - endpoint name (defaults to `prometheus`)
- `PORT` - server port (defaults to 3000)
- `INTERNAL_METRICS` - add node.js app metrics to prometheus (defaults to false)
- `POLLING_INTERVAL` - API check interval (defaults to 10000 ms) 


## Find port in use(MacOS):

`lsof -nP -i4TCP:3000 | grep LISTEN`
