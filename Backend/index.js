const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const route = require("./Routes/userRoute");
const { createServer } = require("http");
const setupWebSocket = require("./Websocket/backSocket");
require('dotenv').config()

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST'],
    credentials: true,
}));
app.use(route);

const server = createServer(app);

// Set up WebSocket server
setupWebSocket(server);

try {
    mongoose.connect(process.env.MONGO_DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Database is Connected"))
    .catch(err => console.log("Error", err));
} catch (err) {
    console.log(err);
}

server.listen(9002, () => {
    console.log(`Server is running on port 9002`);
});
