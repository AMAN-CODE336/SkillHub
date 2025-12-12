import { Link } from "react-router-dom";
import useAuth from "../store/authStore";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="px-6 py-4 bg-gray-100 border-b flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        SkillHub
      </Link>

      <div className="space-x-4 flex items-center">

        <Link to="/">Home</Link>
        <Link to="/courses">Courses</Link>

        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup" className="text-blue-600 font-semibold">
              Signup
            </Link>
          </>
        )}

       {user && (
  <>
    <span className="font-medium text-gray-600">
      Hi, {user.name}
    </span>
<Link to="/my-courses">My Courses</Link>

    {/* Show only ONE dashboard depending on role */}
    {user.role === "admin" ? (
      <Link to="/admin" className="font-semibold text-red-600">
        Admin
      </Link>
    ) : (
      <Link to="/dashboard">Dashboard</Link>
      
    )}

    {/* Logout */}
    <button
      onClick={logout}
      className="px-3 py-1 bg-red-600 text-white rounded"
    >
      Logout
    </button>
  </>
)}
      </div>
    </nav>
  );
}
