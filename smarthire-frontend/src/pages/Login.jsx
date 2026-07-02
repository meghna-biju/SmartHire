import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const login = async () => {

    try {

      const response = await api.post(
        "/api/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        response.data
      );

      navigate("/dashboard");

    } catch (error) {

      alert("Invalid email or password");
      console.error(error);

    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">

        <h1 className="text-4xl font-bold text-center mb-6">
          SmartHire
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Login to continue
        </p>

        <input
          className="w-full border p-3 rounded-lg mb-4"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full border p-3 rounded-lg mb-4"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
          onClick={login}
        >
          Login
        </button>

        <p className="text-center mt-4">
          Don't have an account?
        </p>

        <button
          className="w-full mt-2 border p-3 rounded-lg hover:bg-gray-100"
          onClick={() => navigate("/register")}
        >
          Register
        </button>

      </div>

    </div>
  );
}