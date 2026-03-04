import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/voice", async (req, res) => {
  const text = req.body.text;

  const response = await fetch(
    "https://app.resemble.ai/api/v2/projects/YOUR_PROJECT_ID/clips",
    {
      method: "POST",
      headers: {
        "Authorization": "Token YOUR_API_KEY",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        voice_uuid: "YOUR_VOICE_ID",
        body: text
      })
    }
  );

  const data = await response.json();

  res.json({
    audio: data.item.audio_src
  });
});

app.listen(3000, () => console.log("Voice server running"));