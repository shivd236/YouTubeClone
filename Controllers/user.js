const User = require("../Modals/user");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const cookieOptions = {
  httpOnly : true,
  secure : false, // set to true in production
  sameSite : 'Lax'
};


//----> Signup api
exports.signUp = async (req, res) => {
  try {
    const { channelName, userName, about, profilePic, password } = req.body;

    const Userexist = await User.findOne({
      userName: userName,
    });
    if (Userexist) {
      return res
        .status(400)
        .json({
          message:
            "This username is Already Exist Please try with other username!",
        });
    } else {
      // --> password hashing;
      const hashPassword = await bcrypt.hash(password, 10);
      //<------------------------------------------------------------------------------------>
      const user = new User({
        channelName,
        userName,
        about,
        profilePic,
        password: hashPassword,
      });

      await user.save();

      return res.status(201).json({
        message: "User Sucessfully Created",
        result: user,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//------------------> Login

exports.signIn = async (req, res) => {

  const {userName , password} = req.body;

  try {
    const user = await User.findOne({
      userName,
    })
    if (user && await bcrypt.compare(password , user.password)) {

      const token = await jwt.sign({userId : user._id }, 'Its_My_Secret_Key');
      res.cookie('token', token, cookieOptions);

      //, {expiresIn: '7d'}
      
      
      return res.status(200).json({message : "User Login Successfully .", token : token, user})
      
    } else {
      res.status(400).json({error : "Invalid Credentials"});
    }



  } catch (error) {
    return res.status(500).json({message : error.message,
    })
  }
  
};

///---------------- LogOut APi -----------------------> 
exports.logout = async(req, res) =>{
  res.clearCookie('token', cookieOptions).json({message : "User Logged Out Successfully" });
}

