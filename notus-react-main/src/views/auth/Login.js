import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

// Reusable Modal component (copied from Register.js for consistency)
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
          ✔️
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
          onMouseEnter={(e) =>
            (e.target.style.background = "linear-gradient(45deg, #00bcd4, #003366)")
          }
          onMouseLeave={(e) =>
            (e.target.style.background = "linear-gradient(45deg, #003366, #00bcd4)")
          }
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    setError("Veuillez remplir tous les champs.");
    return;
  }

  setLoading(true);
  setError(null);

  try {
    const response = await fetch("http://localhost:8089/PI/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Utilise le message d'erreur du backend si disponible
      throw new Error(data.error || "Email ou mot de passe incorrect.");
    }

    // Stockage du token et des infos utilisateur
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    // Redirection basée sur le rôle
    if (data.user.role === 'ADMIN') {
      history.push('/admin');
    } else {
      history.push('/dashboard');
    }

    // Ouvre le modal si tu veux
    setIsModalOpen(true);

  } catch (error) {
    console.error("Erreur :", error);
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
  return (
    <>
      <div className="container mx-auto px-4 h-full">
      {/* Modal for successful login */}
      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); history.push('/admin'); }}>
        <h2 style={{ color: "#003366", marginBottom: "16px", fontFamily: "'Poppins', sans-serif" }}>
          Connexion réussie !
        </h2>
      </Modal>
        <div className="flex content-center items-center justify-center min-h-screen">
          <div className="absolute top-0 left-0 w-full h-full bg-center bg-cover" style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
          }}>
            <span id="blackOverlay" className="w-full h-full absolute opacity-80 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400"></span>
          </div>
          <div className="w-full max-w-lg px-4 z-10 ">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-2xl rounded-2xl bg-white border border-blue-100 bg-opacity-95">
              <div className="rounded-t mb-0 px-6 py-6 bg-white bg-opacity-90">
                <div className="flex flex-col items-center mb-4">
                  <Link to="/">
                    <span className="text-2xl font-extrabold leading-relaxed whitespace-nowrap uppercase tracking-wide bg-gradient-to-r from-blue-600 to-blue-300 bg-clip-text text-transparent mb-2" style={{ fontSize: "2rem" }}>
                      SAGEMCOM
                    </span>
                  </Link>
                  <h1 className="text-blue-900 font-bold text-2xl mb-1" style={{ fontFamily: "'Poppins', 'Roboto', sans-serif" }}>
                    Connectez-vous à votre espace
                  </h1>
                  <p className="text-blueGray-600 text-base mb-0" style={{ fontFamily: "'Poppins', 'Roboto', sans-serif" }}>
                    Accédez à vos services et outils en toute simplicité
                  </p>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>

              <div className="px-6 pb-8">
                <form onSubmit={handleSubmit}>
                  {/* Email Field */}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="votre@email.com"
                      required
                    />
                  </div>

                  {/* Password Field */}
                  <div className="mb-6 relative">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Mot de passe
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-10 text-gray-500"
                      tabIndex={-1}
                    >
                      {showPassword ? "👁️" : "👁️‍🗨️"}
                    </button>
                  </div>

                  {/* Remember Me */}
                  <div className="mb-6 flex items-center">
                    <input
                      id="rememberMe"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                      Se souvenir de moi
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-4 rounded-lg font-bold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-700 hover:bg-blue-800 focus:ring-blue-500"
                    }`}
                  >
                    {loading ? "Connexion en cours..." : "Se connecter"}
                  </button>

                  {/* Error Message */}
                  {error && (
                    <div className="mt-4 text-red-500 text-center">
                      {error}
                    </div>
                  )}
                </form>

                {/* Links */}
                <div className="mt-6 text-center">
                  <Link
                    to="/auth/password_reset"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Mot de passe oublié ?
                  </Link>
                  <p className="mt-2 text-sm text-gray-600">
                    Pas encore de compte ?{" "}
                    <Link
                      to="/auth/register"
                      className="text-blue-600 hover:underline"
                    >
                      Créer un compte
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="text-blueGray-200"
                >
                
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
