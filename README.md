# BinaryBlaze

## Description
**BinaryBlaze** is a context-aware chatbot designed to offer personalized movie recommendations from your own movie database. Simply tell it, "I need a good laugh," and it might suggest, "You should definitely watch Glass Onion!" Your movie database is a text file listing movie titles and their synopses, and the chatbot leverages this database to provide accurate and dynamic movie suggestions based on user input.

The application features a user-friendly interface with a text field where you can ask any movie-related question. The assistant's API manages conversation history, organizing everything neatly into threads, making for a seamless and engaging user experience.

## Features
- **Personalized Movie Recommendations**: Offers movie suggestions tailored to your mood or preferences based on a custom database.
- **Context-Aware Chatbot**: Maintains conversation context to provide more accurate and relevant responses.
- **File-Based Movie Database**: Uses a simple text file to store movie titles and synopses, making it easy to update and manage.
- **Conversation History Management**: Automatically organizes conversation threads for a smooth interaction flow.
- **OpenAI API Integration**: Utilizes the OpenAI API for natural language processing and vector search, simplifying the retrieval of relevant movie information.

## Installation

### Prerequisites
- Python 3.7 or higher
- OpenAI API key
- A text file containing movie titles and synopses

### Steps
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/BinaryBlaze.git
   cd BinaryBlaze


2. **Install Required Libraries:**
    
    Install the necessary Python packages including OpenAI’s library:

        pip install -r requirements.txt

3. **Set Up Environment Variables:**
    
    Create a .env file in the project root directory and add your OpenAI API key:

        OPENAI_API_KEY=your_openai_api_key_here

4. **Upload Your Movie Database:**

    Prepare a text file listing movie titles and their synopses. Upload this file to the application using the OpenAI API to generate a file object ID:

        with open('movies.txt', 'r') as f:
            movie_data = f.read()
        file_id = openai.File.create(file=movie_data).id


5. **Initialize the Assistant:**

    Create an assistant using the OpenAI API:

        assistant = openai.beta.assistants.create(
            name="Movie Expert",
            model="gpt-4",
            tools=["file_search"],
            files=[file_id]
        )
        assistant_id = assistant.id

6. **Create a Thread and Interact:**

        Create a new thread for your conversation and start interacting with the chatbot:

        thread = openai.beta.threads.create(assistant_id=assistant_id)
        thread_id = thread.id

        response = openai.beta.messages.create(
            thread_id=thread_id,
            role="user",
            content="I need a good laugh"
        )

        print(response['content'])


## Usage

1. Run the main script to start the chatbot.
2. Use the provided text field in the front-end to ask movie-related questions.
3. The chatbot will respond with movie recommendations based on the context of the conversation and your custom movie database.

## Example Code

Here's an example of how the assistant is created and a simple interaction is handled:

        import openai

        # Set up the assistant
        assistant = openai.beta.assistants.create(
            name="Movie Expert",
            model="gpt-4",
            tools=["file_search"],
            files=[file_id]
        )
        assistant_id = assistant.id

        # Create a new thread
        thread = openai.beta.threads.create(assistant_id=assistant_id)
        thread_id = thread.id

        # User interaction
        response = openai.beta.messages.create(
            thread_id=thread_id,
            role="user",
            content="Recommend a comedy movie."
        )

        print(response['content'])

## License
This project is licensed under the MIT License. See the LICENSE file for more information.
