from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://bazzar-buddy-local-shops-status.vercel.app",  # Vercel frontend
        "http://localhost:5173"  # Local dev
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Bazaar Buddy API is running!"}

from fastapi.staticfiles import StaticFiles
from .routers import auth, shop, user

app.mount("/static", StaticFiles(directory="static"), name="static")
app.include_router(auth.router)
app.include_router(shop.router)
app.include_router(user.router)