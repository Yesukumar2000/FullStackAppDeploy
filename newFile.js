let jwt = require("jsonwebtoken");
const { app, upload, User } = require("./server");

app.post("/validateToken", upload.none(), async (req, res) => {
  let decryptedCredentials = jwt.verify(
    req.decryptedCredentials.token,
    "elections"
  );

  console.log(decryptedCredentials);

  let userDetailsArr = await User.find().and({
    email: decryptedCredentials.email,
  });
  if (userDetailsArr.length > 0) {
    if (userDetailsArr[0].password === decryptedCredentials.password) {
      let loggedInUserDetails = {
        firstName: userDetailsArr[0].firstName,
        lastName: userDetailsArr[0].lastName,
        age: userDetailsArr[0].age,
        email: userDetailsArr[0].email,
        mobileNo: userDetailsArr[0].mobileNo,
        profilePic: userDetailsArr[0].profilePic,
        //  token:encryptedCredentials,
      };

      res.json({ status: "success", data: loggedInUserDetails });
    } else {
      res.json({ status: "failure", msg: "Invalid Password" });
    }
  } else {
    res.json({ status: "failure", msg: "User doesnot Exist." });
  }
  // res.json({status:"recieved the JWtoken",data:req.body})
});
