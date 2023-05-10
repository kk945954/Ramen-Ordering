const express = require('express');
const db = require('./db');
const Ramen = require('./models/ramenModel');
const User = require('./models/userModel');
const ramenRouter = require('./routes/ramensRoute');
const userRouter = require('./routes/usersRoute');

const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Server started on port 8080");
});

app.use("/api/ramens", ramenRouter);
app.use("/api/users", userRouter);


const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});