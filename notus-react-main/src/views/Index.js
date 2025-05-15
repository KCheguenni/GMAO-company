/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function Index() {
  return (
    <>
      <IndexNavbar fixed />
      {/* Hero Section */}
      <section className="header relative pt-24 flex h-screen max-h-860-px items-center justify-center">
        <div 
          className="absolute top-0 left-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
          }}
        >
          <span id="blackOverlay" className="w-full h-full absolute opacity-70 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400"></span>
        </div>
        <div className="container relative z-10 mx-auto px-4 flex flex-col items-center justify-center text-center">
          <h1 className="text-white font-extrabold text-5xl md:text-6xl drop-shadow-lg mb-6">
            Sagemcom : L'innovation au cœur du monde connecté
          </h1>
          <p className="mt-2 mb-8 text-xl text-white opacity-90 max-w-2xl mx-auto">
            Leader mondial dans les solutions hautes technologies pour la connectivité, l'énergie et l'industrie intelligente. Nous façonnons l'avenir avec passion, expertise et responsabilité.
          </p>
          <Link   to={{ 
    pathname: "/external-redirect",
    state: { to: "https://sagemcom.com/fr" } 
  }}
  onClick={(e) => {
    e.preventDefault();
    window.location.href = "https://sagemcom.com/fr";
  }} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full shadow-lg text-lg transition duration-200">
            Découvrez nos solutions
          </Link>
        </div>
      </section>

      {/* Valeurs Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-12">Nos Valeurs</h2>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <div className="flex-1 bg-blue-50 rounded-xl shadow-lg p-8 flex flex-col items-center">
              <div className="bg-blue-600 text-white rounded-full p-4 mb-4">
                <i className="fas fa-lightbulb text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-700">Innovation</h3>
              <p className="text-blueGray-600 text-center">Toujours à la pointe, nous investissons dans la R&D pour offrir des solutions disruptives et performantes.</p>
            </div>
            <div className="flex-1 bg-blue-50 rounded-xl shadow-lg p-8 flex flex-col items-center">
              <div className="bg-blue-600 text-white rounded-full p-4 mb-4">
                <i className="fas fa-award text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-700">Excellence</h3>
              <p className="text-blueGray-600 text-center">Notre exigence de qualité et notre savoir-faire sont reconnus à l’international.</p>
            </div>
            <div className="flex-1 bg-blue-50 rounded-xl shadow-lg p-8 flex flex-col items-center">
              <div className="bg-blue-600 text-white rounded-full p-4 mb-4">
                <i className="fas fa-leaf text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-700">Durabilité</h3>
              <p className="text-blueGray-600 text-center">Nous développons des produits responsables, respectueux de l’environnement et de la société.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 w-full mb-8 md:mb-0">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8ucRqKTGeKN7yUR7IxS-j_BfB0uJw3TCFrA&s" alt="Sagemcom Team" className="rounded-2xl shadow-xl w-full" />
          </div>
          <div className="md:w-1/2 w-full">
            <h2 className="text-3xl font-bold text-blue-700 mb-4">À propos de Sagemcom</h2>
            <p className="text-lg text-blueGray-700 mb-6">Sagemcom est un groupe industriel français leader mondial dans les solutions communicantes à haute valeur ajoutée (broadband, énergie, smart city, IoT). Notre mission : innover, connecter et rendre le monde plus intelligent et durable.</p>
            <Link to="/about" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-md text-base transition duration-200">
              En savoir plus
            </Link>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="mt-0 pb-20 relative bg-white">
        <div className="container mx-auto px-4 pt-16">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
              <div className="text-blueGray-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-blueGray-100">
                <i className="fas fa-microchip text-xl"></i>
              </div>
              <h3 className="text-3xl mb-2 font-semibold leading-normal">
                Un savoir-faire technologique reconnu
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-700">
                Depuis sa création, notre structure s'est imposée comme un acteur de référence en matière d'ingénierie électronique, de software embarqué et de production industrielle. Grâce à une vision à long terme et à un engagement constant pour l'innovation, nous sommes devenus l'un des grands opérateurs mondiaux.
              </p>
            </div>

            <div className="w-full md:w-6/12 px-4 mr-auto ml-auto mt-8 md:mt-0">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-blueGray-700">
                <img
                  alt="Sagemcom Technology"
                  className="w-full align-middle rounded-lg"
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality & Sustainability Section */}
      <section className="py-20 bg-blueGray-800 overflow-hidden">
        <div className="container mx-auto pb-64">
          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-5/12 px-12 md:px-4 ml-auto mr-auto md:mt-64">
              <div className="text-blueGray-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                <i className="fas fa-leaf text-xl"></i>
              </div>
              <h3 className="text-3xl mb-2 font-semibold leading-normal text-white">
                Un engagement fort pour la qualité et la durabilité
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-300">
                Sagemcom place la qualité, l'efficacité énergétique et l'innovation responsable au cœur de ses activités. Nous développons des produits durables, conformes aux normes internationales et intégrés dans une démarche d'économie circulaire.
              </p>
              <div className="flex mt-8">
                <div className="w-1/2 pr-4">
                  <div className="text-center">
                    <div className="text-white p-3 inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400">
                      <i className="fas fa-check"></i>
                    </div>
                    <h6 className="text-xl font-semibold text-white">Qualité</h6>
                    <p className="mt-2 mb-4 text-blueGray-300">
                      Certification ISO 9001
                    </p>
                  </div>
                </div>
                <div className="w-1/2 pl-4">
                  <div className="text-center">
                    <div className="text-white p-3 inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400">
                      <i className="fas fa-recycle"></i>
                    </div>
                    <h6 className="text-xl font-semibold text-white">Durabilité</h6>
                    <p className="mt-2 mb-4 text-blueGray-300">
                      Engagement environnemental
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-6/12 px-4 mr-auto ml-auto mt-32">
              <div className="relative flex flex-col min-w-0 w-full mb-6 mt-48 md:mt-0">
                <img
                  alt="Sagemcom Building"
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  className="w-full align-middle rounded-lg absolute shadow-lg max-w-100-px left-145-px -top-29-px z-3"
                />
                
                <img
                  alt="Sagemcom Innovation"
                  src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  className="w-full align-middle rounded-lg absolute shadow-2xl max-w-180-px -left-50-px top-225-px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Expertise Section */}
      <section className="relative block py-24 lg:pt-0 bg-blueGray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
            <div className="w-full lg:w-10/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white">
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <img
                      alt="Une expertise locale au service du global"
                      className="align-middle w-full h-full object-cover"
                      src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                    />
                  </div>
                  <div className="w-full lg:w-6/12 px-4 py-10 lg:py-20">
                    <div className="px-4">
                      <h3 className="text-3xl font-semibold">
                        Une expertise locale au service du global
                      </h3>
                      <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                        L'organisation matricielle de nos 5000 collaborateurs hautement qualifiés répartis entre les départements R&D, production et support technique. Ils jouent un rôle central dans la stratégie industrielle et technologique du groupe Sagemcom à l'échelle mondiale.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
