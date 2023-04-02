const express = require("express")
const mongoose = require('mongoose')

// import router
const authRouter = require("./routes/auth")
const adminRouter = require("./routes/admin");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");


const PORT = 3000;
const app = express();
let DBURL = proccess.env.DB_URL;


//moddleware
app.use(express.json())
app.use(authRouter)
app.use(adminRouter);
app.use(productRouter);
app.use(userRouter);

/// home route
// app.get('/', (req, res)=>{
//     console.log("get")
//     // res.send("hello")
//     res.json({name:"jameel"})
// })

////connstion
mongoose.connect(DBURL)
.then(()=>{
    console.log("conntection success")
})
.catch((e)=>{
    console.log(e)
})


app.listen(PORT, '0.0.0.0', ()=>{
    console.log(`connected ${PORT}`)
})