import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// --- utilità per ES modules ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- middleware ---
app.use(express.json());

// --- servi i file statici dalla cartella public ---
app.use(express.static(path.join(__dirname, "public")));

// --- endpoint di salute (Render health check) ---
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

// --- endpoint NPC Convai (testuale, per ora) ---
app.post("/npc", async (req, res) => {
  try {
    console.log("NPC endpoint chiamato");

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Messaggio mancante" });
    }

    // 🔹 RISPOSTA TEMPORANEA (serve solo a verificare il flusso)
    // Qui Convai verrà collegato dopo
    const npcReply = "Ciao. Questo è un messaggio di prova dell’NPC.";

    res.json({
      reply: npcReply
    });

  } catch (error) {
    console.error("Errore NPC:", error);
    res.status(500).json({ error: "Errore server NPC" });
  }
});

// --- fallback: serve sempre index.html ---
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// --- porta Render ---
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server avviato sulla porta", PORT);
});

