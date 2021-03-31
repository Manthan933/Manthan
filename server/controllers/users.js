const User = require('../models/users.model');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

/**Age of the token in seconds*/
const mymaxAge = 1 * 24 * 60 * 60;
const createToken = (email, username, usertype) => {
    /**ًWhen this is released to production, 'Manthan Secret' should be not uploaded to public' */
    return jwt.sign({ email, username, usertype }, 'Manthan Secret', { expiresIn: mymaxAge });
}



// Register a new User
module.exports.userSignup = async function(req, res)  {
	try {
		const { name, email, password, userType,username,confirmPassword } = req.body;
        // User should have unique email and username
        let user = await User.findOne({email: req.body.email});
        let user2 = await User.findOne({username: req.body.username});   
		// Check if user is already Registered
		if (user) {
			return res.status(400).json({
				message:
					"This email is already registered, try with another email or login instead",
			});
        }
        // User should be of unique username
        if (user2) {
			return res.status(400).json({
				message:
					"This username is already exist, try with another username instead",
			});
        }
        // check if confirm password and password match 
        if(confirmPassword!=password){
            return res.status(422).json({
				message:
					"Password and confirm-password not equal",
			});

        }

        // Check the length of the password(it should be greater than 7)
        if(password.length<7){
            return res.status(401).json({
				message:
					"The password length is too small",
			});

        }
           
        // Encrypt Password
           const salt = await bcrypt.genSalt(10);
           const hashedPwd = await bcrypt.hash(password, salt);
        
        
        // If user type is teacher we can add some approving features for a teacher to register later
        if(userType=="teacher"){
            
            
            const newUser=await User.create( { name:name, email:email,password: hashedPwd,userType: userType,username:username });
            newUser.save()
             //create a jwt and send it with cookies to be used later
            const token = createToken(email , username , userType);
            res.locals.user = username;
            res.locals.role = userType;
            res.cookie('jwt', token, { httpOnly: true, maxAge: mymaxAge * 1000 });/*maxAge is in milliseconds , mymaxAge is in seconds*/
            return res.status(201).json({
				message:
					"Your teacher account is succesfully registered",
			});
        }

        if(userType == "user"){
		const newUser=await User.create( { name:name, email:email,password: hashedPwd,userType: userType,username:username });
        newUser.save()   
        //create a jwt and send it with cookies to be used later
        const token = createToken(email , username , userType);
        res.locals.user = username;
        res.locals.role = userType;
        res.cookie('jwt', token, { httpOnly: true, maxAge: mymaxAge * 1000 });/*maxAge is in milliseconds , mymaxAge is in seconds*/
        return res.status(201).json({
            message:
                "Your student account is succesfully registered",
        });
        }

	} catch (err) {
		console.log('********',err);
		return res.status(500).json({
			message: "Internal Server Error",
		});
	}
}



// Function for login for a user

module.exports.login = async function(req, res){

    try{

        // Check for user
        let user = await User.findOne({username: req.body.username});
             if (!user){
                return res.json(401, {
                 message: "Invalid username or Password"
			   });
			
		}
        // Compare the password
        let pwdMatch = await bcrypt.compare(req.body.password, user.password);
			if (!pwdMatch){
				return res.status(401).json({ message: "Invalid Email or Password" });
            }
            else{
            const token = createToken(user.email , user.username , user.userType);
            res.locals.user = user.username;
            res.locals.role = user.userType;
            res.cookie('jwt', token, { httpOnly: true, maxAge: mymaxAge * 1000 });/*maxAge is in milliseconds , mymaxAge is in seconds*/

                return res.status(201).json({message:"Successfully logged in"})
            }

    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}


module.exports.logout = async function(req,res)
{
    //We can't really delete the jwt from the server side but we can override it with the same name and a very short age to be automatically expired
    //Also set the content to an empty string
    res.cookie('jwt', '' , { maxAge: 1});
    res.redirect('/');
}

