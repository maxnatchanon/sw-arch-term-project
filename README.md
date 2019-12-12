# SW ARCH — Term Project

The list of ports used by all services.  

| Service                    |          Port           |
| -------------------------- | ----------------------- |
| Database service           |          9000           |
| Problem Sevice             |        8080,8081        |
| User Service               |          7000           |
| Leaderboard Service        |          6000           |
| API Gateway Service        |          5000           |
| UI Service                 |          3000           |

<hr>

### How to run
**1. Start database service** (MongoDB is required)  
In the `db-service` folder, run the following command  
```
npm install
node server.js 
```  
**2. Start API gateway service**
In the `gateway` folder, run the following commands  
```
npm install
node gateway.js
```
**3. Start backend services** (services can be started in any order)  
In the `leaderboard-service` and `user-service`, run the following commands  
```
npm install
node <service_name>.js
```
replace `<service_name>` with the name of service Javascript file in the folder.
In the `problem-service`, run the following commands
```
npm install
PORT=8080 node problem-service.js
```
and in a new terminal, run
```
PORT=8081 node problem-service.js
```
to start two instances of `problem-service` at port 8080 and 8081  
**4. Start UI service**  
In the `ui-service`, run the following commands  
```
npm install
npm start
```
Now enter `localhost:3000` in your browser. The login screen should appear.  

<hr>

Problem list is in `db-service/problems.json` which will be read by `db-service` at the startup.
