from fastapi import APIRouter, Depends, HTTPException, status, Query, File, UploadFile, Form
from sqlalchemy.orm import Session
from typing import List, Optional
from .. import schemas, crud, dependencies, models
import os

router = APIRouter(prefix="/shops", tags=["shops"])

@router.post("/", response_model=schemas.ShopOut)
def create_shop(
    name: str = Form(...),
    owner_name: str = Form(...),
    location: str = Form(...),
    open_time: str = Form(None),
    close_time: str = Form(None),
    flexible_timing: bool = Form(False),
    mobile_number: str = Form(None),
    google_maps_url: str = Form(None),
    image: UploadFile = File(None),
    db: Session = Depends(dependencies.get_db),
    current_user: models.User = Depends(dependencies.get_current_user)
):
    image_url = None
    if image:
        os.makedirs("static/images", exist_ok=True)
        file_location = f"static/images/{image.filename}"
        with open(file_location, "wb+") as file_object:
            file_object.write(image.file.read())
        image_url = f"/{file_location}"

    shop_data = {
        "name": name,
        "owner_name": owner_name,
        "location": location,
        "open_time": open_time,
        "close_time": close_time,
        "flexible_timing": flexible_timing,
        "mobile_number": mobile_number,
        "google_maps_url": google_maps_url,
        "image_url": image_url
    }
    return crud.create_shop(db, schemas.ShopCreate(**shop_data), owner_id=current_user.id)

@router.get("/", response_model=List[schemas.ShopOut])
def list_shops(
    db: Session = Depends(dependencies.get_db),
    name: Optional[str] = Query(None),
    location: Optional[str] = Query(None),
    status: Optional[bool] = Query(None),
    owner_id: Optional[int] = Query(None),
    skip: int = 0,
    limit: int = 100
):
    if name or location or status is not None or owner_id is not None:
        return crud.search_shops(db, name=name, location=location, status=status, owner_id=owner_id)
    return crud.get_shops(db, skip=skip, limit=limit)

@router.put("/{shop_id}", response_model=schemas.ShopOut)
def update_shop(shop_id: int, shop_update: schemas.ShopUpdate, db: Session = Depends(dependencies.get_db), current_user: models.User = Depends(dependencies.get_current_user)):
    shop = crud.get_shop(db, shop_id)
    if not shop:
        raise HTTPException(status_code=404, detail="Shop not found")
    if shop.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")
    return crud.update_shop(db, shop_id, shop_update)


@router.get("/{shop_id}", response_model=schemas.ShopOut)
def get_shop(
    shop_id: int,
    db: Session = Depends(dependencies.get_db)
):
    shop = crud.get_shop(db, shop_id)
    if not shop:
        raise HTTPException(status_code=404, detail="Shop not found")
    return shop

@router.delete("/{shop_id}")
def delete_shop(
    shop_id: int,
    db: Session = Depends(dependencies.get_db),
    current_user: models.User = Depends(dependencies.get_current_user)
):
    shop = crud.get_shop(db, shop_id)
    if not shop:
        raise HTTPException(status_code=404, detail="Shop not found")
    if shop.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")
    if crud.delete_shop(db, shop_id):
        return {"ok": True}
    return {"ok": False}