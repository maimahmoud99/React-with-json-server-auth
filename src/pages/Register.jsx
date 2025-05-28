/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) newErrors.email = "Invalid email";
    if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setErrors({});
  setApiError("");
  const newErrors = validate();
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  setLoading(true);
  try {
    const res = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } else {
      setApiError(data || "Registration failed");
    }
  } catch (err) {
    setApiError("Network error");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="w-7xl flex justify-center items-center min-h-screen  bg-fuchsia-50">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-fuchsia-600">Register</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
  type="submit"
  className="btn btn-block bg-fuchsia-900 text-white hover:bg-fuchsia-600"
  disabled={loading}
>
  {loading ? "Registering..." : "Register"}
</button>

        </form>

        {apiError && <p className="text-red-500 text-sm text-center mt-4">{apiError}</p>}

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-fuchsia-900 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
