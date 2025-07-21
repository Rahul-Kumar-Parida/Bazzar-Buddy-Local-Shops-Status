from app.database import engine, Base
from app import models  # <-- This import is required!

if __name__ == "__main__":
    print("Using DB URL:", engine.url)
    print("Creating all tables...")
    Base.metadata.create_all(bind=engine)
    print("All tables created successfully.")