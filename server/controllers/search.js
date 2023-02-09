import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUsers = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(403).json("User not logged in");

  jwt.verify(token, "secretKey", (err, data) => {
    if (err) return res.status(401).json("Request Denied!");

    const { ltr } = req.query;
    // console.log(ltr);
    const q = "SELECT `id`, `name`, `profilePic` FROM users";

    const search = (data) => {
      return data.filter((item) => item["name"].toLowerCase().includes(ltr));
    };

    db.query(q, (err, data) => {
      if (err) return res.json(err);
      return res.json(search(data));
    });
  });
};
