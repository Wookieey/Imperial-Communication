import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const emperorAI = async (prompt) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: "You are KX-Ω, the Emperor's AI assistant. Only respond to the Emperor's requests for code or website improvements. Provide safe, detailed, production-ready JavaScript/Node.js/Vue/React/Express/MongoDB snippets when asked. Never execute code automatically."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.2,
            max_tokens: 1500
        });

        return response.choices[0].message.content;
    } catch (err) {
        console.error("Emperor AI Error:", err);
        return "KX-Ω could not generate a response.";
    }
};

export default emperorAI;
