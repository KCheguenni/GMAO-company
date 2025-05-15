import React, { useState, useEffect } from "react";

function AddIntervention() {
  const [type, setType] = useState("CURATIVE");
  const [description, setDescription] = useState("");
  const [dateDemande, setDateDemande] = useState(new Date().toISOString().split("T")[0]);
  const [statut, setStatut] = useState("EN_ATTENTE");
  const [priorite, setPriorite] = useState("Moyenne");
  const [demandeurId, setDemandeurId] = useState("");
  const [demandeurs, setDemandeurs] = useState([]);
  const [panne, setPanne] = useState("");
  const [urgence, setUrgence] = useState(false);
  const [frequence, setFrequence] = useState("");
  const [prochainRDV, setProchainRDV] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8089/PI/user/all")
      .then((response) => response.json())
      .then((data) => {
        setDemandeurs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur :", error);
        setLoading(false);
        setMessage("Erreur lors du chargement des utilisateurs.");
      });
  }, []);

  const validateForm = () => {
    if (!demandeurId) return alert("Veuillez sélectionner un demandeur.");
    if (!description) return alert("Veuillez entrer une description.");
    if (type === "CURATIVE" && !panne) return alert("Veuillez entrer une panne.");
    if (type === "PREVENTIVE" && (!frequence || !prochainRDV)) {
      return alert("Veuillez entrer la fréquence et le prochain RDV.");
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const baseData = {
      description,
      dateDemande,
      statut,
      priorite,
      demandeurId: Number(demandeurId),
    };

    const intervention =
      type === "CURATIVE"
        ? { ...baseData, panne, urgence, type_demande: "CURATIVE" }
        : { ...baseData, frequence, prochainRDV, type_demande: "PREVENTIVE" };

    // 🔍 Affichage des données dans la console
    console.log("📋 Données à envoyer :", intervention);

    setLoading(true);
    setMessage("");

    fetch(`http://localhost:8089/PI/PI/demandes/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(intervention),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Erreur serveur");
        return response.json();
      })
      .then(() => {
        setMessage("✅ Intervention ajoutée avec succès !");
        resetForm();
      })
      .catch((err) => {
        console.error("Erreur lors de la création de l'intervention :", err);
        setMessage("❌ Une erreur s'est produite.");
      })
      .finally(() => setLoading(false));
  };

  const resetForm = () => {
    setDescription("");
    setStatut("EN_ATTENTE");
    setPanne("");
    setUrgence(false);
    setFrequence("");
    setProchainRDV("");
    setDemandeurId("");
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="rounded-t bg-white mb-0 px-6 py-6">
        <div className="text-center flex justify-between">
          <h6 className="text-blueGray-700 text-xl font-bold">Ajouter une intervention</h6>
        </div>
      </div>
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        {message && (
          <div className="mb-4 text-center font-semibold text-sm text-green-600">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Informations de l'intervention
          </h6>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                Type de demande
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="border-0 px-3 py-3 rounded text-sm shadow w-full"
              >
                <option value="CURATIVE">Curative</option>
                <option value="PREVENTIVE">Préventive</option>
              </select>
            </div>

            <div className="w-full lg:w-6/12 px-4">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                Demandeur
              </label>
              {loading ? (
                <p className="text-sm text-gray-500">Chargement des utilisateurs...</p>
              ) : (
                <select
                  value={demandeurId}
                  onChange={(e) => setDemandeurId(e.target.value)}
                  className="border-0 px-3 py-3 rounded text-sm shadow w-full"
                >
                  <option value="">-- Choisir un utilisateur --</option>
                  {demandeurs.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.firstName} {u.lastName} - {u.role}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="w-full lg:w-12/12 px-4 mt-4">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description de l'intervention"
                className="border-0 px-3 py-3 rounded text-sm shadow w-full"
              />
            </div>

            <div className="w-full lg:w-6/12 px-4 mt-4">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                Statut
              </label>
              <select
                value={statut}
                onChange={(e) => setStatut(e.target.value)}
                className="border-0 px-3 py-3 rounded text-sm shadow w-full"
              >
                <option value="EN_ATTENTE">En Attente</option>
                <option value="EN_COURS">En Cours</option>
                <option value="TERMINEE">Terminée</option>
              </select>
            </div>

            {type === "CURATIVE" && (
              <>
                <div className="w-full lg:w-6/12 px-4 mt-4">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Panne
                  </label>
                  <input
                    type="text"
                    value={panne}
                    onChange={(e) => setPanne(e.target.value)}
                    placeholder="Panne"
                    className="border-0 px-3 py-3 rounded text-sm shadow w-full"
                  />
                </div>
                <div className="w-full lg:w-6/12 px-4 mt-4 flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={urgence}
                    onChange={(e) => setUrgence(e.target.checked)}
                  />
                  <label className="text-blueGray-600 text-sm font-medium">Urgence</label>
                </div>
              </>
            )}

            {type === "PREVENTIVE" && (
              <>
                <div className="w-full lg:w-6/12 px-4 mt-4">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Fréquence
                  </label>
                  <input
                    type="text"
                    value={frequence}
                    onChange={(e) => setFrequence(e.target.value)}
                    placeholder="Hebdomadaire, Mensuelle..."
                    className="border-0 px-3 py-3 rounded text-sm shadow w-full"
                  />
                </div>
                <div className="w-full lg:w-6/12 px-4 mt-4">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Prochain RDV
                  </label>
                  <input
                    type="date"
                    value={prochainRDV}
                    onChange={(e) => setProchainRDV(e.target.value)}
                    className="border-0 px-3 py-3 rounded text-sm shadow w-full"
                  />
                </div>
              </>
            )}
          </div>

          <div className="text-right mt-6">
            <button
              type="submit"
              disabled={loading}
              className={`${loading ? "bg-gray-400" : "bg-lightBlue-500 hover:shadow-md"
                } text-white font-bold uppercase text-xs px-6 py-3 rounded shadow focus:outline-none transition-all duration-150`}
            >
              {loading ? "En cours..." : "Ajouter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddIntervention;
