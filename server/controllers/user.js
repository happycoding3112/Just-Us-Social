import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const userId = req.params.userId;

  const q = "SELECT * FROM users WHERE id = (?)";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...info } = data[0];
    return res.status(200).json(info);
  });
};

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("User not logged in!");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Request Denied");

    const q =
      "UPDATE users SET `name` = (?), `profilePic` = (?), `coverpic` = (?), `city` = (?), `website` = (?) WHERE (`id` = (?)) ";

    db.query(
      q,
      [
        req.body.name,
        req.body.profilePic,
        req.body.coverPic,
        req.body.city,
        req.body.website,
        userInfo.id,
      ],
      (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows > 0)
          return res.status(200).json("Updated user sucessfully!");
        return res.status(403).json("You can update only your Information!");
      }
    );
  });
};
