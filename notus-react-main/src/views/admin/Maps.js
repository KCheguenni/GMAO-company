import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function Maps({ users = [] }) {
  const [events, setEvents] = useState([]); // Liste des événements (planning)
  const [selectedWorker, setSelectedWorker] = useState(""); // Utilisateur sélectionné
  const [startDate, setStartDate] = useState("2025-04-01T08:00");
  const [endDate, setEndDate] = useState("2025-04-01T17:00");
  const [description, setDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Utilisez directement les utilisateurs passés en prop
  const workers = users;

  // Fonction pour ajouter un événement
  const addEvent = () => {
    // Formatter les dates en format ISO 8601 (LocalDateTime)
    const formattedStartDate = moment(startDate).format("YYYY-MM-DDTHH:mm:ss");
    const formattedEndDate = moment(endDate).format("YYYY-MM-DDTHH:mm:ss");

    // Trouver l'utilisateur sélectionné
    const selectedWorkerData = workers.find(
      (worker) =>
        `${worker.nom} ${worker.prenom} - ${worker.role}` === selectedWorker
    );

    if (!selectedWorkerData) {
      setErrorMessage("Utilisateur non trouvé !");
      return;
    }

    // Vérifier que les dates sont valides
    if (!startDate || !endDate) {
      setErrorMessage("Veuillez saisir les dates de début et de fin.");
      return;
    }

    if (moment(startDate).isAfter(moment(endDate))) {
      setErrorMessage("La date de début ne peut pas être après la date de fin.");
      return;
    }

    // Créer l'objet à envoyer dans la requête POST
    const requestData = {
      user: { id: selectedWorkerData.id },
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      description: description,
    };

    // Envoyer la requête POST pour ajouter un planning
    fetch("http://localhost:8089/PI/planningHoraire/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Inclure le token JWT
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text || "Erreur lors de l'ajout de l'horaire");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Réponse de l'API: ", data);

        // Mettre à jour la liste des événements
        const newEvent = {
          title: selectedWorker,
          start: new Date(formattedStartDate),
          end: new Date(formattedEndDate),
          description: description,
          bgColor: "#f1c40f",
        };
        setEvents([...events, newEvent]);

        setSuccessMessage("Horaire ajouté avec succès !");
        setIsModalOpen(false);
        setErrorMessage("");
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de l'horaire:", error);
        setErrorMessage(error.message || "Une erreur s'est produite lors de l'ajout de l'horaire.");
      });
  };

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          minWidth: "0",
          wordWrap: "break-word",
          width: "100%",
          marginBottom: "1.5rem",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          borderRadius: "0.375rem",
          backgroundColor: "#ffffff",
        }}>
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              width: "100%",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              padding: "16px",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "16px",
                textAlign: "center",
              }}
            >
              Emploi du Temps des Travailleurs
            </h2>

            <div style={{ textAlign: "center", marginBottom: "16px" }}>
              <button
                style={{
                  backgroundColor: "#3498db",
                  color: "white",
                  padding: "10px 16px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  transition: "background 0.3s",
                }}
                onClick={() => setIsModalOpen(true)}
              >
                Ajouter un horaire
              </button>
            </div>

            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: "500px", zIndex: 1 }}
              eventPropGetter={(event) => ({
                style: {
                  backgroundColor: event.bgColor,
                  color: "white",
                  borderRadius: "6px",
                  padding: "5px",
                },
              })}
            />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "300px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3 style={{ textAlign: "center", marginBottom: "16px" }}>
              Ajouter un horaire
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <select
                value={selectedWorker}
                onChange={(e) => setSelectedWorker(e.target.value)}
                style={{
                  padding: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
              >
                <option value="">Sélectionnez un utilisateur</option>
                {workers.map((worker) => (
                  <option
                    key={worker.id}
                    value={`${worker.nom} ${worker.prenom} - ${worker.role}`}
                  >
                    {worker.nom} {worker.prenom} - {worker.role}
                  </option>
                ))}
              </select>
              <input
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={{
                  padding: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
              />
              <input
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                style={{
                  padding: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  padding: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
              />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  onClick={addEvent}
                  style={{
                    backgroundColor: "#4caf50",
                    color: "white",
                    padding: "8px 12px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    border: "none",
                  }}
                >
                  Ajouter
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    backgroundColor: "#f44336",
                    color: "white",
                    padding: "8px 12px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    border: "none",
                  }}
                >
                  Fermer
                </button>
              </div>
              {errorMessage && (
                <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
                  {errorMessage}
                </p>
              )}
              {successMessage && (
                <p style={{ color: "green", textAlign: "center", marginTop: "10px" }}>
                  {successMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}