import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt/bcrypt.js";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hash,
      },
    });
    res.status(200).send("User has been created");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const login = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (!user)
      return res.status(404).json({ message: "Wrong email or password" });

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Wrong email or password" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT
    );

    const { password, ...otherDetails } = user;
    res.status(200).json({ details: { ...otherDetails }, token: token });
  } catch (err) {
    res.status(500).json(err);
  }
};
