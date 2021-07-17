const express = require("express");
require("./db/mongoose");
const userRoutes = require("./routers/users");
const taskRoutes = require("./routers/task");
const app = express();
const port = process.env.PORT || 3000;
// app.use((req, res, next) => {
//   res.status(503).send("site is currently unavailable ! check soon !");
// });
app.use(express.json());
app.use(userRoutes); //user router
app.use(taskRoutes); //task router
app.listen(port, () => {
  console.log("Sever started on port" + port);
});

// const Task = require("./models/Task");
// const User = require("./models/User");
// const main = async ()=>{
//   const user = await User.findById('60f157c69a03f438f44922e9');
//  await user.populate('tasks').execPopulate();
//   console.log(user.tasks)
// }

// main();
const multer = require("multer");
const upload = multer(
  {
    dest:'./images',
    fileFilter:function(req,file,cb){
      if(file.originalname.match(/\.(doc|docx)$/)){
        cb(null,true);
      }else{
        cb('upload only word files',false)
      }
    },
    limits:{
      fileSize:1000000
    }
  },

);

app.post('/upload',upload.single('upload'),(req,res)=>{
   res.send();
},(error,req,res,next)=>{
  res.status(400).send(error)
})
