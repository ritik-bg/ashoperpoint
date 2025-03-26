import jwt from 'jsonwebtoken'
import dotenv from "dotenv";


dotenv.config();

const verifytoken= (req,res,next)=>{
    const token = req.cookies.token ||  req.headers['authorization'];

    if(!token){
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    try{
        const decoded = jwt.verify(token,process.env.SECRET_KEY)
        req.user = decoded;
        next();
    }
    catch(error){
        console.log(`errore in verification middleware ${error}`)
    }
}

export default verifytoken