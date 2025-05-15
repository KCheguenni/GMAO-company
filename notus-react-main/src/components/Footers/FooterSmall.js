import React from "react";
import { Link } from "react-router-dom";
export default function FooterSmall(props) {
  return (
    <footer
      className={
        (props.absolute
          ? "absolute w-full bottom-0 bg-blue-900"
          : "relative bg-blue-900") + " pb-3 pt-3 text-white"
      }
      style={{ fontSize: '0.95rem' }}
    >
      <div className="container mx-auto px-4 flex flex-col items-center justify-center">
        <Link to="/">
        <span className="font-extrabold tracking-wide uppercase bg-gradient-to-r from-blue-500 to-blue-100 bg-clip-text text-transparent mb-1" style={{ fontSize: "1.2rem" }}>
          SAGEMCOM
        </span>
        </Link>
        <span className="text-blue-200 text-xs">&copy; {new Date().getFullYear()} Sagemcom. Tous droits réservés.</span>
      </div>
    </footer>
  );
}
