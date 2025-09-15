// importing necessary modules and components
import React, { useState, useEffect } from "react";
import API from "../api";

// function to handle member dashboard
function MemberDashboard({ user, setUser }) {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", cost: "" });

  // use effect meaning the code inside runs once when the component loads
  useEffect(() => {
    API.get("/products").then((res) => setProducts(res.data));
  }, []);

  // add the product
  const addProduct = async () => {
    // if the form is not filled, return
    if (!form.name || !form.description || !form.cost) return;
    await API.post("/products", form);
    const updated = await API.get("/products");
    setProducts(updated.data);
    setForm({ name: "", description: "", cost: "" }); // reset
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>

      <input
        className="border p-2 mb-2 w-full text-black"
        placeholder="Product Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        className="border p-2 mb-2 w-full text-black"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input
        type="number"
        className="border p-2 mb-2 w-full text-black"
        placeholder="Cost (tokens)"
        value={form.cost}
        onChange={(e) => setForm({ ...form, cost: e.target.value })}
      />

      <button
        onClick={addProduct}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add
      </button>

      <h2 className="text-xl font-bold mt-6 mb-2">My Products</h2>
      <ul className="bg-white text-black rounded shadow divide-y">
        {products.map((p) => (
          <li key={p._id} className="p-3">
            {p.name} — {p.cost} tokens
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MemberDashboard;
