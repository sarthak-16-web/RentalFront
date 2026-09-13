import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../hooks/useAdminAuth";
import "./AdminLogin.css";

const AdminLogin = () => {
  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(username, password);
      navigate("/admin");
    } catch (err) {
      const status = err.response?.status;
      if (status === 401) {
        setError(err.response?.data?.message || "Invalid username or password");
      } else if (!err.response) {
        setError("Unable to reach the server. Please try again later.");
      } else {
        setError("Login service error — please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rk-alogin">
      <form className="rk-alogin__card" onSubmit={handleSubmit}>
        <h1>Admin Login</h1>
        <p>Restricted access — RentalKing staff only.</p>

        {error && <div className="rk-alogin__error">{error}</div>}

        <div className="rk-alogin__field">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="admin"
          />
        </div>

        <div className="rk-alogin__field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;