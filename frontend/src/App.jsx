// src/App.jsx
import { useState } from "react";

function App() {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState(null);
  const [products, setProducts] = useState([]);

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Login failed");
      const data = await res.json();
      setToken(data.token);
      localStorage.setItem("token", data.token);
      alert("Login successful!");
    } catch (err) {
      alert(err.message);
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setProfile(data);
    } catch (err) {
      alert("Failed to fetch profile", err.message);
    }
  };

  const fetchProducts = async (page = 1, category = "") => {
    try {
      let url = `http://localhost:5000/products?page=${page}&limit=5`;
      if (category) url += `&category=${category}`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setProducts(data.data || []);
    } catch (err) {
      alert("Failed to fetch products", err.message);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2> Login</h2>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>

      {token && (
        <>
          <h3> Logged in</h3>
          <button onClick={fetchProfile}>Fetch Profile</button>
          {profile && (
            <div>
              <p>Email: {profile.email}</p>
              <p>Role: {profile.role}</p>
            </div>
          )}

          <h3> Products</h3>
          <button onClick={() => fetchProducts(1)}>Load Products</button>
          <table border="1" cellPadding="5" style={{ marginTop: "10px" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>{p.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default App;
