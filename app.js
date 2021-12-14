require("dotenv").config();
require("./database/database").connect();
const express = require("express");
const auth = require("./middleware/auth");
const jwt = require("jsonwebtoken");

// importing user context
const user = require("./model/user");
const role = require("./model/role");
const session = require("./model/session");
const organization = require("./model/organization");

const app = express();

app.use(express.json());

app.post("/register", async (req, res) => {

    // Our register logic starts here
    try {
      // Get user input
      const { user_id, organization_id, roll_id, user_full_name, user_email_id, user_roll_name, user_phone_num, user_password } = req.body;
  
      // Validate user input
      if (!(user_email_id && user_password)) {
        return res.status(400).send("All input is required!");
      }
  
      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await user.findOne({ user_email_id });
  
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
  
      // Create user in our database
      const user1 = await user.create({
        user_id, 
        organization_id, 
        roll_id, 
        user_full_name, 
        user_email_id,
        user_roll_name, 
        user_phone_num, 
        user_password,
        created_at: Date(),
        updated_at: Date()
      });

    // Create token
    const token = jwt.sign(
      { user_email_id: user_email_id, user_full_name: user1.user_full_name, organization_id: user1.organization_id },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    const session1 = await session.create({
      user_id: user1.user_id,
      jwt_token: token,
      last_requested_at: Date()
    });
    console.log(token);
    session1.user_email_id = user1.user_email_id;
    session1.token = token
  
      // return new user
      return res.status(200).json(user);
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
});
    
// Login
app.post("/login", async (req, res) => {
    // Our login logic starts here
  try {
    // Get user input
    const { user_email_id, user_password } = req.body;
    // console.log(req.body);
    // Validate user input
    if (!(user_email_id && user_password)) {
      return res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user1 = await user.findOne({ user_email_id });
    // console.log(user1);

    if (user1 && (user_password === user1.user_password)) {
      // Create token
      var date = Date();
      const token = jwt.sign(
        { user_email_id: user_email_id, user_full_name: user1.user_full_name, organization_id: user1.organization_id },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // console.log(token);
      // save user token
      const session1 = session.create({
        user_id: user1.user_id,
        jwt_token: token,
        last_requested_at: Date()
      });


      // user
      return res.status(200).json(user1);
    }
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

app.post("/welcome", auth, (req, res) => {
    return res.status(200).send("Welcome to home page.....");
});

module.exports = app;