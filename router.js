const express = require("express");
const route = express.Router();

var accounts = require("./database");

//first route
//GET Request
route.get("/accounts", (req, res) => {
  res.json({ userdata: accounts });
});

//POST Request
route.post("/accounts", (req, res) => {
  const incomingAccount = req.body;
  accounts.push(incomingAccount);
  res.json(accounts);
});

// // i want to get data id 2
route.get("/accounts/:id", (req, res) => {
  const accountsID = Number(req.params.id);
  const getAccount = accounts.find((account) => account.id === accountsID);

  if (!getAccount) {
    res.status(500).send("Account not found");
  } else {
    res.json({ userData: [getAccount] });
  }
});

//put and delte http method

//put http method
// put method using for update
route.put("/accounts/:id", (req, res) => {
  const accountsid = Number(req.params.id);
  const body = req.body;
  const account = accounts.find((acc_id) => acc_id.id === accountsid);
  const index = accounts.indexOf(account);

  if (!account) {
    res.status(500).send("Account not found");
  } else {
    const updatedAccounts = { ...account, ...body };
    accounts[index] = updatedAccounts;
    res.send(updatedAccounts);
  }
});

//delete the data using http request

route.delete("/accounts/:id", (req, res) => {
  const accountsid = Number(req.params.id);

  const newAccounts = accounts.filter(
    (account_id) => account_id.id != accountsid
  );

  if (!newAccounts) {
    res.status(500).send("Accounts Not Found");
  } else {
    accounts = newAccounts;
    res.send(accounts);
  }
});

module.exports = route;
