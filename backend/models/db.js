const mongoose = require("mongoose");
console.log(process.env.DATABASE_URI);
mongoose
.connect(process.env.DATABASE_URI)
.then(() => {
    console.log("DB Ready To Use");
})
.catch((err) => {
    console.log("here",err);
});