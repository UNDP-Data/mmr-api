const express = require("express");
const cors = require("cors");
const getData = require("./getData");
const getDataList = require("./getDataList");

const app = express();

app.use(cors());

// define the first route
app.get("/", function (req, res) {
  res.send(
    "<h2>API to fetch data from KoboToolBox</h2>"
  );
});

// start the server listening for requests
app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));

app.use("/get-data", getData);
app.use("/get-indicator-list", getDataList);