from fastapi import FastAPI

app = FastAPI()

@app.get("/login")
def login():
    return {"message": "Login"}
