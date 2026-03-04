import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/voice", async (req, res) => {
  const text = req.body.text;

  const response = await fetch(
    "https://app.resemble.ai/api/v2/projects/fb5569a1/clips",
    {
      method: "POST",
      headers: {
        "Authorization": "Token BMxfsgQ5HFWzKShaYF9CmAtt",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        voice_uuid: "ea233ffa",
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
