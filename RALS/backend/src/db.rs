use sqlx::{SqlitePool, sqlite::SqlitePoolOptions};
use std::env;

pub async fn init_db() -> Result<SqlitePool, sqlx::Error> {
    let db_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let pool = SqlitePoolOptions::new()
        .connect(&db_url)
        .await?;

    // Create table if not exists
    sqlx::query(
        "CREATE TABLE IF NOT EXISTS accounts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            member_type TEXT NOT NULL,
            tokens INTEGER DEFAULT 0
        );"
    )
    .execute(&pool)
    .await?;

    Ok(pool)
}
