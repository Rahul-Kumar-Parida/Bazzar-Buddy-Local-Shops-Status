from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: int
    class Config:
        orm_mode = True

class ShopBase(BaseModel):
    name: str
    location: str
    owner_name: str
    open_time: Optional[str] = None
    close_time: Optional[str] = None
    flexible_timing: Optional[bool] = False
    mobile_number: Optional[str] = None
    google_maps_url: Optional[str] = None
    image_url: Optional[str] = None

class ShopCreate(ShopBase):
    pass

class ShopUpdate(BaseModel):
    name: Optional[str]
    location: Optional[str]
    owner_name: Optional[str]
    open_time: Optional[str]
    close_time: Optional[str]  # <-- Added
    flexible_timing: Optional[bool]
    mobile_number: Optional[str]
    google_maps_url: Optional[str]
    image_url: Optional[str]
    status: Optional[bool]

class ShopOut(ShopBase):
    id: int
    status: bool
    last_updated: datetime
    owner_id: int
    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    user_id: Optional[int] = None