from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import schemas, dependencies, models

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/me", response_model=schemas.UserOut)
def get_me(current_user: models.User = Depends(dependencies.get_current_user)):
    return current_user 