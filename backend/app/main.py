from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://bazzar-buddy-local-shops-status.vercel.app",  # Vercel frontend
        "http://localhost:5173"  # for local dev
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from fastapi.staticfiles import StaticFiles
from .routers import auth, shop, user

app.mount("/static", StaticFiles(directory="static"), name="static")
app.include_router(auth.router)
app.include_router(shop.router)
app.include_router(user.router)