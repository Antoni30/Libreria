import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Books Module 📕");
});

app.listen(2024, () => {
  console.log("Run Books Module 📚: http://localhost:2024");
});