from langchain import hub
from typing import TypedDict, List
from langchain_cohere import CohereEmbeddings, ChatCohere
from langchain_pinecone import PineconeVectorStore
from pinecone import Pinecone, ServerlessSpec
from langchain.schema import Document
from langchain.prompts import prompt
from langgraph.graph import START, StateGraph
from langchain_community.document_loaders.csv_loader import CSVLoader

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
        retrieved_docs = vector_store.similarity_search(state["question"], k=50)
        patient_id = state["question"].split("PATIENT: ")[-1].strip()
        filtered_docs = [doc for doc in retrieved_docs if f'PATIENT: {patient_id}' in doc.page_content
                         or 'PATIENT:' not in doc.page_content]
    except Exception as e:
        print(f"Error during similarity search: {e}")
        return {"context": []}
    return {"context": filtered_docs}

def generate(state: State):
    docs_content = "\n\n".join(doc.page_content for doc in state["context"])
    messages = prompt.invoke({"question": state["question"], "context": docs_content})
    response = llm.invoke(messages)
    return {"answer": response.content}

graph_builder = StateGraph(State).add_sequence([retrieve, generate])
graph_builder.add_edge(START, "retrieve")
graph = graph_builder.compile()

def get_template(prompt: str, patient_id: str) -> str:
    return f"""
    You are a medical assistant. Based on the context provided, answer the question in the following structured format:

    - Potential diagnoses: [a list of potential diagnoses, MUST include the accuracy rate of the prediction in percentage to the nearest percent]
    - Recommended Treatment: [Your recommended treatment based on the patient's medical history (allergies, ongoing conditions, ongoing devices, medications, observations, procedures), etc]
    - Dosage Calculation: [Your exact prescription of EVERY of your recommended treatment from above here, including calculated concentration/dosage/whatever other means of quantification based on patient data & medical history]
    - Analysis: [give an overall summary of your response in 40-100 words]
    - Context used: [summarize the context that was used and give details to specific attributes of medical history if related]

    Question: {prompt}
    PATIENT: {patient_id}
    """

def ask(prompt: str, patient_id: str):
    templated_prompt = get_template(prompt, patient_id)
    response = graph.invoke({"question": f'{templated_prompt}'})
    return response["answer"]