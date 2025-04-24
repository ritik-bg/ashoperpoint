import express from 'express';
import { MongoClient } from 'mongodb';
import { urlencoded } from 'express';
import Cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import cookieParser from "cookie-parser";
import verifytoken from './Authmiddleware.js'

dotenv.config();


const app = express();
const port = 3000;
app.use(Cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use(
    Cors({
        credentials: true, // ✅ Allow cookies to be sent & received
        origin: "http://localhost:5173/signin", // ✅ Replace with your frontend URL
    })
);
app.use(cookieParser());






const dbName = 'ShopperPoint';

const client = new MongoClient(process.env.MONGO_URI);
client.connect()
    .then(() => {
        console.log('Connected successfully to the database');


    });



const db = client.db(dbName);
const Collection = db.collection('users');




//GET request

app.get('/', async (req, res) => {

    const data = await Collection.find({}).toArray();
    console.log(data);
    res.send(data);
});






//POST request

app.post('/register', (req, res) => {
    const data = req.body;

    //coming data


    console.log(data);
    Collection.insertOne(data)
        .then(() => {
            res.send('Data inserted successfully');
        })
        .catch((error) => {
            console.error('Error inserting data: ', error);
            res.send('An error occurred');
        });
});




app.post('/signin', async (req, res) => {

    const data = req.body;

    const old = await Collection.find({}).toArray();
    console.log(data);
    const user = old.find(user => user.username === data.name && user.password === data.password);

    if (user) {
        const code = process.env.SECRET_KEY;

        const token = jwt.sign({
            data,
        }, code, {
            expiresIn: '3d'
        })

        // jwt.verify(token, code, (err, decoded) => {
        //     if(err){
        //         console.log(err)
        //     }
        //     console.log(decoded)
        // })

        // const decoded = jwt.decode(token);
        console.log(token)
        // console.log(decoded)

        res.cookie("token", token, {
            httpOnly: true,  // Prevents JS access
            secure: true,    // Use HTTPS in production
            sameSite: "lax",
            maxAge: 60 * 60 * 1000, // 1 hour
        });




        res.send('User exists');
    } else {
        res.send('User does not exist');
    }




});



//EXAMPLE TAKING AN PROTECTED ROUTE
app.get("/protected", (req, res) => {
    console.log(req.cookies)
    const token = req.cookies.token;
    if (!token) return res.status(401).send("Access denied");

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        res.json({ message: "Authenticated", user: decoded });
    } catch (err) {
        res.status(403).send("Invalid token");
    }
});

//POST REQUEST TO LOGOUT

app.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,  // Set `true` in production (HTTPS)
        sameSite: "none",
    });
    res.send({ message: "Logged out successfully!" });
});


app.get('/cart', verifytoken, (req, res) => {
    res.json({ message: `Axcess Granted To the Cart`, user: req.user })
})





app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
