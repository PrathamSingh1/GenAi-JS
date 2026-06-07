Stage 1: Indexing

- Load the document - pdf, text
- Chunk the document
- Generate vector embeddings
- Store the vector embeddings - Vector database

Stage 2: Using the chatbot

- Setup LLM
- Add retrieval step
- Pass input + relevant information to LLM
- LLM will return the result