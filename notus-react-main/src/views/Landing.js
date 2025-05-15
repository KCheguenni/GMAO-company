import React from "react";
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import Chatbot from "components/Chatbot.js";

export default function Landing() {
  return (
    <>
      <Navbar transparent />
      <main className="bg-blueGray-50 min-h-screen">
        {/* Sagemcom Support Main Section */}
        <section className="pt-16 pb-8 bg-white border-b border-blueGray-100">
          <div className="container mx-auto px-4 flex flex-col items-center text-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/7d/Sagemcom_logo.svg"
              alt="Sagemcom Logo"
              className="h-16 mb-4"
            />
            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4">
              Support Sagemcom
            </h1>
            <p className="text-lg text-blueGray-600 mb-6 max-w-2xl">
              Bienvenue sur le support officiel Sagemcom. Retrouvez guides
              d'utilisation, certificats CE, mises à jour, et assistance pour
              tous vos produits Sagemcom.
            </p>
          </div>
        </section>

        {/* Navigation for Product Categories */}
        <section className="py-8 bg-blueGray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* ... four category cards ... */}
            </div>
          </div>
        </section>

        {/* Main Help Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 flex flex-col items-center text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">
              Comment pouvons-nous vous aider ?
            </h2>
            <p className="text-blueGray-600 mb-6 max-w-xl">
              Utilisez la navigation ci-dessus pour accéder à la&nbsp;
              documentation, aux téléchargements, ou contactez notre support.
              Pour toute question, utilisez le chatbot en bas à droite.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <a
                href="https://support.sagemcom.com/fr/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg shadow transition"
              >
                Contacter le support
              </a>
              <a
                href="https://support.sagemcom.com/fr/a-propos-de"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg shadow transition"
              >
                À propos de Sagemcom
              </a>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="pb-20 relative block bg-blueGray-800">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              viewBox="0 0 2560 100"
            >
              <polygon
                className="text-blueGray-800 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
            <div className="flex flex-wrap text-center justify-center mb-24">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl font-semibold text-white">
                  Here are our heroes
                </h2>
                <p className="text-lg leading-relaxed m-4 text-blueGray-500">
                  According to the National Oceanic and Atmospheric
                  Administration, Ted, Scambos, NSIDC lead scientist, puts the
                  potentially record maximum…
                </p>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full md:w-6/12 lg:w-3/12 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src={require("assets/img/team-1-800x800.jpg").default}
                    className="shadow-lg rounded-full mx-auto max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Ryan Tompson</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      Web Developer
                    </p>
                    <div className="mt-6">
                      <button
                        className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-twitter"></i>
                      </button>
                      <button
                        className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-google"></i>
                      </button>
                      <button
                        className="bg-blueGray-700 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-instagram"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Jenna Kardi card fixed: removed stray "/>" */}
              <div className="w-full md:w-6/12 lg:w-3/12 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src={require("assets/img/team-2-800x800.jpg").default}
                    className="shadow-lg rounded-full mx-auto max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Jenna Kardi</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      Founder and CEO
                    </p>
                    <div className="mt-6">
                      <button
                        className="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-dribbble"></i>
                      </button>
                      <button
                        className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-google"></i>
                      </button>
                      <button
                        className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-twitter"></i>
                      </button>
                      <button
                        className="bg-blueGray-700 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-instagram"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Chatbot />
      <Footer />
    </>
  );
}
