import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());

// path utils (ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// file statici
app.use(express.static(path.join(__dirname, "public")));

// ===== CONFIG CONVAI =====
const CONVAI_API_KEY = process.env.CONVAI_API_KEY;
const CHARACTER_ID = "159ede3c-e0a9-11f0-a2da-42010a7be027";

// ===== TEST SERVER =====
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

// ===== ENDPOINT NPC =====
app.post("/npc", async (req, res) => {
  try {
    const prompt = `
Saluta in modo gentile e caloroso.
Poi leggi lentamente e con tono emozionato il seguente messaggio:

"Questo è un saluto di gratitudine.
Non per un ruolo soltanto,
ma per la presenza, la responsabilità
e il segno lasciato nel tempo.

Buon Natale."
`;

    const response = await fetch(
      "https://api.convai.com/character/send-text",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "CONVAI-API-KEY": CONVAI_API_KEY
        },
        body: JSON.stringify({
          characterId: CHARACTER_ID,
          text: prompt,
          voiceResponse: true
        })
      }
    );

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore NPC" });
  }
});

// fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// porta Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server avviato sulla porta", PORT);
});

