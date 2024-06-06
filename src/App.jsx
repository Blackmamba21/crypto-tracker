import { useEffect, useState } from "react";

import "./App.css";
import { useCartStore } from "./store";
function App() {
  const [inputs, setInputs] = useState({});

  const { cart, loading, error, getProducts, deleteProduct, updateProduct } =
    useCartStore();
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleChange = (e, id) => {
    setInputs({ ...inputs, [id]: e.target.value }); // Update the value for the specific item
  };

  const handleUpdate = (id) => {
    const inputValue = inputs[id]; // Get the value for the specific item
    let payload = cart.find((item) => item.id === id);
    console.log("🚀 ~ handleUpdate ~ payload:", payload);
    payload.title = inputValue;
    updateProduct(id, payload); // Update the product
    setInputs({ ...inputs, [id]: null });
  };

  return (
    <>
      <h1>Zustand</h1>
      <div>
        <ul
          style={{
            background: "pink",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {cart.map((item) => (
            <div
              style={{
                background: "yellow",
                display: "flex",
                gap: "3px",
              }}
            >
              <li key={item.id}>{item.title}</li>
              <input
                key={item.id}
                type="text"
                value={inputs[item.id] || ""}
                onChange={(e) => handleChange(e, item.id)}
              />

              <button onClick={() => handleUpdate(item.id)}>Update</button>
              <button onClick={() => deleteProduct(item.id)}>Delete</button>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
