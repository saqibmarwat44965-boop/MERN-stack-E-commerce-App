import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";



const Navbar = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth(null);
    navigate("/login");
  };
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-lg">
      <h1 className="text-xl italic font-bold text-teal-400">
        Tech-Bazaar
      </h1>

      <div className="flex space-x-6">


        <Link to="/" className="hover:text-teal-400 transition">
          Home
        </Link>

          
      {!auth?.token && (
         <Link to="/login" className="hover:text-teal-400 transition">
          Login
        </Link>
        
      )}
         
         {!auth?.token && (
        
       <Link to="/signup" className="hover:text-teal-400 transition">
          Signup
        </Link>
        
      )}

          {auth?.token && (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/forget-password" className="hover:text-teal-400 transition">
          Forgot Password
        </Link>
          <button onClick={handleLogout} className="text-red-400">
            Logout
          </button>
        </>
      )}
        
      </div>
    </nav>
  );
};

export default Navbar;
