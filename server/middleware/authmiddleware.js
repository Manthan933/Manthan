const jwt = require('jsonwebtoken');

//This function is called when you need to confirm that the user is authenticated
const isUser = (req, res, next) => {
    //This needs to be accompanied with require cookie-parser in the calling route
    const token = req.cookies.jwt;

    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, 'Manthan Secret', (err, decodedToken) => {
            if (err) {
                console.log(err);
                //if he is not authenticated, redirect to login page
                res.redirect('/login');
            }
            else //the token is verified 
            {
                //next() will make you apple to porceed with the function called this Auth confirmation
                next();
            }
        })

    }
    else //There is no token 
    {
        res.redirect('/login');
    }
}

//This function is called when you need to confirm that the user is autherized as a teacher.
const isTeacher = async (req, res, next) => {

    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'Manthan Secret', async (err, decodedToken) => {
            if (err) {
                res.redirect('/signup')
            }
            else if (decodedToken.userType != "teacher") {
                res.redirect('/404')
            }

            else
            {
                res.locals.user = decodedToken.username;
                res.locals.email = decodedToken.email;
                res.locals.role = decodedToken.userType;
                next();
            }
                
        });
    } 
    else {

        res.redirect('/signup')
    }
}


module.exports = {
    isUser,
    isTeacher
}; 