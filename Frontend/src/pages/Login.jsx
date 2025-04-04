import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useState, useContext } from 'react';
import axios from 'axios'; // ✅ Import axios

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { setUser, setToken } = useContext(AuthContext); // ✅ Include setToken
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", form);
      const { token, name, email, _id } = res.data;

      // ✅ Save token and user to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ name, email, _id }));

      // ✅ Update AuthContext
      setUser({ name, email, _id });
      setToken(token);

      // ✅ Set default auth header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      if (err.response) {
        alert("Login failed: " + (err.response.data?.message || "Invalid credentials"));
      } else if (err.request) {
        alert("No response from server. Check if backend is running.");
      } else {
        alert("Login error: " + err.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 space-y-4">
      <input
        className="border p-2 w-full"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        className="border p-2 w-full"
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button className="bg-blue-500 text-white p-2 w-full">Login</button>
    </form>
  );
};

export default Login;
