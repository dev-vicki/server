require('dotenv').config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");

// getting my routes
 const authRoute = require("./routes/auth");
 const userRoute = require("./routes/users");
 const postRoute = require("./routes/posts");
 const conversationRoute = require("./routes/conversation");
 const messageRoute = require("./routes/message");


mongoose.connect(process.env.DATABASE,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
   })
  .then(() => console.log("DATABASE CONNECTED!"))
  .catch(err => console.log(err));


app.use("/images", express.static(path.join(__dirname, "public/images")));

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null, "public/images");
  },
  filename:(req,file,cb)=>{
    cb(null, req.body.name);
  }
})

const upload = multer({storage:storage});
app.post("/api/upload", upload.single("file"), (req, res)=>{
  try{
  return res.status(200).json("File uploaded successfully")
  }catch(err){
    console.log(err)
  }
})

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// routes
 app.use("/api/auth", authRoute);
 app.use("/api/users", userRoute);
 app.use("/api/posts", postRoute);
 app.use("/api/conversation", conversationRoute);
 app.use("/api/message", messageRoute);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Backend server running at ${port}`);
});
