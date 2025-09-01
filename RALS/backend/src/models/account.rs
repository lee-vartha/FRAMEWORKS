use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, sqlx::FromRow)]
pub struct Account {
    pub id: Option<i64>,
    pub first_name: String,
    pub email: String,
    pub password: String,
    pub member_type: String,
    pub tokens: Option<i64>,
}

#[derive(Deserialize)]
pub struct LoginData {
    pub email: String,
    pub password: String,
}
