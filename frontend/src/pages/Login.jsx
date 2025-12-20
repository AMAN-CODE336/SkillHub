import { useState } from "react";
import axiosClient from "../api/axiosClient";
import useAuth from "../store/authStore";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const setUser = useAuth((state) => state.setUser);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axiosClient.post("/auth/login", form);

    setUser(res.data.user);

    localStorage.setItem("token", res.data.token);

    alert("Login successful!");
    navigate("/");

  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Login failed");
  }
};


  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">Login</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        <button
          className="w-full p-3 bg-blue-600 text-white rounded"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}
