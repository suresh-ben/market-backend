const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const { setupExpressApp } = require("./src/expressSetup");
const { connectToDB } = require("./src/mongoSetup");


function startServer() {
    const app = express();

    setupExpressApp(app);
    connectToDB();
}

startServer();