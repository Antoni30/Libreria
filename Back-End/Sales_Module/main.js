import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Sales Module 💰");
});


app.listen(2026, () => {
  console.log("Run Sales Module 💰: http://localhost:2026");
});