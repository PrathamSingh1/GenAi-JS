import dotenv from "dotenv";
dotenv.config();

// import OpenAI from "openai";
import Groq from "groq-sdk";

// const client = new OpenAI({
//   apiKey: process.env.GROQ_API_KEY,
// });

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function main() {
  const response = await client.chat.completions.create({
    temperature: 1,
    // top_p: 0.1,
    // stop: "hacking",
    // max_completion_tokens: 1000,
    // frequency_penalty: 1,
    // presence_penalty: 1,
    // response_format: {type: "json_object"},
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: "You are Jarvis, a smart personal assistant. Be always polite.",
      },
      {
        role: "user",
        content: "Who are you?",
      },
    ],
  });

  console.log(response.choices[0].message.content);
}

main();
