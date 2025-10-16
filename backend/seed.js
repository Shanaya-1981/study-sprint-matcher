import { connectDB, getDB } from "./db.js";
import dotenv from "dotenv";

dotenv.config();

const subjects = [
  "Math",
  "Physics",
  "Chemistry",
  "Biology",
  "Web Dev",
  "AI",
  "Calculus",
  "Literature",
  "History",
  "Economics",
];
const usernames = [
  "Shanya",
  "Anonymous",
  "TestUser1",
  "TestUser2",
  "StudyBuddy",
];
const locations = ["online", "offline"];
const offlineLocations = [
  "Library Room 101",
  "Study Hall A",
  "Cafe Corner",
  "Building 2 - Room 304",
];

async function seedSprints() {
  await connectDB(process.env.MONGO_URL);
  const db = getDB();

  const sprints = [];
  for (let i = 0; i < 1000; i++) {
    const location = locations[Math.floor(Math.random() * locations.length)];
    sprints.push({
      username: usernames[Math.floor(Math.random() * usernames.length)],
      subject: subjects[Math.floor(Math.random() * subjects.length)],
      location,
      locationDetails:
        location === "offline"
          ? offlineLocations[
              Math.floor(Math.random() * offlineLocations.length)
            ]
          : "",
      duration: [15, 25, 30, 45, 60][Math.floor(Math.random() * 5)],
      participants: Math.floor(Math.random() * 10) + 1,
      createdAt: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000,
      ), // Random date in last 30 days
    });
  }

  await db.collection("sprints").insertMany(sprints);
  console.log("✅ 1,000 sprints added!");
  process.exit(0);
}

seedSprints();
