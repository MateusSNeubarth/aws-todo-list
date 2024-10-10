import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
dotenv.config();

const app = express();

app.use(express.json());

app.use("/test", (req, res) => {
  res.json("Hello World");
});
app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
  console.log(`Server ready at: http://localhost:${PORT}`);
});
