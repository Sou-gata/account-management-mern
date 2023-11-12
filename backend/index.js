const express = require("express");
require("dotenv").config();
require("./config/dbConnect")();
const cors = require("cors");
const path = require("path");

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}\n`);
});
app.use(express.static(path.resolve(__dirname, "ui")));
app.use("/api/user", require("./routers/userRouter"));
app.use("/api/attandance", require("./routers/attandanceRouter"));
app.use("/api/fuel", require("./routers/fuelRouter"));
app.use("/api/pickup", require("./routers/pickupRouter"));
app.get("*", (_, res) => {
    res.sendFile(path.resolve(__dirname, "ui", "index.html"));
});
// require("child_process").exec(`start http://localhost:${port}/`);
