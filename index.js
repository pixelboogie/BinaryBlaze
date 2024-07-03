import { openai } from './config.js';

const asstID = "asst_wUu8fCNZ8zvS2UB5OUP4M2ac";
const threadID = "thread_8sc0gOJzhxWG2b5pPRSwGuLt";

// Get the current run
const currentRun = await openai.beta.threads.runs.retrieve(
  threadID,
  "run_vywQGepBxDDznMYEsmvrWGE4"
);
console.log("Run status: " + currentRun.status);

// Run the assistant's thread
async function runThread(){
    const run = await openai.beta.threads.runs.create(
    threadID,
    { assistant_id: asstID }
  );
  console.log(run);
}
// runThread()

// Create a message for the thread
async function createMessage() {
  const threadMessages = await openai.beta.threads.messages.create(
    threadID,
    { role: "user", content: "Can you recommend a comedy?" }
  );
  console.log(threadMessages);
}