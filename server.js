const express = require("express");
const OpenAI = require("openai");

const app = express();

app.use(express.json());

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
    res.send("ForgeGUI AI está funcionando!");
});

app.post("/generate", async (req, res) => {
    try {
        const prompt = req.body.prompt;

        if (!prompt) {
            return res.status(400).json({
                error: "Nenhum prompt foi enviado."
            });
        }

        console.log("Pedido recebido:", prompt);

        const response = await client.responses.create({
            model: process.env.OPENAI_MODEL || "SEU_MODELO_AQUI",
            input: `Transforme este pedido em uma descrição estruturada de mapa Roblox:

${prompt}

Retorne somente JSON válido.`
        });

        res.json({
            result: response.output_text
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Erro ao falar com a IA."
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`ForgeGUI AI iniciado na porta ${PORT}`);
});
