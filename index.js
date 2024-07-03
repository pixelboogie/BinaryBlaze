import { openai } from './config.js';

// Upload a file with an "assistants" purpose
// const file = await openai.files.create({
//   file: await fetch("movies.txt"),
//   purpose: "assistants",
// });
// console.log(file);

const asstID = "asst_wUu8fCNZ8zvS2UB5OUP4M2ac";

// Create Movie expert assistant
async function createAssistant(){
    const myAssistant = await openai.beta.assistants.create({
        instructions: "You are great at recommending movies. When asked a question, use the information in the provided file to form a friendly response. If you cannot find the answer in the file, do your best to infer what the answer should be.",
        name: "Movie Buff",
        tools: [{type: "file_search"}],
        model: "gpt-4-1106-preview",
        // file_ids: ["file-YwSkIxszU12VEtI6XWH47T4E"]
    });
      console.log(myAssistant);
}

createAssistant();