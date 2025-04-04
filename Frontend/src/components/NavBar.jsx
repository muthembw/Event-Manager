import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
  const {user, setUser}= useContext(AuthContext); // Ensure you're using the correct destructuring syntax

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);  // Clear the user from the context
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <h1 className="text-xl font-bold">Event Manager</h1>
      <div>
        <Link className="mx-2" to="/">Home</Link>
        {user ? (
          <>
            <Link className="mx-2" to="/create">Create Event</Link>
            <button onClick={handleLogout} className="mx-2">Logout</button>
          </>
        ) : (
          <>
            <Link className="mx-2" to="/login">Login</Link>
            <Link className="mx-2" to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
