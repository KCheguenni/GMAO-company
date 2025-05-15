import React from "react";
import logo from "../../assets/img/sagemcom.png";
export default function Footer() {
  return (
    <footer className="relative bg-blue-900 text-white pt-12 pb-6">
      <div className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20" style={{ transform: "translateZ(0)" }}>
        <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
          <polygon className="text-blue-900 fill-current" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
      <div className="container mx-auto px-4 z-10 relative">
        <div className="flex flex-wrap lg:justify-between justify-center gap-8">
          {/* Company Info */}
          <div className="w-full lg:w-4/12 px-4 mb-8 lg:mb-0 flex flex-col items-center lg:items-start">
          <span className="text-lg font-extrabold leading-relaxed whitespace-nowrap uppercase tracking-wide 
                bg-gradient-to-r from-blue-500 to-blue-100 bg-clip-text text-transparent" style={{ fontSize: "1.5rem" }}>
  SAGEMCOM
</span>
            <p className="text-blue-100 mb-4 max-w-xs">
              Sagemcom est un leader mondial dans les solutions hautes technologies pour la connectivité, l'énergie et l'industrie intelligente. Nous innovons pour un monde plus connecté, plus durable et plus intelligent.
            </p>
            <div className="flex space-x-3 mt-2">
              <a href="https://www.linkedin.com/company/sagemcom/" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-700 hover:bg-blue-100 rounded-full p-2 shadow transition-colors">
                <i className="fab fa-linkedin-in text-xl"></i>
              </a>
              <a href="https://twitter.com/Sagemcom" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-700 hover:bg-blue-100 rounded-full p-2 shadow transition-colors">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="https://www.facebook.com/Sagemcom/" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-700 hover:bg-blue-100 rounded-full p-2 shadow transition-colors">
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="w-full lg:w-3/12 px-4 mb-8 lg:mb-0">
            <h5 className="uppercase mb-4 font-bold text-blue-200 tracking-wider">Liens rapides</h5>
            <ul className="space-y-2">
              <li><a href="/" className="hover:underline text-blue-100">Accueil</a></li>
              <li><a href="/about" className="hover:underline text-blue-100">À propos</a></li>
              <li><a href="/solutions" className="hover:underline text-blue-100">Solutions</a></li>
              <li><a href="/contact" className="hover:underline text-blue-100">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="w-full lg:w-4/12 px-4 flex flex-col items-center lg:items-start">
            <h5 className="uppercase mb-4 font-bold text-blue-200 tracking-wider">Contact</h5>
            <p className="mb-2 text-blue-100"><i className="fas fa-map-marker-alt mr-2"></i> 250, route de l'Empereur, 92500 Rueil-Malmaison, France</p>
            <p className="mb-2 text-blue-100"><i className="fas fa-envelope mr-2"></i> contact@sagemcom.com</p>
            <p className="mb-2 text-blue-100"><i className="fas fa-phone mr-2"></i> +33 (0)1 57 61 10 00</p>
          </div>
        </div>
        <hr className="my-6 border-blue-700 opacity-30" />
        <div className="flex flex-wrap items-center justify-center">
          <div className="w-full text-center">
            <span className="text-sm text-blue-200">&copy; {new Date().getFullYear()} Sagemcom. Tous droits réservés.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
