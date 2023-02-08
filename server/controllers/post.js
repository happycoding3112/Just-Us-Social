import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res) => {
  const userId = req.query.userId;
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("User not logged in");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Request Denied");

    const q =
      userId !== "undefined"
        ? "SELECT p.*, u.id as userId, name, profilePic FROM posts as p JOIN users as u ON (u.id = p.userId) WHERE p.userId = (?) ORDER BY p.createdAt DESC"
        : "SELECT p.*, u.id as userId, name, profilePic FROM posts as p JOIN users as u ON (u.id = p.userId) LEFT JOIN relationships as r ON (p.userId = r.followedUserId) WHERE r.followerUserId = (?) OR p.userId = (?) ORDER BY p.createdAt DESC";

    const values =
      userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("User not logged in");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Request Denied");

    const q =
      "INSERT INTO posts (`desc`, `img`, `userId`, `createdAt`) VALUES (?)";

    const values = [
      req.body.desc,
      req.body.img,
      userInfo.id,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post created successfully!");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("User not logged in");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Request Denied");

    const q = "DELETE FROM posts WHERE `id` = (?) AND `userId` = (?)";

    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0)
        return res.status(200).json("Post deleted successfully!");
      return res.status(403).json("You can delete only your posts!");
    });
  });
};
