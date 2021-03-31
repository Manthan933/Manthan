const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const routes = require("./routes/routes");

//Import Cookies package
const cookieParser = require('cookie-parser');

const app = express();

dotenv.config();

app.use(express.json());

//Parse the cookie file using express
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", routes);

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);
