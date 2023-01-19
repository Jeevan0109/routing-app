const express = require("express");
const app = express();
const bodyparser = require("body-parser");

const route = require("./router");

const port = process.env.PORT || 3000;

app.use(bodyparser.urlencoded({ extended: true }));

//get all data from accounts data base using /api/accounts
app.use("/api", route);

// home route
app.get("/", (req, res) => {
  res.end("Routing App");
});

app.listen(port, () => {
  console.log(`Express application is running on http://localhost${port}`);
});
