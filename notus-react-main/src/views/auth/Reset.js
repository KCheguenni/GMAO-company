import React, { useState } from "react";
import { Link } from "react-router-dom";

// Reusable Modal component (copied for consistency)
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "15px",
          width: "400px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
          animation: "fadeIn 0.3s ease-in-out",
        }}
      >
        <div
          style={{
            fontSize: "48px",
            color: "#4caf50",
            marginBottom: "20px",
          }}
        >
          ✓
        </div>
        {children}
        <button
          onClick={onClose}
          style={{
            backgroundColor: "#003366",
            background: "linear-gradient(45deg, #003366, #00bcd4)",
            color: "#fff",
            border: "none",
            borderRadius: "25px",
            padding: "10px 30px",
            cursor: "pointer",
            marginTop: "20px",
            fontSize: "16px",
            fontWeight: "600",
            transition: "background 0.3s ease",
          }}
          onMouseEnter={e => (e.target.style.background = "linear-gradient(45deg, #00bcd4, #003366)")}
          onMouseLeave={e => (e.target.style.background = "linear-gradient(45deg, #003366, #00bcd4)")}
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

export default function Reset() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Veuillez entrer votre adresse e-mail.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setIsModalOpen(true);
      setEmail("");
    } catch (err) {
      setError("Erreur lors de la demande de réinitialisation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        {/* Modal for successful reset request */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 style={{ color: "#003366", marginBottom: "16px", fontFamily: "'Poppins', sans-serif" }}>
            Lien de réinitialisation envoyé !
          </h2>
          <p style={{ color: "#555", fontSize: "16px" }}>
            Vérifiez votre boîte mail pour continuer.
          </p>
        </Modal>
        <div className="flex content-center items-center justify-center min-h-screen">
          <div className="absolute top-0 left-0 w-full h-full bg-center bg-cover" style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
          }}>
            <span id="blackOverlay" className="w-full h-full absolute opacity-80 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400"></span>
          </div>
          <div className="w-full max-w-lg px-4 z-10 ">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
              <div className="flex-auto px-6 py-8">
                           <div className="flex flex-col items-center mb-4">
                             <Link to="/">
                               <span className="text-2xl font-extrabold leading-relaxed whitespace-nowrap uppercase tracking-wide bg-gradient-to-r from-blue-600 to-blue-300 bg-clip-text text-transparent mb-2" style={{ fontSize: "2rem" }}>
                                 SAGEMCOM
                               </span>
                             </Link>
                             </div>
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold mb-2 text-blue-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Réinitialiser le mot de passe
                  </h1>
                  <p className="text-gray-600">Entrez votre adresse e-mail pour recevoir un lien de réinitialisation.</p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Adresse e-mail
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-4 rounded-lg font-bold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800 focus:ring-blue-500"
                      }`}
                  >
                    {loading ? "Envoi en cours..." : "Envoyer le lien"}
                  </button>
                  {error && (
                    <div className="mt-4 text-red-500 text-center">
                      {error}
                    </div>
                  )}
                </form>
                <div className="mt-6 text-center">
                  <Link to="/auth/login" className="text-sm text-blue-600 hover:underline">
                    Se connecter
                  </Link>
                  <span className="mx-2 text-gray-400">|</span>
                  <Link to="/auth/register" className="text-sm text-blue-600 hover:underline">
                    Créer un compte
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}