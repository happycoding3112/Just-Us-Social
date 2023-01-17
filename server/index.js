import express from "express";
const app = express();
import authRoutes from "./routes/auth.js";
import likeRoutes from "./routes/likes.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import cookieParser from "cookie-parser";
import cors from "cors";

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

app.listen(8800, () => {
  console.log("SERVER is working");
});
