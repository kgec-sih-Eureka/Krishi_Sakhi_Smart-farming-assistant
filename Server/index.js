import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import methodOverride from "method-override";

import dbConnect from "./DB/DB.js";
import Farmer from "./Model/farmer.js";
import { nanoid } from "nanoid";

dotenv.config();
dbConnect();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// View engine setup (if you need EJS pages)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use("/uploads", express.static("uploads"));

app.use(
    session({
        secret: "your-secret-key",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
        },
    })
);

app.use(
    cors({
        origin: "http://localhost:5173", // React app
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

// Routes
app.post("/api/login", async (req, res) => {
    try {
        const { phone, password } = req.body;
        const farmer = await Farmer.findOne({ phone, password });

        if (!farmer) {
            return res.status(401).json({ error: "Invalid phone or password" });
        }

        req.session.userId = farmer._id; // save to session
        res.json({ message: "Login successful", id: farmer._id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

app.post("/api/signup", async (req, res) => {
    try {
        const { name, phone, password, address } = req.body;
        const existingFarmer = await Farmer.findOne({ phone });
        if (existingFarmer) {
            return res.status(400).json({ error: "Farmer already exists" });
        }
        if (!name || !phone || !password || !address) {
            return res.status(400).json({ error: "All fields are required" });
        }   
        const farmer = new Farmer({
            name,
            phone,
            location: address, // mapping address → location
            password,
            
        });

        const saved = await farmer.save();
        res.json({ message: "Signup successful!", id: saved._id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

app.get("/", (req, res) => {
    res.send("Hello World");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
