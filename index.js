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
   // console.log(run);
   
     // Retrieve the current run
  let currentRun = await retrieveRun(threadID, run.id);
  
    // Keep Run status up to date
  // Poll for updates and check if run status is completed    
  while (currentRun.status !== 'completed') {
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log(currentRun.status);
    currentRun = await retrieveRun(threadID, run.id);
  }
  
  
  // Get messages from the thread
  const { data } = await listMessages();

  // Display the last message for the current run
  reply.innerHTML = data[0].content[0].text.value;
  
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
    threadID, 
    { 
        assistant_id: asstID,
         instructions: `Please do not provide annotations in your reply. Only reply about movies in the provided file. If questions are not related to movies, respond with "Sorry, I don't know." Keep your answers short. ` 
    }
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

