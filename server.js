const express = require("express");
const app = express();
const port = 3000;
const routesLoginRoute = require("./Routes/login");
const routesUserRoute = require("./Routes/userRoute");
const routesCandidateRoute = require("./Routes/candidateRoute");
const routesVoteRoute = require("./Routes/voteRoute");
const db = require("./db.js");

const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use("/", routesLoginRoute);
app.use("/profile", routesUserRoute);
app.use("/candidate", routesCandidateRoute);
app.use("/vote", routesVoteRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
