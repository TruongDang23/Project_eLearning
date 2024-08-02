const { AzureOpenAI } = require("openai");

// You will need to set these environment variables or edit the following values
const endpoint = "https://trainingllm.openai.azure.com/";
const apiKey = "9d3858a3f9924799a8501297597f3e53";
const apiVersion = "2024-04-01-preview";
const deployment = "TrainingLLM"; //The deployment name for your completions API model. The instruct model is the only new model that supports the legacy API.

async function main() {
  console.log("== Get chat sample ==");

  const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment });

  const result = await client.chat.completions.create({
    messages: [
      { role: "user", content: "Who are you?" },
      { role: "assistant", content: "I am AI chatbox developed by OpenAI" },
      { role: "user", content: "right?" }
    ],
    model: ""
  });

  for (const choice of result.choices) {
    console.log(choice.message.content);
  }
}

main().catch((err) => {
  console.error("Error occurred:", err);
});
