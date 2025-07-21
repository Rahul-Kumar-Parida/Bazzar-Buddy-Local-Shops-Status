from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    shops = relationship("Shop", back_populates="owner")

class Shop(Base):
    __tablename__ = "shops"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True, nullable=False)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    owner_name = Column(String(255), nullable=False)
    location = Column(String(255), nullable=False)
    status = Column(Boolean, default=False)
    open_time = Column(String(64), nullable=True)
    close_time = Column(String(64), nullable=True)  # <-- Make sure this is in your DB!
    flexible_timing = Column(Boolean, default=False)
    mobile_number = Column(String(32), nullable=True)
    google_maps_url = Column(String(512), nullable=True)
    last_updated = Column(DateTime, default=datetime.utcnow)
    image_url = Column(String(512), nullable=True)
    owner = relationship("User", back_populates="shops")