import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

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

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    phoneNumber: "",
    address: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.role ||
      !formData.phoneNumber ||
      !formData.address
    ) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const params = new URLSearchParams({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
    }).toString();

    const apiUrl = `http://localhost:8089/PI/user/register/Admin?${params}`;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'inscription.");
      }

      const result = await response.json();
      console.log("Réponse de l'API :", result);
      setIsModalOpen(true);

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "",
        phoneNumber: "",
        address: "",
      });
    } catch (error) {
      console.error("Erreur :", error);
      setError("Une erreur s'est produite lors de l'inscription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center min-h-screen">
          <div className="absolute top-0 left-0 w-full h-full bg-center bg-cover" style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
          }}>
            <span id="blackOverlay" className="w-full h-full absolute opacity-80 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400"></span>
          </div>
          <div className="w-full max-w-lg px-4 z-10">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-2xl rounded-2xl bg-white border border-blue-100 bg-opacity-95">
              <div className="rounded-t mb-0 px-6 py-6 bg-white bg-opacity-90">
                <div className="flex flex-col items-center mb-4">
                  <Link to="/">
                    <span className="text-2xl font-extrabold leading-relaxed whitespace-nowrap uppercase tracking-wide bg-gradient-to-r from-blue-600 to-blue-300 bg-clip-text text-transparent mb-2" style={{ fontSize: "2rem" }}>
                      SAGEMCOM
                    </span>
                  </Link>
                  <h1 className="text-blue-900 font-bold text-2xl mb-1" style={{ fontFamily: "'Poppins', 'Roboto', sans-serif" }}>
                    Bienvenue chez Sagemcom
                  </h1>
                  <p className="text-blueGray-600 text-base mb-0 text-center" style={{ fontFamily: "'Poppins', 'Roboto', sans-serif" }}>
                    Créez votre compte administrateur pour accéder <br/> à la plateforme
                  </p>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Prénom</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Prénom"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Nom</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nom"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="votre@email.com"
                      required
                    />
                  </div>

                  <div className="mb-4 relative">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Mot de passe</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
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

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Rôle</label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="" disabled>Sélectionnez un rôle</option>
                      <option value="ADMIN">Admin</option>
                      <option value="MAGASINIER">Magasinier</option>
                      <option value="CHEF_PROJET">Chef de Projet</option>
                      <option value="TECHNICIEN_CURATIF">Technicien Curatif</option>
                      <option value="TECHNICIEN_PREVENTIF">Technicien Préventif</option>
                      <option value="CHEF_SECTEUR">Chef de Secteur</option>
                      <option value="SUPERVISEUR_PRODUCTION">Superviseur de Production</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Numéro de téléphone</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Numéro de téléphone"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Adresse</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Adresse"
                      required
                    />
                  </div>

                  <div className="mb-6 flex items-center">
                    <input
                      id="customCheckLogin"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      required
                    />
                    <label htmlFor="customCheckLogin" className="ml-2 block text-sm text-gray-700">
                      J'accepte la{' '}
                      <a href="#pablo" className="text-blue-600 hover:underline" onClick={e => e.preventDefault()}>
                        Politique de confidentialité
                      </a>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-4 rounded-lg font-bold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800 focus:ring-blue-500"
                    }`}
                  >
                    {loading ? 'En cours...' : 'Créer un compte'}
                  </button>

                  {error && (
                    <div className="mt-4 text-red-500 text-center">
                      {error}
                    </div>
                  )}
                </form>
                <div className="mt-6 text-center">
  <p className="text-sm text-gray-600">
    Vous avez déjà un compte ?{" "}
    <Link
      to="/auth/login"
      className="text-blue-600 hover:underline"
    >
      Se connecter
    </Link>
  </p>
</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}