import express from "express";
import { getDB } from "../db.js";

const router = express.Router();

// GET user progress
router.get("/:username/progress", async (req, res) => {
  const db = getDB();
  const sprints = await db
    .collection("sprints")
    .find({ username: req.params.username })
    .toArray();

  const totalHours = sprints.reduce((sum, s) => sum + s.duration, 0) / 60;
  const totalSprints = sprints.length;

  res.json({
    totalHours: Math.round(totalHours),
    totalSprints,
    streak: 5, // Calculate later
    pastSprints: sprints,
  });
});

export default router;
