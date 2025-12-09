import { InferenceClient } from "@huggingface/inference";

const hf = new InferenceClient(process.env.HF_TOKEN || process.env.HUGGINGFACE_API_KEY);

const emperorAI = async (prompt) => {
    try {
        const response = await hf.chatCompletion({
            model: "meta‑llama/Llama-2-7b-chat-hf",  // or another HF chat-capable model you choose
            messages: [
                { role: "system", content: "You are KX-Ω, the Emperor's AI assistant. Only respond to Emperor's requests. Provide safe, production-ready JavaScript/Node.js/React code or suggestions when asked, but never execute automatically." },
                { role: "user", content: prompt }
            ],
            max_tokens: 512,
            temperature: 0.2
        });

        // Depending on the model and response format — adjust accordingly:
        const reply = response.choices?.[0]?.message?.content;
        return reply || "KX-Ω could not generate a response.";
    } catch (err) {
        console.error("Emperor AI (HuggingFace) Error:", err);
        return "KX-Ω encountered an error generating a response.";
    }
};

export default emperorAI;
