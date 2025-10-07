import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

// Allow your GitHub Pages domain
app.use(cors({
  origin: "https://ricchkrixx.github.io",
}));

app.use(express.json());

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }]
      })
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("✅ AIVA backend is running!");
});

app.listen(3000, () => console.log("Server running on port 3000"));