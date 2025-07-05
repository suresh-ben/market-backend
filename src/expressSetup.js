const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require('cors');

const authRoutes = require("./routes/authRoutes");
const marketRoutes = require("./routes/marketRoutes");
const userManagementRoutes = require("./routes/userManagement");

function setupExpressApp(app) {

    // Middleware to handle 
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(cors({
        origin: process.env.FRONTEND,
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        credentials: true,
    }));
    app.use((req, res, next) => {
        //for cookies
        res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND);
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, *');
        next();
    });
    
    
    // req routes
    app.use("/api/auth", authRoutes);
    app.use("/api/market", marketRoutes);
    app.use("/api/user-management", userManagementRoutes);

    app.get("/", (req, res) => {
        res.send("Welcome to the Express.js Tutorial");
    });

    app.listen(3000, () => {
        console.log("Server is running on http://localhost:3000");
    });
}

module.exports = {
    setupExpressApp,
};
