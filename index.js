import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { OpenAI } from 'openai';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,  
    timeout: 1000,  
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/chat", async (req, res) => {
    const { prompt } = req.body;
    console.log(prompt);

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",  
            messages: [{ role: "user", content: prompt }],
            max_tokens: 512,
            temperature: 0,
        });

        console.log(completion.choices[0].message.content);
        res.send(completion.choices[0].message.content);
    } catch (error) {
        console.error(error);  
        res.status(500).send({ error: error.message || "Error generating response" });
    }
});

app.listen(process.env.PORT, () => {
    console.log("Server Listening On Port");
});

