const API = import.meta.env.VITE_API_URL;

export const fetchProducts = () =>
  fetch(`${API}/products`).then(res => res.json());

export const loginUser = (data) =>
  fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json());
