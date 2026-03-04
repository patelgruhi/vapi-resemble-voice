import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/voice", async (req, res) => {
  try {
    const text = req.body.text;

    const response = await fetch(
      "https://app.resemble.ai/api/v2/projects/fb5569a1/clips",
      {
        method: "POST",
        headers: {
          "Authorization": "Token hYxBBro0wuAVJxXOrsApDQtt",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          voice_uuid: "ea233ffa",
          body: text
        })
      }
    );

    const data = await response.json();

    console.log("Resemble response:", data);

    const audioUrl = data?.item?.audio_src || data?.audio_src;

    if (!audioUrl) {
      return res.status(500).json({ error: "No audio returned from Resemble" });
    }

    res.json({
      audio: audioUrl
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Voice generation failed" });
  }
});

app.listen(3000, () => {
  console.log("Voice server running");
});
