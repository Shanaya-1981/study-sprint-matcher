import express from "express";
import { getDB } from "../db.js";

const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {
  const db = getDB();
  const { name, email, password } = req.body;

  const existing = await db.collection("users").findOne({ email });
  if (existing) {
    return res.status(400).json({ error: "User already exists" });
  }

  await db.collection("users").insertOne({ name, email, password });
  res.json({ success: true, name });
});

// LOGIN
router.post("/login", async (req, res) => {
  const db = getDB();
  const { email, password } = req.body;

  const user = await db.collection("users").findOne({ email, password });
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  res.json({ success: true, name: user.name });
});

export default router;
