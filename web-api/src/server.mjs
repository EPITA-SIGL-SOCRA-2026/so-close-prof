import express from "express";
import cors from "cors";
import tasks from "../../data/tasks.json" with { type: "json" };

const app = express();
const port = 3003;

app.use(cors()); // Enable CORS for all routes

// Health check endpoint
app.get("/", (req, res) => {
  res.send("Alive and kicking!");
});

app.get("/v1/tasks", (req, res) => {
    res.json(tasks);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
