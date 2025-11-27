
import jwt from "jsonwebtoken"
import tokenConfig from "../config/tokenConfig.js";
const generateToken= (user)=>{
    console.log("generating token",{user})
    return jwt.sign(
        {
          id:user.id,
          role:user.role,
          username:user.username || "",
          email:user.email || ""
        },
        tokenConfig.jwtSecret, // Sign the token with the secret key
        {expiresIn:tokenConfig.jwtExpiresIn}// Set token expiration time
    )
}

export default generateToken;