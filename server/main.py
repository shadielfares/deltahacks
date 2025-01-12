from fastapi import FastAPI
import uvicorn

app = FastAPI()

@app.get("/upload-data")
async def upload_data():
    return {"message": "Data uploaded successfully!"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)