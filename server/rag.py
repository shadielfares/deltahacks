from pinecone.grpc import PineconeGRPC 
from dotenv import load_dotenv
import os
from pinecone import ServerlessSpec



load_dotenv()
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

