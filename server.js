// Step 1: Import libraries
let mongoose = require("mongoose");
let express = require("express");
let cors = require("cors");
let multer = require("multer");
let jwt = require("jsonwebtoken");
let dotenv =require('dotenv')
dotenv.config();
let bcrypt = require("bcrypt");
let path= require("node:path");


let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
let upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 225 }, 
});

// Step 2: Initialize Express app
let app = express();
// Step 3: Configure middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use('/uploads', express.static('uploads'));

// To get client side build folder
app.use(express.static(path.join(__dirname,"./frontend/client/build")));
// Step 4: Connect to MongoDB
let connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.mdbUrl);
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.log("Unable to connect to MongoDB", error);
  }
};
let authorise = (req,res,next)=>{
  console.log('Inside authorise');
  console.log(req.header.authorization);
  next();
};
app.use(authorise);

// Step 5: Define User schema
let userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  email: String,
  password: String,
  mobileNo: Number,
  profilePic: String,
});

// Step 6: Create User model
let User = mongoose.model("user", userSchema);

app.use("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"./frontend/client/build/index.html"));
})

// Step 7:  POST API for user registration
app.post("/register", upload.single("profilePic"), async (req, res) => {
  console.log(req.file);
  console.log(req.body);
  //bcrypt password
  let hashedPassword = await bcrypt.hash(req.body.password, 10);
  try {
    let newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      email: req.body.email,
      password: hashedPassword,
      mobileNo: req.body.mobileNo,
      profilePic: req.file.path,
    });

    await User.insertMany([newUser]);
    console.log("User saved successfully");
    res.json({ status: "Success", msg: "User created successfully" });
  } catch (error) {
    console.error("Error saving user:", error);
    res.json({
      status: "Failure",
      msg: "Unable to create User",
      error: error.message,
    });
  }
});


app.post("/login",upload.none(), async(req,res)=>{
    console.log(req.body);
   let userDetailsArr= await User.find().and({email:req.body.email})
   if(userDetailsArr.length > 0){
    console.log(req.body.password)
    console.log(userDetailsArr[0].password);
    let isPasswordCorrect = await bcrypt.compare( req.body.password,userDetailsArr[0].password);
        if(isPasswordCorrect == true){
          // jwt encrypted
          let encryptedCredentials = jwt.sign({email:req.body.email,password:req.body.password},"elections");

          let loggedInUserDetails ={
            firstName:userDetailsArr[0].firstName,
            lastName:userDetailsArr[0].lastName,
            age:userDetailsArr[0].age,
            email:userDetailsArr[0].email,
            mobileNo:userDetailsArr[0].mobileNo,
            profilePic:userDetailsArr[0].profilePic,
            token:encryptedCredentials,
          }

          res.json({status:"success",data:loggedInUserDetails});
        }else{
          res.json({status:"failure",msg:"Invalid Password"})
         }
   }else{
    res.json({status:"failure",msg:"User doesnot Exist."})
   }
})

app.post("/validateToken",upload.none(), async(req,res)=>{

  let decryptedCredentials= jwt.verify(req.body.token,"elections");

  console.log(decryptedCredentials);

  let userDetailsArr= await User.find().and({email:decryptedCredentials.email})
  if(userDetailsArr.length > 0){
       if(userDetailsArr[0].password === decryptedCredentials.password){

         let loggedInUserDetails = {
           firstName:userDetailsArr[0].firstName,
           lastName:userDetailsArr[0].lastName,
           age:userDetailsArr[0].age,
           email:userDetailsArr[0].email,
           mobileNo:userDetailsArr[0].mobileNo,
           profilePic:userDetailsArr[0].profilePic,
         }

         res.json({status:"success",data:loggedInUserDetails});
       }else{
         res.json({status:"failure",msg:"Invalid Password"})
        }
    }else{
      res.json({status:"failure",msg:"User doesnot Exist."})
      }
});

app.put("/updateUserDetails",upload.single('profilePic'),async(req,res)=>{
  console.log(req.body);
  try {
    if(req.body.firstName.trim().length > 0){
      await  User.updateMany({email:req.body.email},{firstName:req.body.firstName});
    }
    if(req.body.lastName.trim().length > 0){
      await  User.updateMany({email:req.body.email},{lastName:req.body.lastName});
    }
    if(req.body.age.trim().length > 0){
      await  User.updateMany({email:req.body.email},{age:req.body.age});
    }
    if(req.body.password.length > 0){
      await  User.updateMany({email:req.body.email},{password:req.body.password});
    }
    if(req.body.mobileNo.trim().length > 0){
      await  User.updateMany({email:req.body.email},{mobileNo:req.body.mobileNo});
    }
    if(req.file.length > 0){
      await  User.updateMany({email:req.body.email},{profilePic:req.file.path});
    }
    res.json({status:"success",msg:"Profile Updated Successfully"});

  } catch (error) {
    res.json({status:"failure",msg:"Unable to Updated the profile",error:error});
  }
 

})
app.delete('/deleteAccount',upload.single(),async (req,res)=>{
  let result = await User.deleteMany({email:req.body.email});
  console.log(req.body);
  if(result.acknowledged === true){
    res.json({status:"success",msg:"Successfully Deleted the account"});
  }else{
    res.json({status:"failure",msg:"Unable to Delete the Account"});
  }
})
// Step 8: call the function
connectToMongoDB();
// step 9 - port
app.listen(process.env.port, () => {
  console.log("Listening the port number is 7999");
});

