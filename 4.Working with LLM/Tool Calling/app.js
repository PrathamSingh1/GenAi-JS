import dotenv from "dotenv";
dotenv.config();
import { tavily } from "@tavily/core";

// import OpenAI from "openai";
import Groq from "groq-sdk";

// const client = new OpenAI({
//   apiKey: process.env.GROQ_API_KEY,
// });

const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });
const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function main() {
  const response = await client.chat.completions.create({
    temperature: 0,
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `You are a smart personal assistant, who answers the asked questions.
        You have access to following tools:
        1. webSearch({query}: {query: string}) // Search the latest information and realtime data on the internet.`,
      },
      {
        role: "user",
        content: "When was iphon 16 launched?",
        // What is the current weather of Noida?
      },
    ],
    tools: [
      {
        type: "function",
        function: {
          name: "webSearch",
          description: "Search the latest information and realtime data on the internet",
          parameters: {
            // JSON Schema object
            type: "object",
            properties: {
              query: {
                type: "string",
                description: "The search query to perform search on.",
              },
            },
            required: ["query"],
          },
        },
      },
    ],
    tool_choice: "auto",
  });

  const toolCalls = response.choices[0].message.tool_calls;

  if (!toolCalls) {
    console.log(`Assistant: ${response.choices[0].message.content}`);
    return;
  }

  for (const tool of toolCalls) {
    console.log("tool: ", tool);
    const functionName = tool.function.name;
    const functionParams = tool.function.arguments;

    if (functionName === "webSearch") {
      const toolResult = await webSearch(JSON.parse(functionParams));
      console.log("Tool result: ", toolResult);
    }
  }

  // console.log(JSON.stringify(response.choices[0].message, null, 2));
}

main();

async function webSearch({ query }) {
  // Here api call of tavily
  console.log("Calling webSearch...");

  const response = await tvly.search(query);
  return "Iphone was launched in 20 september 2024.";
}
