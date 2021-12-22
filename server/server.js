const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");

const userRoutes = require("./routes/user");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message;
  const data = error.error;
  return res.status(status).json({ message, data });
});

const uri = "mongodb+srv://Admin:admin123@cluster0.ulgdx.mongodb.net/ResumeBuilder?retryWrites=true&w=majority";

mongoose.connect(uri, () => {
  console.log("Mongoose connected");

  app.listen(PORT, () => {
    console.log(`Server listening at PORT ${PORT}`);
  });
});

