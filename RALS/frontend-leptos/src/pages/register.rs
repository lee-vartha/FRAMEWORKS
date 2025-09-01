use leptos::*;
use serde::{Deserialize, Serialize};
use gloo_net::http::Request;

#[derive(Serialize, Deserialize, Default, Clone)]
struct RegisterForm {
    first_name: String,
    email: String,
    password: String,
    member_type: String,
}

#[component]
pub fn Register() -> impl IntoView {
    let form = create_rw_signal(RegisterForm::default());

    let submit = create_action(|form: &RegisterForm| {
        let form = form.clone();
        async move {
            let res = Request::post("/api/accounts/register")
                .header("Content-Type", "application/json")
                .json(&form)
                .unwrap()
                .send()
                .await;

            match res {
                Ok(_) => log!("✅ Registered successfully!"),
                Err(e) => log!("❌ Failed: {e:?}"),
            }
        }
    });

    view! {
        <div style="padding: 2rem; max-width: 400px; margin: auto;">
            <h2>"Register"</h2>
            <form on:submit=move |ev| {
                ev.prevent_default();
                submit.dispatch(form.get());
            }>
                <input placeholder="First Name"
                    on:input=move |ev| {
                        form.update(|f| f.first_name = event_target_value(&ev));
                    }
                    prop:value=form.get().first_name.clone()
                />
                <input placeholder="Email"
                    on:input=move |ev| {
                        form.update(|f| f.email = event_target_value(&ev));
                    }
                    prop:value=form.get().email.clone()
                />
                <input type="password" placeholder="Password"
                    on:input=move |ev| {
                        form.update(|f| f.password = event_target_value(&ev));
                    }
                    prop:value=form.get().password.clone()
                />
                <select on:change=move |ev| {
                    form.update(|f| f.member_type = event_target_value(&ev));
                }>
                    <option value="">"Select Role"</option>
                    <option value="donor">"Donor"</option>
                    <option value="beneficiary">"Beneficiary"</option>
                </select>
                <button type="submit">"Register"</button>
            </form>
        </div>
    }
}
