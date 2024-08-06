const { AzureOpenAI } = require("openai");

// You will need to set these environment variables or edit the following values
const endpoint = "https://trainingllm.openai.azure.com/" // END POINT
const apiKey = "9d3858a3f9924799a8501297597f3e53" // KEY 1
const apiVersion = "2024-04-01-preview" // Choose version you want
const deployment = "TrainingLLM" // The deployment name


const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment })

module.exports = client