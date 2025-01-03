import express from "express";
import cors from "cors";
import RouteRoles from "./routes/user_roles.routes.js";
import RouteUser from "./routes/users.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Users Module 👤");
});

app.use(RouteRoles);
app.use(RouteUser);

app.listen(2027, () => {
  console.log("Run Users Module 👤: http://localhost:2027");
});