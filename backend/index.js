const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./models/db");
const app = express();
const PORT = process.env.PORT ;


app.use(cors());
app.use(express.json());
//import users router
const usersRouter = require("./routes/users")
//import users router
const rolesRouter = require("./routes/roles")
//import initiative router
const initiativeRouter = require("./routes/initiative")
//import category router
const categoryRouter = require("./routes/category")
//import category router
const donationRouter = require("./routes/donation")

//import category router
const reviewRouter = require("./routes/review")

//----------------
// users Router
app.use("/users", usersRouter);

// review Router
app.use("/review", reviewRouter);

// roles Router
app.use("/roles", rolesRouter);

// initiative Router
app.use("/initiative", initiativeRouter);

// category Router
app.use("/category", categoryRouter);

// donation Router
app.use("/donation", donationRouter);

// Handles any other endpoints [unassigned - endpoints]

app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
