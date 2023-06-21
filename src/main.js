require("dotenv").config();
const express = require("express");
const { init } = require("./db");
const isDebug = process.argv[2] === "debug"

const heartbeatRoutes = require("./heartbeat/heartbeat.routes");
const adsRoutes = require("./ads/ads.routes");
const userRoutes = require("./users/user.routes");
const { debugMiddleware } = require("./debug.middleware");

const app = express();

init().then(() => {
  if(isDebug){
    app.use(debugMiddleware)
  }

  app.use(express.json());

  app.use("/heartbeat", heartbeatRoutes);
  app.use("/ads", adsRoutes);
  app.use("/users", userRoutes)

  app.use("*", (_, res)=>{
    console.log("req on invalid url");
    res.status(404).sendFile(__dirname + '/404.jpg')
  })

  app.listen(process.env.PORT, () => {
    console.log(`App running on localhost:${process.env.PORT}`);
  });
});
