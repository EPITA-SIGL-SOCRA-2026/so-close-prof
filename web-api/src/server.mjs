import express from "express";
import {auth} from "express-oauth2-jwt-bearer";
import cors from "cors";
import tasks from "../../data/tasks.json" with { type: "json" };

const app = express();
const port = 3000;

const jwtCheck = auth({
  audience: 'https://api.so-close.groupe30.socra-sigl.fr',
  issuerBaseURL: 'https://so-close-groupe-30.eu.auth0.com/',
  tokenSigningAlg: 'RS256'
});

app.use(cors()); // Enable CORS for all routes
app.use(jwtCheck); // Protect all routes with JWT authentication

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
