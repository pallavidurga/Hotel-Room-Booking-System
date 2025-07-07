import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "8px 16px",
        backgroundColor: "#e53e3e",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        position: "absolute",
        top: "20px",
        right: "20px",
      }}
    >
      Logout
    </button>
  );
}
