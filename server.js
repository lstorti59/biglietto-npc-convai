import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// per leggere JSON dal browser
app.use(express.json());

// utilità per ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// file statici (HTML, immagini, audio)
app.use(express.static(path.join(__dirname, "public")));

// ==============================
// ROUTE DI TEST NPC (FAKE)
// ==============================
app.post("/npc/speak", (req, res) => {
  console.log("NPC endpoint chiamato");

  res.json({
    text: "Ciao. Questo è un messaggio di prova dell’NPC.",
  });
});

// ==============================
// health check
// ==============================
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

// fallback → index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// porta Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server avviato sulla porta", PORT);
});
