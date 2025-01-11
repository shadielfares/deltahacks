import getpass
import os
from typing import TypedDict, List
from langchain_community.document_loaders.csv_loader import CSVLoader
from langchain_cohere import CohereEmbeddings, ChatCohere
from langchain_pinecone import PineconeVectorStore
from pinecone import Pinecone, ServerlessSpec
from langchain.schema import Document
from langchain.prompts import prompt

if not os.environ.get("JSkmjewo6AnwoBJROD4SnPd7gN4HI4khSN43Ek7b"):
  os.environ["JSkmjewo6AnwoBJROD4SnPd7gN4HI4khSN43Ek7b"] = getpass.getpass("Enter API key for Cohere: ")

pc = Pinecone(api_key="pcsk_7GqzxA_C5DSEGuHFBKKd7NnhFGTWNjkdxrp77SNBjzTztr8yfzpDnzPs9W3Ga9GSGP2Rim")

index_name = pc.create_index(
  name="rag",
  dimension=1536,
  metric="cosine",
  spec=ServerlessSpec(
    cloud="aws",
    region="us-east-1"
  )
)

llm = ChatCohere(model="command-r-plus", cohere_api_key=os.environ["JSkmjewo6AnwoBJROD4SnPd7gN4HI4khSN43Ek7b"])

embeddings = CohereEmbeddings(model="embed-english-v3.0", cohere_api_key=os.environ["JSkmjewo6AnwoBJROD4SnPd7gN4HI4khSN43Ek7b"])

index = pc.Index(index_name)

vector_store = PineconeVectorStore(embedding=embeddings, index=index)

class State(TypedDict):
    question: str
    context: List[Document]
    answer: str

def retrieve(state: State):
    retrieved_docs = vector_store.similarity_search(state["question"])
    return {"context": retrieved_docs}

def generate(state: State):
    docs_content = "\n\n".join(doc.page_content for doc in state["context"])
    messages = prompt.invoke({"question": state["question"], "context": docs_content})
    response = llm.invoke(messages)
    return {"answer": response.content}