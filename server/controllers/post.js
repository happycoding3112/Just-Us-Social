import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";
import { format } from "mysql";

export const getPosts = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("User not logged in");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Request Denied");

    const q =
      "SELECT p.*, u.id as userId, name, profilePic FROM posts as p JOIN users as u ON (p.userId = u.id) LEFT JOIN relationships as r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ? ORDER BY p.createdAt DESC";

    db.query(q, [userInfo.id, userInfo.id], (err, data) => {
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
