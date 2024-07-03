import { openai } from './config.js';

const form = document.querySelector('form');
const input = document.querySelector('input');
const reply = document.querySelector('.reply');

const asstID = "asst_wUu8fCNZ8zvS2UB5OUP4M2ac";
const threadID = "thread_8sc0gOJzhxWG2b5pPRSwGuLt";

form.addEventListener('submit', function(e) {
  e.preventDefault();
  main();
  input.value = '';
});

// Bring it all together
async function main() {
  reply.innerHTML = 'Thinking...';
    await createMessage(input.value);
    
    // create a run
    const run = await runThread();
    console.log(run);
}

/* -- Assistants API Functions -- */

// Create a message
async function createMessage(question) {
  const threadMessages = await openai.beta.threads.messages.create(
    threadID,
    { role: "user", content: question }
  );
}

// Run the assistant's thread
async function runThread(){
    const run = await openai.beta.threads.runs.create(
    threadID, { assistant_id: asstID }
  );
  // console.log(run);
  return run;
}

// List thread messages
async function listMessages() {
  return await openai.beta.threads.messages.list(threadID);
  //console.log(threadMessages.data);
}

// Get the current run
async function retrieveRun(thread, run) {
  return await openai.beta.threads.runs.retrieve(thread, run)
  // run_vywQGepBxDDznMYEsmvrWGE4
}
  
// console.log("Run status: " + currentRun.status);


// runThread()

