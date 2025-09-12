from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import accounts, products, reservations

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(accounts.router, prefix="/api/accounts")
app.include_router(products.router, prefix="/api/products")
app.include_router(reservations.router, prefix="/api/reservations")
