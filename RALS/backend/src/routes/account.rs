use axum::{Router, Json, routing::post};
use crate::{models::account::{Account, LoginData}, state::AppState};
use axum::extract::State;
use sqlx::sqlite::SqliteQueryResult;

pub fn account_routes() -> Router<AppState> {
    Router::new()
        .route("/api/accounts/register", post(register))
        .route("/api/accounts/login", post(login))
}

async fn register(
    State(state): State<AppState>,
    Json(payload): Json<Account>,
) -> Result<Json<SqliteQueryResult>, String> {
    let result = sqlx::query(
        "INSERT INTO accounts (first_name, email, password, member_type, tokens) VALUES (?, ?, ?, ?, ?)"
    )
    .bind(&payload.first_name)
    .bind(&payload.email)
    .bind(&payload.password)
    .bind(&payload.member_type)
    .bind(payload.tokens.unwrap_or(0))
    .execute(&state.db)
    .await
    .map_err(|e| e.to_string())?;

    Ok(Json(result))
}

async fn login(
    State(state): State<AppState>,
    Json(data): Json<LoginData>,
) -> Result<Json<Account>, String> {
    let row: Account = sqlx::query_as::<_, Account>(
        "SELECT * FROM accounts WHERE email = ? AND password = ?"
    )
    .bind(&data.email)
    .bind(&data.password)
    .fetch_one(&state.db)
    .await
    .map_err(|_| "Invalid credentials".to_string())?;

    Ok(Json(row))
}
