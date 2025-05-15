import React from "react";
import { Link } from "react-router-dom";
import "./index.css"
import sagemcomlogo from '../../assets/img/sagemcom-logo-vector.png'
export default function Navbar(props) {
  return (
    <nav className="top-0 left-0 w-full z-50 fixed bg-white shadow-md flex flex-wrap items-center justify-between px-0 py-0 border-b border-blue-100">
      <div className="container mx-auto flex flex-wrap items-center justify-between py-2 px-4">
     <div className="flex items-center">
  <Link to="/" className="flex items-center">
    <img 
      src={sagemcomlogo} 
      alt="Logo" 
      className=" mr-3"
      style={{ width: "70px", height: "50px" }}  // Fixed size with right margin
    />
  <span className="text-lg font-extrabold leading-relaxed whitespace-nowrap uppercase tracking-wide 
                bg-gradient-to-r from-blue-600 to-blue-300 bg-clip-text text-transparent" style={{ fontSize: "1.5rem" }}>
  SAGEMCOM
</span>
  </Link>
</div>
        <div className="flex items-center gap-2">
          <Link to="/auth/login"
            className="bg-white border border-blue-600 text-blue-700 hover:bg-blue-50 hover:text-blue-900 text-base font-semibold px-4 py-2 rounded transition-colors duration-200">
            Se connecter
          </Link>
          <Link to="/auth/register"
            className="bg-blue-600 hover:bg-blue-700 border border-blue-600 text-white text-base font-semibold px-4 py-2 rounded transition-colors duration-200 ml-5">
            S'inscrire
          </Link>
        </div>
      </div>
    </nav>
  );
}