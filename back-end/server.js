import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import mongoDBConnector from "./database/mongoDBConnector.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

app.get("/health-check", (req, res) => {
  // root route http://localhost:3000/
  res.send("Hello World test!");
});

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes);

app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);


app.listen(PORT, () => {
  mongoDBConnector.connect();
  console.log(`Server running on PORT ${PORT}`);
});
