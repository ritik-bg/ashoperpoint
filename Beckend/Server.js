import express from 'express';
import { MongoClient } from 'mongodb';
import { urlencoded } from 'express';
import Cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import verifytoken from './Authmiddleware.js'
import { connectDB } from './db/connection.js';
import authMiddleware from './Authmiddleware.js';
import Productrouter from './Routes/ProductsRoute.js';

dotenv.config();
const app = express();
const port = 3000;
app.use(Cors({
    origin: "http://localhost:5174",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const dbName = 'ShopperPoint';
const client = new MongoClient(process.env.MONGO_URI);
client.connect().then(() => { console.log('Connected successfully to the database') });
const db = await connectDB(dbName);
const UserCollection = db.collection('users');

app.use("/log/cart", Productrouter);
app.use("/log/products", authMiddleware, Productrouter);

app.get('/', async (req, res) => {
    res.send("Server is resdy to Go!");
});

app.get('/userlist', async (req, res) => {

    const data = await Collection.find({}).toArray();
    // console.log(data);
    res.send(data);
});

app.post('/register', async (req, res) => {
    const data = req.body;
    const user = await UserCollection.findOne(data);

    if (user) {
        return res.status(404).json({ message: "User Alrady Exists" });
    }

    UserCollection.insertOne(data)
        .then(() => {
            res.status(200).json({ message: 'Data inserted successfully' });
        })
        .catch((error) => {
            console.error('Error inserting data:', error);
            res.status(500).json({ error: 'An error occurred during data insertion' });
        });
});

app.post('/signin', async (req, res) => {

    const data = req.body;
    const old = await UserCollection.find()?.toArray();
    const user = old.find(user => user.username === data.name && user.password === data.password);

    if (user) {
        const code = process.env.SECRET_KEY;
        const token = jwt.sign({ data, }, code, { expiresIn: '3d' })
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 3 * 24 * 60 * 60 * 1000,
        });

        res.cookie("username", user.name, {
            httpOnly: false,
            secure: true,
            sameSite: "lax",
            maxAge: 3 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                username: user.name,
                token,
            },
        });
    } else {
        res.send('Invalid credentials or User');
    }
});

app.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,  // Set `true` in production (HTTPS)
        sameSite: "none",
    });
    res.send({ message: "Logged out successfully!" });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
