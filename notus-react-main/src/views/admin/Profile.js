import React, { useEffect, useState, useRef } from "react";
import ProfilIcon from "../../assets/img/profile-icon.jpg";

const API_URL = "http://localhost:8089/PI/user/all";

function getAdminUser(users) {
  return users.find((u) => u.role?.toLowerCase() === "admin") || users[0] || null;
}

export default function Profile() {
  const [profile, setProfile] = useState({
    prenom: "",
    nom: "",
    email: "",
    role: "",
    numero: "",
    adresse: "",
    avatarFile: null,
    avatarPreview: "",
  });
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const fileInputRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Erreur lors du chargement des utilisateurs.");
        const users = await res.json();
        const admin = getAdminUser(users);
        if (!admin) throw new Error("Aucun administrateur trouvé.");
        const avatarUrl =
          admin.avatar ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            admin.prenom + " " + admin.nom
          )}&background=0066b2&color=fff&size=256`;
        setProfile({
          prenom: admin.prenom || admin.firstName || "",
          nom: admin.nom || admin.lastName || "",
          email: admin.email || "",
          role: admin.role || "",
          numero: admin.phoneNumber || admin.numero || "",
          adresse: admin.adress || admin.address || "",
          avatarFile: null,
          avatarPreview: avatarUrl,
          lastLogin: admin.lastLogin || "",
          createdAt: admin.createdAt || "",
        });
      } catch (err) {
        setMessage({ type: "error", text: err.message });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleEdit = () => {
    setEditMode(true);
    setMessage({});
  };

  const handleCancel = () => window.location.reload();

  const handleChange = (e) => {
    setProfile((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleFileClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile((p) => ({
        ...p,
        avatarFile: file,
        avatarPreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({});
    try {
      const usersRes = await fetch(API_URL);
      const users = await usersRes.json();
      const admin = getAdminUser(users);
      if (!admin) throw new Error("Impossible de trouver l'administrateur.");
      const url = `http://localhost:8089/PI/user/update/${admin.id}`;

      let options;
      if (profile.avatarFile) {
        const form = new FormData();
        form.append("firstName", profile.prenom);
        form.append("lastName", profile.nom);
        form.append("email", profile.email);
        form.append("phoneNumber", profile.numero);
        form.append("adress", profile.adresse);
        form.append("role", profile.role);
        form.append("avatar", profile.avatarFile);
        options = { method: "PUT", body: form };
      } else {
        const dto = {
          firstName: profile.prenom,
          lastName: profile.nom,
          email: profile.email,
          phoneNumber: profile.numero,
          adress: profile.adresse,
          role: profile.role,
        };
        options = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dto),
        };
      }

      const res = await fetch(url, options);
      if (!res.ok) {
        const err = await res.text();
        console.error(err);
        throw new Error("Erreur lors de la mise à jour du profil.");
      }
      setMessage({ type: "success", text: "Profil mis à jour !" });
      setEditMode(false);
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      {/* Existing Header Container */}
      <div className="relative flex flex-col min-w-0 mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0 -mt-20">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          {/* Header */}
          <div className="-mt-20 flex justify-center" style={{ marginTop: "50px" }}>
            <div className="relative">
              <img
                src={ProfilIcon}
                alt="Avatar"
                className="w-40 h-40 rounded-full border-4 border-white object-cover shadow-lg"
              />
              {editMode && (
                <button
                  onClick={handleFileClick}
                  className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
                  title="Changer l'avatar"
                >
                  <i className="fas fa-camera text-blue-800"></i>
                </button>
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          <div className="p-8">
            {/* Name & Role */}
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-gray-800">
                {profile.prenom} {profile.nom}
              </h1>
              <p className="text-gray-600 mt-1">{profile.role || 'Administrateur'}</p>
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap justify-center gap-6 mt-6 text-gray-700">
              <div className="flex items-center gap-2">
                <i className="fas fa-envelope text-blue-500"></i>
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-phone text-blue-500"></i>
                <span>{profile.numero}</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-map-marker-alt text-blue-500"></i>
                <span>{profile.adresse}</span>
              </div>
            </div>

        

            {/* Edit Form */}
            {!loading && (
              <div className="mt-8">
                <div className="flex justify-end space-x-4">
                  {!editMode ? (
                    <button
                      onClick={handleEdit}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                    >Modifier</button>
                  ) : (
                    <>
                      <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 disabled:opacity-50 transition"
                      >{saving ? '...' : 'Enregistrer'}</button>
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow hover:bg-gray-400 transition"
                      >Annuler</button>
                    </>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {['prenom','nom','email','role','numero','adresse'].map((f) => (
                    <div key={f}>
                      <label className="block text-sm font-medium text-gray-600 capitalize">{f}</label>
                      <input
                        name={f}
                        value={profile[f]}
                        onChange={handleChange}
                        disabled={!editMode}
                        className={`mt-1 block w-full px-4 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400 transition ${!editMode ? 'opacity-50 cursor-not-allowed' : ''}`}
                      />
                    </div>
                  ))}
                </div>

                {message.text && (
                  <div className={`mt-6 p-4 text-center rounded-lg ${message.type==='error' ? 'bg-red-100 text-red-700':'bg-green-100 text-green-700'}`}>{message.text}</div>
                )}
              </div>
            )}
            {loading && <p className="text-center py-10 text-gray-500">Chargement...</p>}
          </div>
        </div>
      </div>
    </main>
  );
}
