import { db } from "../connect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already Exists!");

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q =
      "INSERT INTO users (`name`, `username`, `email`, `password`) VALUES (?) ";

    const values = [
      req.body.name,
      req.body.username,
      req.body.email,
      hashedPassword,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User created successfully!");
    });
  });
};

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User does not exist");

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassword)
      return res.status(400).json("Wrong username or password");

    const token = jwt.sign({ id: data[0].id }, "secretKey");

    const { password, ...otherData } = data[0];

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(otherData);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("user has been logged out");
};
