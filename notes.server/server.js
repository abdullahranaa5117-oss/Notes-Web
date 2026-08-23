const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./common/db");

dotenv.config();

const NotesRoutes = require('./Routes/Notes.routes');

const UserRoutes = require('./Routes/User.routes');


const app = express();
app.use(cors({
  origin: "https://notes-web-theta.vercel.app",
  credentials: true,
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

  

app.use("/api/v1/notes", NotesRoutes);

app.use("/api/v1/user", UserRoutes);

app.get("/", (req, res) => {
  res.send("Notes Backend Running!");
});

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 4000;

app.listen(port, host, async () => {
  await connectDB();
  console.log(`Server running at http://${host}:${port}`);
});
