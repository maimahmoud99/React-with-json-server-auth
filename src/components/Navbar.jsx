import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100 shadow-sm w-full fixed top-0 left-0 z-50 px-4">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Juniors🦄</a>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto"
        />

        {/* Login & Register Buttons */}
        {!user && (
          <>
            <Link
              to="/login"
              className="btn btn-sm btn-outline text-fuchsia-600 hover:bg-fuchsia-50"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn btn-sm btn-lime-500 text-fuchsia-900 hover:bg-fuchsia-600"
            >
              Register
            </Link>
          </>
        )}

        {/* Avatar Dropdown */}
        {user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
              
                <img
                  alt="User avatar"
                  src="https://static.vecteezy.com/system/resources/thumbnails/013/105/375/small_2x/baby-shop-logo-design-vector.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between text-lg">
                  Hello, {user.name} 💖
                </a>
              </li>
              <li>
                <a onClick={() => navigate("/posts")} className="cursor-pointer text-sm">
                  Posts
                </a>
              </li>
              <li>
                <a onClick={handleLogout} className="cursor-pointer text-sm text-fuchsia-900">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
