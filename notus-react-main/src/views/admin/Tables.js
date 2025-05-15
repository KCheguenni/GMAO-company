import React, { useState, useEffect } from "react";
import moment from "moment";

export default function WeeklySchedule() {
  const [users, setUsers] = useState([]); // Liste des utilisateurs
  const [selectedUserId, setSelectedUserId] = useState(null); // ID de l'utilisateur sélectionné
  const [startDate, setStartDate] = useState(""); // Date de début
  const [endDate, setEndDate] = useState(""); // Date de fin
  const [description, setDescription] = useState(""); // Description de l'événement
  const [showModal, setShowModal] = useState(false); // Contrôle l'affichage de la modale d'ajout
  const [events, setEvents] = useState([]); // Liste des événements
  const [errorMessage, setErrorMessage] = useState(""); // Message d'erreur
  const [successMessage, setSuccessMessage] = useState(""); // Message de succès
  const [showEventModal, setShowEventModal] = useState(false); // Contrôle l'affichage de la modale de modification
  const [currentEvent, setCurrentEvent] = useState(null); // Événement actuellement sélectionné
  const [isUpdateMode, setIsUpdateMode] = useState(false); // Mode de mise à jour

  // Récupérer tous les utilisateurs au chargement du composant
  useEffect(() => {
    fetch("http://localhost:8089/PI/user/all")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.error("Erreur lors de la récupération des utilisateurs :", error));
  }, []);

  // Récupérer tous les événements au chargement du composant
  useEffect(() => {
    fetchEvents();
  }, []);

  // Fonction pour récupérer les événements depuis le serveur
  const fetchEvents = () => {
    fetch("http://localhost:8089/PI/PI/planningHoraire/all")
      .then((response) => response.json())
      .then((data) => {
        const formattedEvents = data.map((event) => ({
          start: new Date(event.startDate), // Convertir en objet Date
          end: new Date(event.endDate), // Convertir en objet Date
          title: event.description, // Description de l'événement
          id: event.id, // ID de l'événement
          user: event.user, // Utilisateur associé
        }));
        setEvents(formattedEvents); // Mettre à jour la liste des événements
      })
      .catch((error) => console.error("Erreur lors de la récupération des événements :", error));
  };

  // Fonction pour ajouter un événement
  const handleSubmit = async () => {
    if (!selectedUserId) {
      setErrorMessage("Veuillez sélectionner un utilisateur.");
      return;
    }

    const formattedStartDate = new Date(startDate).toISOString(); // Formater la date de début
    const formattedEndDate = new Date(endDate).toISOString(); // Formater la date de fin

    if (!startDate || !endDate) {
      setErrorMessage("Veuillez saisir les dates de début et de fin.");
      return;
    }

    if (moment(startDate).isAfter(moment(endDate))) {
      setErrorMessage("La date de début ne peut pas être après la date de fin.");
      return;
    }

    const data = {
      user: { id: selectedUserId }, // ID de l'utilisateur
      startDate: formattedStartDate, // Date de début formatée
      endDate: formattedEndDate, // Date de fin formatée
      description: description, // Description de l'événement
    };

    try {
      const response = await fetch("http://localhost:8089/PI/PI/planningHoraire/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi des données.");
      }

      const result = await response.json(); // Réponse du serveur
      setSuccessMessage(result.message); // Afficher le message de succès

      // Rafraîchir la liste des événements après l'ajout
      fetchEvents();

      closeModal(); // Fermer la modale
    } catch (error) {
      setErrorMessage(error.message); // Afficher l'erreur
    }
  };

  // Fonction pour mettre à jour un événement
  const updateEvent = async () => {
    if (!currentEvent || !currentEvent.id) {
      setErrorMessage("Impossible de mettre à jour l'événement : ID invalide.");
      return;
    }

    const formattedStartDate = new Date(startDate).toISOString(); // Formater la date de début
    const formattedEndDate = new Date(endDate).toISOString(); // Formater la date de fin

    const data = {
      id: currentEvent.id, // ID de l'événement à mettre à jour
      startDate: formattedStartDate, // Nouvelle date de début
      endDate: formattedEndDate, // Nouvelle date de fin
      description: description, // Nouvelle description
      valid: true, // Statut de validation
    };

    try {
      const response = await fetch(`http://localhost:8089/PI/PI/planningHoraire/update/${currentEvent.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de l'événement.");
      }

      setSuccessMessage("Événement mis à jour avec succès !");

      // Rafraîchir la liste des événements après la mise à jour
      fetchEvents();

      closeModal(); // Fermer la modale
    } catch (error) {
      setErrorMessage(error.message); // Afficher l'erreur
    }
  };

  // Gérer le clic sur un événement
  const handleEventClick = (event) => {
    if (!event.id) {
      setErrorMessage("L'événement sélectionné n'a pas d'ID valide.");
      return;
    }
    setCurrentEvent(event); // Définir l'événement actuel
    setSelectedUserId(event.user?.id || null); // Définir l'utilisateur sélectionné
    setStartDate(moment(event.start).format("YYYY-MM-DDTHH:mm")); // Définir la date de début
    setEndDate(moment(event.end).format("YYYY-MM-DDTHH:mm")); // Définir la date de fin
    setDescription(event.title); // Définir la description
    setIsUpdateMode(true); // Passer en mode mise à jour
    setShowEventModal(true); // Afficher la modale de modification
  };

  // Fermer les modales et réinitialiser les états
  const closeModal = () => {
    setShowModal(false);
    setShowEventModal(false);
    setSelectedUserId(null);
    setStartDate("");
    setEndDate("");
    setDescription("");
    setErrorMessage("");
    setSuccessMessage("");
    setIsUpdateMode(false);
    setCurrentEvent(null);
  };

  // Fonction pour générer les horaires toutes les deux heures (de 00h00 à 23h59)
  const generateTimeSlots = () => {
    const timeSlots = [];
    for (let hour = 0; hour <= 23; hour += 2) {
      const startHour = hour < 10 ? "0" + hour : hour;
      const endHour = hour + 2 < 10 ? "0" + (hour + 2) : hour + 2;
      timeSlots.push(`${startHour}:00 - ${endHour}:00`);
    }
    return timeSlots;
  };

  // Fonction pour grouper les événements par jour et par créneau horaire
  const groupEventsByDayAndTime = () => {
    const daysOfWeek = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
    const timeSlots = generateTimeSlots();
    const groupedEvents = {};

    daysOfWeek.forEach((day) => {
      groupedEvents[day] = {};
      timeSlots.forEach((timeSlot) => {
        groupedEvents[day][timeSlot] = [];
      });
    });

    events.forEach((event) => {
      const dayOfWeek = moment(event.start).format("dddd"); // Récupérer le jour de la semaine
      const startHour = moment(event.start).hour();
      const timeSlot = `${Math.floor(startHour / 2) * 2}:00 - ${Math.floor(startHour / 2) * 2 + 2}:00`;

      if (groupedEvents[dayOfWeek] && groupedEvents[dayOfWeek][timeSlot]) {
        groupedEvents[dayOfWeek][timeSlot].push(event);
      }
    });

    return groupedEvents;
  };

  // Récupérer les événements groupés par jour et par créneau horaire
  const groupedEvents = groupEventsByDayAndTime();
  const timeSlots = generateTimeSlots();

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
              marginBottom: "24px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              padding: "16px",
            }}
          >
            <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px", textAlign: "center" }}>
              Emploi du Temps Hebdomadaire
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
                  transition: "background 0.3s ease",
                }}
                onClick={() => {
                  setShowModal(true);
                  setIsUpdateMode(false);
                }}
              >
                Ajouter un événement
              </button>
            </div>

            {/* Tableau de l'emploi du temps */}
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ border: "1px solid #ccc", padding: "10px" }}>Heure</th>
                    {Object.keys(groupedEvents).map((day) => (
                      <th key={day} style={{ border: "1px solid #ccc", padding: "10px" }}>
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((timeSlot) => (
                    <tr key={timeSlot}>
                      <td style={{ border: "1px solid #ccc", padding: "10px" }}>{timeSlot}</td>
                      {Object.keys(groupedEvents).map((day) => (
                        <td key={day} style={{ border: "1px solid #ccc", padding: "10px" }}>
                          {groupedEvents[day][timeSlot].map((event) => (
                            <div
                              key={event.id}
                              style={{
                                backgroundColor: "#f0f0f0",
                                padding: "8px",
                                borderRadius: "6px",
                                marginBottom: "8px",
                                cursor: "pointer",
                              }}
                              onClick={() => handleEventClick(event)}
                            >
                              <strong>{event.title}</strong>
                              <br />
                              {moment(event.start).format("HH:mm")} - {moment(event.end).format("HH:mm")}
                            </div>
                          ))}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal pour ajouter ou mettre à jour un événement */}
      {(showModal || showEventModal) && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", width: "400px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
            <h3 style={{ textAlign: "center", marginBottom: "16px" }}>
              {isUpdateMode ? "Modifier l'événement" : "Ajouter un événement"}
            </h3>
            <div style={{ marginBottom: "10px" }}>
              <label>Sélectionnez un utilisateur :</label>
              <select
                style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }}
                onChange={(e) => setSelectedUserId(Number(e.target.value))}
                value={selectedUserId || ""}
              >
                <option value="">Choisissez un utilisateur</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.firstName} {user.lastName} - {user.role}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>Date de début :</label>
              <input
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>Date de fin :</label>
              <input
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>Description :</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }}
              />
            </div>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            <div style={{ textAlign: "center" }}>
              <button
                onClick={isUpdateMode ? updateEvent : handleSubmit}
                style={{
                  backgroundColor: "#28a745",
                  color: "white",
                  padding: "10px 16px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.3s ease",
                }}
              >
                {isUpdateMode ? "Mettre à jour" : "Ajouter"}
              </button>
              <button
                onClick={closeModal}
                style={{
                  backgroundColor: "#ccc",
                  color: "white",
                  padding: "10px 16px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.3s ease",
                  marginLeft: "10px",
                }}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}