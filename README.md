## RAG

**Retrieval Augmented Generation**, or RAG, is an architectural approach that can improve the effiacy of **Large Language Model** (LLM) applications by leveraging **custom** data.
This is done by retrieving data/documents relevant to a question or task and providing them as context for the LLM.

## 🚧 Setup 🚧

For the local dev setup, you can use the provided poetry file.

Clone the repository, enter the repo, then do `poetry install`.

If you need ELK to monitor the logs, go to the root of the repo, and execute `docker-compose up --build`. The build process takes around 5 min. When it is done, access the service at `http://localhost:9400`. 

> Warning: this will only work if you have Docker and its plugins installed.

Then, open a new terminal tab, navigate to each service, and execute the following commands:

- Go to `./src/flask` and execute `python main.py 2>> ../../logs/flask.log`

> Runs the backend flask server and write the logs to an external file that can be monitored with the ELK stack.

- Go to `./src/masp/src` and execute `tsc index.ts -w`

> This is to monitor and auto compile the changes in the typescript code.

- Go to `./src/masp` and execute `npm start`

> Starts the frontend npm dev server.

- Go to `./src/chromadb` and execute `./launch.sh`

> Starts the chroma server and redirects logs to an external location.

That's it! Access the project at `http://localhost:3000`.

 


