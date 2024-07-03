import { openai } from './config.js';

const asstID = "asst_wUu8fCNZ8zvS2UB5OUP4M2ac";
const threadID = "thread_8sc0gOJzhxWG2b5pPRSwGuLt";

// Create a message for the thread
async function createMessage(){
    const threadMessages = await openai.beta.threads.messages.create(
    threadID,
    { role: "user", content: "Can you recommend a comedy?" }
  );
  console.log(threadMessages);
}
createMessage();
