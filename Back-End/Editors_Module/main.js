import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Editors Module ✍️📖");
});


app.listen(2025, () => {
  console.log("Run Editors Module ✍️ 📖: http://localhost:2025");
});