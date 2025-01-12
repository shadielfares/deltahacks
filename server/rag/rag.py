from langchain import hub
from typing import TypedDict, List
from langchain_cohere import CohereEmbeddings, ChatCohere
from langchain_pinecone import PineconeVectorStore
from pinecone import Pinecone, ServerlessSpec
from langchain.schema import Document
from langchain.prompts import prompt
from langgraph.graph import START, StateGraph
from langchain_community.document_loaders.csv_loader import CSVLoader
from fastapi.middleware.cors import CORSMiddleware



from fastapi import FastAPI 
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)
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

class AskRequest(BaseModel):
    prompt: str
    patient_id: str

def get_ask_template(prompt: str, patient_id: str) -> str:
    return f"""
    You are a medical assistant. Based on the context provided, answer the question in the following structured format:

    - Potential diagnoses: [a list of potential diagnoses, MUST include the accuracy rate of the prediction in percentage to the nearest percent]
    - Recommended Treatment: [Your recommended treatment based on the patient's medical history (allergies, ongoing conditions, ongoing devices, medications, observations, procedures), etc]
    - Dosage Calculation: [Your exact prescription of EVERY of your recommended treatment from above here, including calculated concentration/dosage/whatever other means of quantification based on patient data & medical history]
    - Analysis: [A description of potential diagnoses AND give an overall summary of your response in 70-100 words, relate that to the patient's medical history]

    Question: {prompt}
    PATIENT: {patient_id}
    """

def get_summarize_template(patient_id: str):
    return f"""
    You are a medical assistant. Based on the context provided, answer the question in the following structured format:

    - Past conditions: [get past diagnoses, conditions, allergies]
    - Treatments: [get the EXACT list of medications, treatments]

    Question: retrieve this patient's medical records
    PATIENT: {patient_id}
    """

def generate(prompt: str, patient_id: str, func: int):
    if func == 0:
        templated_prompt = get_summarize_template(patient_id)
    elif func == 1:
        templated_prompt = get_ask_template(prompt, patient_id)
    response = graph.invoke({"question": f'{templated_prompt}'})["answer"]
    result = [response.split('\n')]
    result = [line.split(' ', 1)[1] for line in result if ': ' in line]
    return result

#indices: 0 - potential diagnosis, 1 - recommended treatment, 2 - dosage calculation, 3 - analysis
@app.post('/ask')
async def ask(request: AskRequest):
    try:
        response = generate(request.prompt, request.patient_id, 1)
        return {
            'potential_diagnosis': response[0],
            'recommended_treatment': response[1],
            'dosage_calculation': response[2],
            'analysis': response[3]
        }
    except Exception as e:
        return f"We ran into the error: {e} "   

#indices: 0 - past conditions, 1 - treatments
@app.post('/summarize')
async def summarize(request: AskRequest):
    try:
        response = generate("", request.patient_id, 0)
        return {
            'past_conditions': response[0],
            'treatments': response[1],
        }
    except Exception as e:
        return f"We ran into the error: {e} "