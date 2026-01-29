import express, { Application } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from 'cors';
import { categoryRouter } from "./modules/category/category.router";
import { tutorProfileRouter } from "./modules/tutorProfile/tutor.router";

const app: Application = express();

app.use((req, res, next) => {
  console.log("Origin:", req.headers.origin);
  next();
});



app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true,
  })

);

app.use(express.json());

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/api", categoryRouter)
app.use("/profile", tutorProfileRouter)

app.get("/", (req, res) => {
    res.send("SkillBridge API is running 🚀");
});

export default app;