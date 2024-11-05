const express = require('express');
const userRouter = require("./router/users.js");
const app = express();
const port = 5001;

app.use(express.json());
app.use("/users",userRouter);

app.get("/",(req,res)=>{
    res.send("Hello Yamini....")
})

app.listen(port,()=>console.log(`server listening on port ${port}`));