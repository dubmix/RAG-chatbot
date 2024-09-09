## RAG

**Retrieval Augmented Generation**, or RAG, is an architectural approach that can improve the effiacy of **Large Language Model** (LLM) applications by leveraging **custom** data.
This is done by retrieving data/documents relevant to a question or task and providing them as context for the LLM.

## Pre-setup

In order to launch the local dev setup seamlessly, you'll need to do the following:

- Clone the repo, go to the root, and install dependencies with `poetry install`
- Go to `./client` and run `npm install`
- Create a `.env` file at the root of the repository. It should contain at least a valid `OPENAI_API_KEY` for the backend to run properly.

## 🚧 Setup 🚧

> Warning: this will only work if you have Docker and its plugins installed.

Open a new terminal tab, and execute the following commands in this order:

- Go to `./chromadb` and run `./launch.sh`

> Starts the chroma server in a Docker container and redirects logs to the centralized logs folder.

- Go to `./api` and run `python main.py`

> Starts the backend server.

- Go to `./client` and run `npm start`

> Starts the frontend npm dev server.

That's it! Access the project at `http://localhost:3000`.

 


