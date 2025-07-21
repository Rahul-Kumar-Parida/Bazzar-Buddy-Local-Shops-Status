from sqlalchemy.orm import Session
from . import models, schemas
from typing import List, Optional
from datetime import datetime

def get_user_by_email(db: Session, email: str) -> Optional[models.User]:
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate, hashed_password: str) -> models.User:
    db_user = models.User(email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user(db: Session, user_id: int) -> Optional[models.User]:
    return db.query(models.User).filter(models.User.id == user_id).first()

def create_shop(db: Session, shop: schemas.ShopCreate, owner_id: int) -> models.Shop:
    db_shop = models.Shop(**shop.dict(), owner_id=owner_id, last_updated=datetime.utcnow())
    db.add(db_shop)
    db.commit()
    db.refresh(db_shop)
    return db_shop

def get_shops(db: Session, skip: int = 0, limit: int = 100) -> List[models.Shop]:
    return db.query(models.Shop).offset(skip).limit(limit).all()

def get_shop(db: Session, shop_id: int) -> Optional[models.Shop]:
    return db.query(models.Shop).filter(models.Shop.id == shop_id).first()

def update_shop(db: Session, shop_id: int, shop_update: schemas.ShopUpdate) -> Optional[models.Shop]:
    db_shop = get_shop(db, shop_id)
    if not db_shop:
        return None
    for key, value in shop_update.dict(exclude_unset=True).items():
        setattr(db_shop, key, value)
    db_shop.last_updated = datetime.utcnow()
    db.commit()
    db.refresh(db_shop)
    return db_shop

def delete_shop(db: Session, shop_id: int) -> bool:
    db_shop = get_shop(db, shop_id)
    if not db_shop:
        return False
    db.delete(db_shop)
    db.commit()
    return True

def search_shops(
    db: Session,
    name: Optional[str] = None,
    location: Optional[str] = None,
    status: Optional[bool] = None,
    owner_id: Optional[int] = None
) -> List[models.Shop]:
    query = db.query(models.Shop)
    if name:
        query = query.filter(models.Shop.name.ilike(f"%{name}%"))
    if location:
        query = query.filter(models.Shop.location.ilike(f"%{location}%"))
    if status is not None:
        query = query.filter(models.Shop.status == status)
    if owner_id is not None:
        query = query.filter(models.Shop.owner_id == owner_id)
    return query.all()