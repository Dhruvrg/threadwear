import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-[#3C1053FF] flex gap-[1vw] text-white font-semibold md:text-lg px-[2.5vw] h-[7.5vh] z-10 items-center fixed w-[100vw]">
      <div className="flex">
        <div className="hover:animate-bounce">T</div>
        <div className="hover:animate-bounce">h</div>
        <div className="hover:animate-bounce">r</div>
        <div className="hover:animate-bounce">e</div>
        <div className="hover:animate-bounce">a</div>
        <div className="hover:animate-bounce">d</div>
        <div className="hover:animate-bounce">W</div>
        <div className="hover:animate-bounce">e</div>
        <div className="hover:animate-bounce">a</div>
        <div className="hover:animate-bounce">r</div>
      </div>
      <Link
        className="hover:font-bold hover:text-[#DF6589FF] focus:text-[#DF6589FF] focus:scale-x-105"
        to="/"
      >
        Home
      </Link>
      <Link
        className="hover:font-bold hover:text-[#DF6589FF] focus:text-[#DF6589FF] focus:scale-x-105"
        to="/design"
      >
        Design
      </Link>
      <Link
        className="hover:font-bold hover:text-[#DF6589FF] focus:text-[#DF6589FF] focus:scale-x-105"
        to="/cart"
      >
        Cart
      </Link>
      <div className="absolute right-[2.5vw]">
        {!localStorage.getItem("token") ? (
          <form className="flex gap-[2.5vw]">
            <Link
              className="hover:font-bold hover:text-[#DF6589FF] focus:text-[#DF6589FF] focus:scale-x-105"
              to="/login"
              role="button"
            >
              Login
            </Link>
            <Link
              className="hover:font-bold hover:text-[#DF6589FF] focus:text-[#DF6589FF] focus:scale-x-105"
              to="/signup"
              role="button"
            >
              Signup
            </Link>
          </form>
        ) : (
          <button
            className="hover:font-bold hover:text-[#DF6589FF] focus:text-[#DF6589FF] focus:scale-x-105"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
