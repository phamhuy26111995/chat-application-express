import express from "express";
import dotenv from "dotenv";
import path from "path";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import mongoDBConnector from "./database/mongoDBConnector.js";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";


const PORT = process.env.PORT || 5000;

dotenv.config();
const __dirname = path.resolve();

app.get("/health-check", (req, res) => {
  // root route http://localhost:3000/
  res.send("Hello World test!");
});

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes);

app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});


server.listen(PORT, () => {
  mongoDBConnector.connect();
  console.log(`Server running on PORT ${PORT}`);
});
