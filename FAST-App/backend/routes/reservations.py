from fastapi import APIRouter, HTTPException
from models import ReservationIn
from database import db
from bson import ObjectId

router = APIRouter()

@router.post("/")
async def reserve(res: ReservationIn):
    product = await db.products.find_one({"_id": ObjectId(res.productId)})
    user = await db.accounts.find_one({"_id": ObjectId(res.beneficiaryId)})

    if not product or not user:
        raise HTTPException(status_code=404, detail="Invalid data")
    if user["tokens"] < product["tokenCost"]:
        raise HTTPException(status_code=400, detail="Not enough tokens")

    # update values
    await db.products.update_one({"_id": ObjectId(res.productId)}, {"$inc": {"quantity": -1}})
    await db.accounts.update_one({"_id": ObjectId(res.beneficiaryId)}, {"$inc": {"tokens": -product["tokenCost"]}})
    return {"message": "Reservation confirmed"}
