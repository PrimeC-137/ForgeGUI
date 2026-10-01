const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("ForgeGUI AI está funcionando!");
});

app.post("/generate", (req, res) => {

    const prompt = req.body.prompt;

    console.log("Pedido recebido:", prompt);

    res.json({
        objects: [
            {
                type: "part",
                name: "Teste",
                size: [10, 2, 10],
                position: [0, 1, 0],
                color: [0, 255, 0],
                material: "Neon"
            }
        ]
    });

});

app.listen(3000, () => {
    console.log("ForgeGUI AI iniciado!");
});
