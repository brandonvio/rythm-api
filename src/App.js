const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const rabbitPrice = require("./_rabbitPrice");

const port = process.env.PORT || 4000;
const routes = require("./routes/index");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", routes);

const server = http.createServer(app);
io = socketio.listen(server);

io.on("connection", socket => {
    console.log("New client connected");
});

rabbitPrice.consume(io);

server.listen(port, () => console.log(`Listening on port ${port}`));
