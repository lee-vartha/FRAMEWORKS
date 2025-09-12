from fastapi import APIRouter
from models import ProductIn
from database import db

router = APIRouter()

@router.post("/")
async def add_product(product: ProductIn):
    result = await db.products.insert_one(product.dict())
    return {"id": str(result.inserted_id)}

@router.get("/")
async def get_products():
    products = []
    async for p in db.products.find():
        p["_id"] = str(p["_id"])
        products.append(p)
    return products
