from langchain import hub
from typing import TypedDict, List
from langchain_cohere import CohereEmbeddings, ChatCohere
from langchain_pinecone import PineconeVectorStore
from pinecone import Pinecone, ServerlessSpec
from langchain.schema import Document
from langchain.prompts import prompt
from langgraph.graph import START, StateGraph
from langchain_community.document_loaders.csv_loader import CSVLoader

from fastapi import FastAPI 
from pydantic import BaseModel
app = FastAPI()
# if not os.environ.get("JSkmjewo6AnwoBJROD4SnPd7gN4HI4khSN43Ek7b"):
# os.environ["JSkmjewo6AnwoBJROD4SnPd7gN4HI4khSN43Ek7b"] = getpass.getpass("Enter API key for Cohere: ")

llm = ChatCohere(model="command-r-plus", cohere_api_key="ZIw76WbFxpV9m2pmFDnceBJqOi9e3GEAelwDd5k1")
embeddings = CohereEmbeddings(model="embed-english-v3.0", cohere_api_key="ZIw76WbFxpV9m2pmFDnceBJqOi9e3GEAelwDd5k1")

# pinecone
index_name = "database"
pc = Pinecone(api_key="pcsk_7GqzxA_C5DSEGuHFBKKd7NnhFGTWNjkdxrp77SNBjzTztr8yfzpDnzPs9W3Ga9GSGP2Rim")
if not pc.has_index(index_name):
    pc.create_index(
        name=index_name,
        dimension=1024,
        metric="cosine",
        spec=ServerlessSpec(
            cloud='aws',
            region='us-east-1'
        )
    )
index = pc.Index(index_name)
vector_store = PineconeVectorStore(embedding=embeddings, index=index)

# document loading
def loadCSV(file_path: str):
    loader = CSVLoader(file_path=file_path)
    docs = loader.load()
    vector_store.add_documents(documents=docs)

# prompt
prompt = hub.pull("rlm/rag-prompt")

class State(TypedDict):
    question: str
    context: List[Document]
    answer: str

def retrieve(state: State):
    try:
        retrieved_docs = vector_store.similarity_search(state["question"], k=40)
        print(f'docs: {retrieved_docs}')
        patient_id = state["question"].split("PATIENT: ")[-1].strip()
        filtered_docs = [doc for doc in retrieved_docs if f'PATIENT: {patient_id}' in doc.page_content]
        print(f'filtered docs: {filtered_docs}')
    except Exception as e:
        print(f"Error during similarity search: {e}")
        return {"context": []}
    return {"context": retrieved_docs}

def generate(state: State):
    docs_content = "\n\n".join(doc.page_content for doc in state["context"])
    messages = prompt.invoke({"question": state["question"], "context": docs_content})
    response = llm.invoke(messages)
    return {"answer": response.content}

graph_builder = StateGraph(State).add_sequence([retrieve, generate])
graph_builder.add_edge(START, "retrieve")
graph = graph_builder.compile()

class AskRequest(BaseModel):
    prompt: str
    patiend_id: str

@app.post('/ask')
async def ask(request: AskRequest): #todo: prompt & response templates
    try:
        response = graph.invoke({"question": f'{request.prompt}\nPATIENT: {request.patient_id}'})
        print(f'Context: {response["context"]}\n\n')
        print(f'Answer: {response["answer"]}')
        return response
    except Exception as e:
        return f"We ran into the error: {e} "    