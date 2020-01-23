const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const app = express();

connectDB();

// const allowedOrigins = ["http://localhost:4000"];
app.use(cors({ origin: 'http://localhost:4000', credentials: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
})

app.use(express.json({ extended: false }));
app.use(cookieParser());

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/budget", require("./routes/budget"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server connected on port: ${PORT}`));
