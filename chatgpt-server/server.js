const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');  // CORSモジュールをインポート

dotenv.config();

const express = require('express');
const app = express();

const PORT = 3000;

const apiKey = process.env.OPENAI_API_KEY;

// CORSを有効化
app.use(cors());

app.use(express.json());

app.post('/chat', async (req, res) => {
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: "Hello, ChatGPT!" }]
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`  // 修正: "Bearer " を追加
            }
        });
        res.json(response.data);
    } catch (error) {
        if (error.response) {
            // 429エラーのハンドリング
            if (error.response.status === 429) {
                return res.status(429).send("Too many requests. Please try again later.");
            }
            return res.status(error.response.status).json(error.response.data);
        }
        res.status(500).send("Internal Server Error");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
