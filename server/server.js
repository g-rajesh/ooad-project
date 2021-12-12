const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/user");

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.use('/user', userRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.status || 500;
  const message = error.message;
  const data = error.data;
  return res.status(status).json({ message, data });
});

const mongoAtlasUri = "mongodb+srv://admin:admin@1234@cluster0.6gtpz.mongodb.net/ResumeBuilder?retryWrites=true&w=majority"
try {
     mongoose.connect(
      mongoAtlasUri,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => {
        console.log(" Mongoose is connected");
        app.listen(PORT, () => {
            console.log("Server listening at PORT 8080");
        })
      }
    );

} catch (e) {
    console.log("could not connect");
}