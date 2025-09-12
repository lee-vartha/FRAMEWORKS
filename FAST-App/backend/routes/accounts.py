from fastapi import APIRouter, HTTPException
from models import AccountIn
from database import db

router = APIRouter()

@router.post("/register")
async def register(account: AccountIn):
    existing = await db.accounts.find_one({"email": account.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already exists")
    account_dict = account.dict()
    account_dict["tokens"] = 0
    result = await db.accounts.insert_one(account_dict)
    account_dict["_id"] = str(result.inserted_id)
    return account_dict

@router.post("/login")
async def login(data: dict):
    email = data.get("email")
    password = data.get("password")
    user = await db.accounts.find_one({"email": email, "password": password})
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    user["_id"] = str(user["_id"])
    return user
