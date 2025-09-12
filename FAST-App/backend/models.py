from pydantic import BaseModel, EmailStr
from typing import Literal

class AccountIn(BaseModel):
    firstName: str
    email: EmailStr
    password: str
    memberType: Literal['donor', 'beneficiary']

class AccountOut(AccountIn):
    id: str
    tokens: int = 0

class ProductIn(BaseModel):
    productName: str
    companyName: str
    quantity: int
    tokenCost: int
    waitTime: int
    donorId: str

class ReservationIn(BaseModel):
    productId: str
    beneficiaryId: str
