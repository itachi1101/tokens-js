const jwt = require("jsonwebtoken");
const User = require("../models/User");
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  // checking if the token exists and then verfiy
  if (token) {
      jwt.verify(token,"aviral secret",(err,decodedToken)=>{
          if(err){
              res.redirect('/login')
          }
          else{
              next()
          }
      })
  } else {
    res.redirect("/login");
  }
};

// checking current user
const checkUser=(req,res,next)=>{
    const token=req.cookies.jwt;
    if(token){
        // verifying the token
        jwt.verify(token,'aviral secret',async (err,decodedToken)=>{
            if(err){
                console.log(err.message);
                res.locals.user=null
                next()
            }
            else {
                let user= await User.findById(decodedToken.id)
                res.locals.user=user;
                next()

            }
        })

    }
    else{
        res.locals.user=null
        next()
    }
}

module.exports={requireAuth,checkUser}