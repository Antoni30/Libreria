import express from "express";
import cors from "cors";
import { BASE_PATH, publisherRouter } from "./routes/publishers.routes.js";

const PORT = 2025;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Publishers Module ✍️📖");
});

app.use(publisherRouter);

app.listen(PORT, () => {
  console.log(
    `Run Publishers Module ✍️ 📖: http://localhost:${PORT}${BASE_PATH}`
  );
});
