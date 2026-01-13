import express from 'express';
import authMiddleware from '../Authmiddleware.js';
import { getDB } from '../db/connection.js';
const Productrouter = express.Router();
Productrouter.use(authMiddleware);

Productrouter.get("/list", async (req, res) => {
    try {
        const db = getDB();
        const products = await db.collection("Allproducts").find({}).toArray();
        return res.json({ data: products, status: true });
    } catch (error) {
        return res.status(500).json({ error: err.message });
    }
});

Productrouter.post("/allproduct", (req, res) => {
    res.send("Product list");
});

Productrouter.get("/:id", (req, res) => {
    res.send(`Product id: ${req.params.id}`);
});

export default Productrouter;
