import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useCounterStore = create(
  persist(
    (set) => ({
      count: 0,
      increment: () => {
        set((state) => ({ count: state.count + 1 }));
      },
      incrementAsync: async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        set((state) => ({ count: state.count + 1 }));
      },
      decrement: () => {
        set((state) => ({ count: state.count - 1 }));
      },
    }),
    {
      name: "counter-storage", // unique name for the storage item
      getStorage: () => localStorage, // specify the storage to use
    }
  )
);

async function getProducts() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    return await response.json();
  } catch (error) {
    console.error("Error fetching the todo:", error);
  }
}

async function deleteProduct(id) {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/" + id,
      {
        method: "DELETE",
      }
    );
    console.log("🚀 ~ deleteProduct ~ response:", response);
    return await response.json();
  } catch (error) {
    console.error("Error fetching the todo:", error);
  }
}

async function updateProduct(id, payload) {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/" + id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    console.log("🚀 ~ updateProduct ~ response:", response);
    return await response.json();
  } catch (error) {
    console.error("Error fetching the todo:", error);
  }
}

export const useCartStore = create((set) => ({
  cart: [],
  loading: false,
  error: null,
  getProducts: async () => {
    set({ loading: true, error: null });
    try {
      const products = await getProducts();
      set((state) => ({ cart: [...state.cart, ...products], loading: false }));
    } catch (error) {
      set({ error: "Failed to fetch product", loading: false });
    }
  },
  deleteProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      const product = await deleteProduct(id);
      console.log("🚀 ~ deleteProduct: ~ product:", product);
      set((state) => ({
        cart: state.cart.filter((item) => item.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: "Failed to delete product", loading: false });
    }
  },
  updateProduct: async (id, payload) => {
    set({ loading: true, error: null });
    try {
      const product = await updateProduct(id, payload);
      console.log("🚀 ~ updateProduct: ~ product:", product);

      set((state) => ({ cart: [...state.cart, product], loading: false }));
    } catch (error) {
      set({ error: "Failed to update product", loading: false });
    }
  },
}));
