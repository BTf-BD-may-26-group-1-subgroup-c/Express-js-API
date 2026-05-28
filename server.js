const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Let's define the structure of tasks here.
//Let's add an array of tasks
//senete05 i suggest to use bank api like as shown below
let accounts = [
  { id: 1, holder: "Amina Yusuf", balance: 1250.75, type: "Savings" },
  { id: 2, holder: "John Kamau", balance: 320.0, type: "Checking" },
  { id: 3, holder: "Fatma Ali", balance: 5000.0, type: "Business" },
];

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Account manager Express.js BANK API by Group 1",
    status: "ok",
  });
});

//handler functions for accounts

//get all accounts(get request)
function getAllAccounts(req, res) {
  res.status(200).json({ message: "All accounts", data: accounts });
}
//get single account by id(get request)
function getAccount(req, res) {
  //simple algorithm to get an account by id from the accounts array.
  //we will get the account id from the request parameters,
  // find the account in the accounts array,
  // if not found return a 404 error,
  // if found return the account details.
  const id = parseInt(req.params.id);
  const account = accounts.find((a) => a.id === id);
  if (!account) {
    return res.status(404).json({ message: "Account not found" });
  }
  res.status(200).json({ message: "Account Details", data: account });
}

//create new account(post request)
function createAccount(req, res) {
  //simple algorithm to create a new account and add it to the accounts array.
  //we will get the account details
  // from the request body and create a new account object,
  // then push it to the accounts array.
  const { holder, balance, type } = req.body;
  if (!holder || balance === undefined || !type) {
    return res
      .status(400)
      .json({ message: "Missing required fields: holder, balance, type" });
  }
  //here our new array will have an id which is the
  // length of the accounts array + 1,
  //  and the rest of the details from the request body.
  const newAccount = {
    id: accounts.length + 1,
    holder,
    balance,
    type,
  };
  accounts.push(newAccount);
  res.status(201).json({ message: "Account created", data: newAccount });
}

//update account details(put request)
function updateAccount(req, res) {
  //simple algorithm to update an account in the accounts array.
  //we will get the account id from the request parameters,
  // find the account in the accounts array,
  // if not found return a 404 error,
  // if found update the account details with the data from the request body and
  // return the updated account.
  const id = parseInt(req.params.id);
  const account = accounts.find((a) => a.id === id);
  if (!account) {
    return res.status(404).json({ message: "No Details Found" });
  }
  const { holder, balance, type } = req.body;
  account.holder = holder;
  account.balance = balance;
  account.type = type;
  res.status(200).json({ message: "Account updated", data: account });
}

//delete account(delete request)
function deleteAccount(req, res) {
  //simple algorithm to delete an account from the accounts array.
  //we will get the account id from the request parameters,
  // find the account in the accounts array,
  // if not found return a 404 error,
  // if found remove the account from the array and return a success message.
  const id = parseInt(req.params.id);
  const accountIndex = accounts.findIndex((a) => a.id === id);
  if (accountIndex === -1) {
    return res.status(404).json({ message: "Account not found" });
  }
  const deletedAccount = accounts.splice(accountIndex, 1)[0];
  res.status(200).json({ message: "Account deleted", data: deletedAccount });
}

//let's call the above controller functions and attach them to the respective routes.
app.get("/accounts", getAllAccounts);
app.get("/accounts/:id", getAccount);
app.post("/accounts", createAccount);
app.put("/accounts/:id", updateAccount);
app.delete("/accounts/:id", deleteAccount);

//i tested with postman and it works fine.
// you can also test it with postman or any other API testing tool.
// just make sure to start the server first by running "npm start" or "npm run dev" in the terminal.

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
