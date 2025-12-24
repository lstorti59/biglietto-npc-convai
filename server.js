import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// --- utilità per ES Modules ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- serve i file statici dalla cartella public ---
app.use(express.static(path.join(__dirname, "public")));

// --- endpoint di test ---
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

// --- TESTO CHE L'NPC DEVE LEGGERE ---
app.get("/npc-text", (req, res) => {
  const text = `
Questo è un saluto di gratitudine.
Non per un ruolo soltanto,
ma per la presenza, la responsabilità
e il segno lasciato nel tempo.

Buon Natale.
  `;

  res.json({ text });
});

// --- fallback: mostra sempre la card ---
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// --- avvio server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server avviato sulla porta", PORT);
});
