const express = require('express');
const db = require('./db');
const Ramen = require('./models/ramenModel');
const User = require('./models/userModel');
const ramenRouter = require('./routes/ramensRoute');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Server started on port 8080");
});

app.use("/api/ramens", ramenRouter);
  


app.post("/api/users/register", (req, res) => {
    const {name, email, password} = req.body;
    const newUser = new User({name, email, password});
    try {
        newUser.save();
        res.send("User registered");
    } catch (err) {
        return res.status(400).json({error: err});
    }
    
});

app.post("/api/users/login",async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.find({email, password});
        if (user.length > 0) {
            const currentUser = {
                name: user[0].name,
                email: user[0].email,
                isAdmin: user[0].isAdmin,
                _id: user[0]._id
            }
            res.send(currentUser);
        } else {
            return res.status(400).json({message: "User login failed"});
        }
    }
    catch (error) {
        return res.status(400).json({error});     
    }
});

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});