import express from "express";
import { getDB } from "../db.js";

const router = express.Router();

// GET all sprints
router.get("/", async (req, res) => {
  const db = getDB();
  const sprints = await db.collection("sprints").find().toArray();
  res.json(sprints);
});

// POST create new sprint
router.post("/", async (req, res) => {
  const db = getDB();
  const newSprint = req.body;
  const result = await db.collection("sprints").insertOne(newSprint);
  res.json({ success: true, id: result.insertedId });
});

// POST join sprint
router.post("/:id/join", async (req, res) => {
  const db = getDB();
  const { ObjectId } = await import("mongodb");

  await db
    .collection("sprints")
    .updateOne(
      { _id: new ObjectId(req.params.id) },
      { $inc: { participants: 1 } },
    );

  res.json({ success: true });
});
// DELETE sprint
router.delete("/:id", async (req, res) => {
  const db = getDB();
  const { ObjectId } = await import("mongodb");

  await db
    .collection("sprints")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.json({ success: true });
});
export default router;
