mod routes;
mod models;
mod db;
mod state;

use axum::{Router};
use dotenvy::dotenv;
use std::env;
use db::init_db;
use state::AppState;
use routes::account::account_routes;
use tower_http::cors::{CorsLayer, Any};
use axum::routing::get;

#[tokio::main]
async fn main() {
    dotenv().ok();
    let db = init_db().await.expect("DB init failed");

    let app_state = AppState { db };

    let app = Router::new()
        .merge(account_routes())
        .with_state(app_state)
        .layer(CorsLayer::new().allow_origin(Any).allow_methods(Any).allow_headers(Any))
        .route("/", get(|| async { "Rust backend is running!" }));

    let port = 3000;
    println!("Server running on http://localhost:{}", port);
    axum::Server::bind(&format!("0.0.0.0:{}", port).parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}
