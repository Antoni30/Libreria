import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Users Module 👤");
});


app.listen(2027, () => {
  console.log("Run Users Module 👤: http://localhost:2027");
});