import getpass
import os

if not os.environ.get("COHERE_API_KEY"):
  os.environ["COHERE_API_KEY"] = getpass.getpass("Enter API key for Cohere: ")

from langchain_cohere import ChatCohere

llm = ChatCohere(model="command-r-plus")

pc = PineconeGRPC(api_key=os.getenv("PINECONE_API_KEY"))

pc.create_index(
  name="rag",
  dimension=1536,
  metric="cosine",
  spec=ServerlessSpec(
    cloud="aws",
    region="us-east-1"
  )
)

