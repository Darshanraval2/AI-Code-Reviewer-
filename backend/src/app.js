const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS for frontend communication
app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:3002','https://aicodereviewer1.netlify.app'], // React dev server ports
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "AI Code Review API", status: "running" });
});

app.use('/api/ai', require('./routes/ai.routes'));

module.exports = app;
