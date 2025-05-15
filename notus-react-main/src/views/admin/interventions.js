import React, { useState, useEffect } from "react";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Constantes
const API_URL = "http://localhost:8089/PI/PI/demandes/recuperer/all";
const API_ADD_OR_UPDATE = "http://localhost:8089/PI/PI/demandes/addOrUpdate";
const API_DELETE = "http://localhost:8089/PI/PI/demandes/delete";
const API_SEARCH = "http://localhost:8089/PI/PI/demandes/search";
const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20];

// Icônes SVG pour Précédent et Suivant
const PreviousIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{ height: "1.25rem", width: "1.25rem" }}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

const NextIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{ height: "1.25rem", width: "1.25rem" }}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l4 4a1 1 0 01-1.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

// Icônes SVG pour Modifier et Supprimer
const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{ height: "1.25rem", width: "1.25rem" }}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
  </svg>
);

const DeleteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{ height: "1.25rem", width: "1.25rem" }}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
      clipRule="evenodd"
    />
  </svg>
);

// Composant Modal
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
          padding: "20px",
          borderRadius: "8px",
          width: "600px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

// Composant pour afficher la table
const Table = ({ data, currentPage, itemsPerPage, indexOfFirstItem, indexOfLastItem, onEdit, onDelete }) => {
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <table style={{ width: "100%", backgroundColor: "transparent", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={{ backgroundColor: "#ffffff", color: "#4a5568", border: "1px solid #e2e8f0", padding: "12px", textAlign: "left", fontSize: "0.75rem", fontWeight: "600", textTransform: "uppercase" }}>
            Type Demande
          </th>
          <th style={{ backgroundColor: "#ffffff", color: "#4a5568", border: "1px solid #e2e8f0", padding: "12px", textAlign: "left", fontSize: "0.75rem", fontWeight: "600", textTransform: "uppercase" }}>
            ID
          </th>
          <th style={{ backgroundColor: "#ffffff", color: "#4a5568", border: "1px solid #e2e8f0", padding: "12px", textAlign: "left", fontSize: "0.75rem", fontWeight: "600", textTransform: "uppercase" }}>
            Date Demande
          </th>
          <th style={{ backgroundColor: "#ffffff", color: "#4a5568", border: "1px solid #e2e8f0", padding: "12px", textAlign: "left", fontSize: "0.75rem", fontWeight: "600", textTransform: "uppercase" }}>
            Description
          </th>
          <th style={{ backgroundColor: "#ffffff", color: "#4a5568", border: "1px solid #e2e8f0", padding: "12px", textAlign: "left", fontSize: "0.75rem", fontWeight: "600", textTransform: "uppercase" }}>
            Priorité
          </th>
          <th style={{ backgroundColor: "#ffffff", color: "#4a5568", border: "1px solid #e2e8f0", padding: "12px", textAlign: "left", fontSize: "0.75rem", fontWeight: "600", textTransform: "uppercase" }}>
            Statut
          </th>
          <th style={{ backgroundColor: "#ffffff", color: "#4a5568", border: "1px solid #e2e8f0", padding: "12px", textAlign: "left", fontSize: "0.75rem", fontWeight: "600", textTransform: "uppercase" }}>
            Panne
          </th>
          <th style={{ backgroundColor: "#ffffff", color: "#4a5568", border: "1px solid #e2e8f0", padding: "12px", textAlign: "left", fontSize: "0.75rem", fontWeight: "600", textTransform: "uppercase" }}>
            Urgence
          </th>
          <th style={{ backgroundColor: "#ffffff", color: "#4a5568", border: "1px solid #e2e8f0", padding: "12px", textAlign: "left", fontSize: "0.75rem", fontWeight: "600", textTransform: "uppercase" }}>
            Fréquence
          </th>
          <th style={{ backgroundColor: "#ffffff", color: "#4a5568", border: "1px solid #e2e8f0", padding: "12px", textAlign: "left", fontSize: "0.75rem", fontWeight: "600", textTransform: "uppercase" }}>
            Prochain RDV
          </th>
          <th style={{ backgroundColor: "#ffffff", color: "#4a5568", border: "1px solid #e2e8f0", padding: "12px", textAlign: "left", fontSize: "0.75rem", fontWeight: "600", textTransform: "uppercase" }}>
            Demandeur
          </th>
          <th style={{ backgroundColor: "#ffffff", color: "#4a5568", border: "1px solid #e2e8f0", padding: "12px", textAlign: "center", fontSize: "0.75rem", fontWeight: "600", textTransform: "uppercase" }}>
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {currentItems.map((item, index) => (
          <tr key={index} onClick={() => console.log(item)} style={{ cursor: "pointer" }}>

            <td style={{ border: "1px solid #e2e8f0", padding: "12px", textAlign: "left", fontSize: "0.75rem" }}>
              {item.typeDemande}
            </td>
            <td style={{ border: "1px solid #e2e8f0", padding: "12px", textAlign: "left", fontSize: "0.75rem" }}>
              {item.id}
            </td>
            <td style={{ border: "1px solid #e2e8f0", padding: "12px", textAlign: "left", fontSize: "0.75rem" }}>
              {new Date(item.dateDemande).toLocaleDateString()}
            </td>
            <td style={{ border: "1px solid #e2e8f0", padding: "12px", textAlign: "left", fontSize: "0.75rem" }}>
              {item.description}
            </td>
            <td style={{ border: "1px solid #e2e8f0", padding: "12px", textAlign: "left", fontSize: "0.75rem" }}>
              {item.priorite}
            </td>
            <td style={{ border: "1px solid #e2e8f0", padding: "12px", textAlign: "left", fontSize: "0.75rem" }}>
              {item.statut}
            </td>
            <td style={{ border: "1px solid #e2e8f0", padding: "12px", textAlign: "left", fontSize: "0.75rem" }}>
              {item.panne}
            </td>
            <td style={{ border: "1px solid #e2e8f0", padding: "12px", textAlign: "left", fontSize: "0.75rem" }}>
              {item.urgence?.toString()}
            </td>

            <td style={{ border: "1px solid #e2e8f0", padding: "12px", textAlign: "left", fontSize: "0.75rem" }}>
              {item.frequence}
            </td>
            <td style={{ border: "1px solid #e2e8f0", padding: "12px", textAlign: "left", fontSize: "0.75rem" }}>
              {item.prochainRDV ? new Date(item.prochainRDV).toLocaleDateString() : 'N/A'}
            </td>
            <td style={{ border: "1px solid #e2e8f0", padding: "12px", textAlign: "left", fontSize: "0.75rem" }}>
              {item.demandeurId}
            </td>
            <td style={{ border: "1px solid #e2e8f0", padding: "12px", textAlign: "center", fontSize: "0.75rem" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  onClick={() => onEdit(item)}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    marginRight: "8px",
                  }}
                >
                  <EditIcon />
                </button>
                <button
                  onClick={() => onDelete(item)}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <DeleteIcon />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Composant pour la carte de recherche et d'ajout
const SearchAndAddCard = ({ onAddDemande, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    onSearch(searchTerm);
  }, [searchTerm, onSearch]);

  return (
    <div
      style={{
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
      }}
    >
      <div
        style={{
          borderRadius: "0.375rem 0.375rem 0 0",
          marginBottom: "0",
          padding: "1.5rem",
          border: "0",
          backgroundColor: "#f7fafc",
        }}
      >
        {/* TODO: Ajouter le contenu de la carte de recherche et d'ajout */}
      </div>
    </div>
  );
};

// Composant principal
const Interventions = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDemande, setSelectedDemande] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [demandeToDelete, setDemandeToDelete] = useState(null);

  //   // Fonction pour générer et imprimer le PDF
  //   const handlePrintPDF = () => {
  //     try {
  //        const doc = new jsPDF();
  //         const primaryColor = [0, 51, 102]; // #003366 in RGB
  //         const secondaryColor = [200, 200, 200]; // Light gray

  //       // Configuration du document
  //     doc.setFontSize(18);
  //         doc.setTextColor(...primaryColor);
  //         doc.setFont("helvetica", "bold");
  //         doc.text("SAGEMCOM - Liste des Interventions", 14, 22);

  //         // Subheader
  //         doc.setFontSize(10);
  //         doc.setTextColor(100, 100, 100);
  //         doc.setFont("helvetica", "normal");
  //         doc.text("Imprimé le: " + new Date().toLocaleDateString(), 14, 30);

  //       // Préparation des données de la table courante
  //       const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  //       // Génération de la table dans le PDF - Version simplifiée
  //       const tableColumn = ["Type", "ID", "Date", "Description", "Priorité", "Statut", "Panne", "Urgence", "Fréquence", "Prochain RDV", "Demandeur"];
  //       const tableRows = [];

  //       // Ajout des données au tableau
  //       currentItems.forEach(item => {
  //         const rowData = [
  //           item.typeDemande || "",
  //           item.id || "",
  //           item.dateDemande ? new Date(item.dateDemande).toLocaleDateString() : "",
  //           item.description || "",
  //           item.priorite || "",
  //           item.statut || "",
  //           item.panne || "",
  //           item.urgence ? "Oui" : "Non",
  //           item.frequence || "",
  //           item.prochainRDV ? new Date(item.prochainRDV).toLocaleDateString() : "-",
  //           item.demandeurId || item.demandeur || ""
  //         ];
  //         tableRows.push(rowData);
  //       });

  //       // Génération de la table
  //       autoTable(doc, {
  //         head: [tableColumn],
  //         body: tableRows,
  //         startY: 35,
  //         theme: 'grid',
  //         styles: { fontSize: 8, cellPadding: 3 },
  //         headStyles: {   fillColor: primaryColor, // Seul changement: couleur header
  //                 textColor: [255, 255, 255],
  //                 fontStyle: "bold" },
  //                     didDrawPage: (data) => {
  //                 // Footer
  //                 doc.setFontSize(8);
  //                 doc.setTextColor(100, 100, 100);
  //                 doc.text(
  //                     `Page ${data.pageNumber} sur ${doc.internal.getNumberOfPages()} • ${new Date().toLocaleDateString()}`,
  //                     data.settings.margin.left,
  //                     doc.internal.pageSize.height - 10
  //                 );
  //             }
  //         });

  //         doc.save(`SAGEMCOM_Interventions_${new Date().toISOString().split('T')[0]}.pdf`);
  //     } catch (error) {
  //         console.error("Erreur de génération PDF:", error);
  //     }
  // };

  // const handlePrintPDF = () => {
  //     try {
  //         const doc = new jsPDF();
  //         const primaryColor = [0, 51, 102]; // Couleur Sagemcom #003366

  //         // En-tête
  //         doc.setFont("helvetica", "bold");
  //         doc.setFontSize(18);
  //         doc.setTextColor(...primaryColor);
  //         doc.text("SAGEMCOM - Liste des Interventions", 14, 15);

  //         // Sous-titre
  //         doc.setFontSize(10);
  //         doc.setTextColor(100, 100, 100);
  //         doc.setFont("helvetica", "normal");
  //         doc.text(`Imprimé le: ${new Date().toLocaleDateString()}`, 14, 25);

  //         // Configuration du tableau
  //         autoTable(doc, {
  //             head: [["Type", "ID", "Date", "Description", "Priorité", "Statut", "Panne", "Urgence", "Fréquence", "Prochain RDV", "Demandeur"]],
  //             body: data.map(item => [
  //                 item.typeDemande || "-",
  //                 item.id?.toString() || "000",
  //                 item.dateDemande ? new Date(item.dateDemande).toLocaleDateString() : "-",
  //                 item.description || "-",
  //                 item.priorite || "-",
  //                 item.statut?.replace(/_/g, ' ') || "-",
  //                 item.panne || "-",
  //                 item.urgence ? "Oui" : "Non",
  //                 item.frequence || "-",
  //                 item.prochainRDV ? new Date(item.prochainRDV).toLocaleDateString() : "-",
  //                 item.demandeurId || item.demandeur || "-"
  //             ]),
  //             startY: 30,
  //             theme: 'grid',
  //             headStyles: {
  //                 fillColor: primaryColor,
  //                 textColor: [255, 255, 255],
  //                 fontStyle: 'bold'
  //             },
  //             styles: {
  //                 fontSize: 9,
  //                 cellPadding: 3,
  //                 halign: 'center'
  //             },
  //             columnStyles: {
  //                 0: { cellWidth: 10 },
  //                 1: { cellWidth: 5 },
  //                 2: { cellWidth: 5 },
  //                 3: { cellWidth: 45 },
  //                 4: { cellWidth: 20 },
  //                 7: { cellWidth: 20 }
  //             },
  //             didDrawPage: (data) => {
  //                 // Pied de page
  //                 doc.setFontSize(8);
  //                 doc.text(
  //                     `Page ${data.pageNumber} • ${new Date().toLocaleDateString()}`,
  //                     data.settings.margin.left,
  //                     doc.internal.pageSize.height - 10
  //                 );
  //             }
  //         });

  //         doc.save(`SAGEMCOM_Interventions_${new Date().toISOString().split('T')[0]}.pdf`);
  //     } catch (error) {
  //         console.error("Erreur PDF:", error);
  //     }
  // };


  const handlePrintPDF = () => {
    try {
      const doc = new jsPDF({
        orientation: 'portrait' // or 'landscape' if needed
      });
      const primaryColor = [0, 51, 102]; // Sagemcom blue

      // Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(...primaryColor);
      doc.text("LISTE DES INTERVENTIONS", 105, 15, { align: "center" });

      // Date
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text("Généré le: " + new Date().toLocaleDateString(), 14, 25);

      // Table configuration with exact 180 width
      const columnWidths = {
        0: 25,  // TYPE DEMANDE
        1: 10,   // ID
        2: 20,   // DATE DEMANDE
        3: 50,   // DESCRIPTION
        4: 15,   // PRIORITÉ
        5: 15,   // STATUT
        6: 20,   // PANNE
        7: 10,   // URGENCE
        8: 10,   // FRÉQUENCE
        9: 5     // PT
      };
      // Sum should equal 180 (25+10+20+50+15+15+20+10+10+5 = 180)

      doc.autoTable({
        head: [[
          "TYPE DEMANDE", "DATE DEMANDE", "DESCRIPTION",
          "PRIORITÉ", "STATUT", "PANNE", "URGENCE", "FRÉQUENCE", "Prochain RDV",
        ]],
        body: data.map(item => [
          item.typeDemande || "-",
          item.dateDemande ? new Date(item.dateDemande).toLocaleDateString() : "-",
          item.description || "-",
          item.priorite || "-",
          item.statut?.replace("_", " ") || "-",
          item.panne || "-",
          item.urgence ? "OUI" : "NON",
          item.frequence || "N/A",
          item.prochainRDV ? new Date(item.prochainRDV).toLocaleDateString() : "-",

        ]),
        startY: 30,
        margin: { horizontal: (doc.internal.pageSize.width - 200) / 2 }, // Center table
        tableWidth: 200,
        styles: {
          fontSize: 8,
          cellPadding: 2,
          overflow: 'linebreak'
        },
        headStyles: {
          fillColor: primaryColor,
          textColor: [255, 255, 255],
          fontStyle: 'bold'
        },
        columnStyles: columnWidths,
        didDrawPage: (data) => {
          doc.setFontSize(7);
          doc.text(
            `Page ${data.pageNumber}`,
            data.settings.margin.left,
            doc.internal.pageSize.height - 5
          );
        }
      });

      doc.save(`SAGEMCOM_interventions_${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (error) {
      console.error("PDF generation error:", error);
    }
  };


  const fetchData = () => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur de récupération des données");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const handleSearch = async (searchTerm) => {
    if (!searchTerm) {
      fetchData();
      return;
    }

    try {
      const response = await fetch(`${API_SEARCH}?description=${searchTerm}`);
      if (!response.ok) {
        throw new Error("Erreur lors de la recherche");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
      setError("Une erreur s'est produite lors de la recherche. Veuillez réessayer.");
    }
  };

  const handleSave = async (demandeData) => {
    try {
      const response = await fetch(API_ADD_OR_UPDATE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(demandeData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout ou de la mise à jour de la demande");
      }

      const result = await response.json();
      console.log("Succès :", result);
      fetchData();
      closeModal();
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  const handleDelete = async () => {
    if (demandeToDelete) {
      try {
        const response = await fetch(`${API_DELETE}/${demandeToDelete.id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la suppression de la demande");
        }

        console.log("Demande supprimée avec succès");
        fetchData();
        closeDeleteModal();
      } catch (error) {
        console.error("Erreur :", error);
      }
    }
  };

  const openAddModal = () => {
    setSelectedDemande(null);
    setIsModalOpen(true);
  };

  const openEditModal = (demande) => {
    setSelectedDemande(demande);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDemande(null);
  };

  const openDeleteModal = (demande) => {
    setDemandeToDelete(demande);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDemandeToDelete(null);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Calculate pagination variables at component level for use in both render and functions
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  return (
    <div
      style={{
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
      }}
    >
      <div
        style={{
          borderRadius: "0.375rem 0.375rem 0 0",
          marginBottom: "0",
          padding: "1.5rem",
          border: "0",
          backgroundColor: "#f7fafc",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div style={{ flex: "1" }}>
          <h3
            style={{
              color: "#003366",
              fontSize: "1.5rem",
              fontWeight: "600",
              paddingBottom: "0.5rem",
              margin: "0"
            }}
          >
            Liste des Demandes d'Intervention
          </h3>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <button
            onClick={handlePrintPDF}
            style={{
              backgroundColor: "#003366",
              color: "#ffffff",
              border: "none",
              borderRadius: "0.375rem",
              padding: "0.5rem 1rem",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "1rem",
              transition: "background-color 0.3s ease",
              display: "flex",
              alignItems: "center"
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#002244"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#003366"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: "0.5rem" }}>
              <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2H5zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1z" />
              <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2V7zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
            </svg>
            Imprimer
          </button>
        </div>
      </div>
      <SearchAndAddCard onAddDemande={openAddModal} onSearch={handleSearch} />

      {/* Bouton Imprimer */}


      <div style={{ display: "block", width: "100%", overflowX: "auto" }}>
        <Table
          data={data}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          indexOfFirstItem={indexOfFirstItem}
          indexOfLastItem={indexOfLastItem}
          onEdit={openEditModal}
          onDelete={openDeleteModal}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#ffffff",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", marginRight: "1rem" }}>
            <span style={{ marginRight: "0.5rem", fontSize: "0.875rem" }}>Items par page:</span>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              style={{
                fontSize: "0.875rem",
                padding: "0.375rem 0.75rem",
                borderRadius: "0.375rem",
                border: "1px solid #e2e8f0",
              }}
            >
              {ITEMS_PER_PAGE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", alignItems: "center", marginRight: "1rem", fontSize: "0.875rem" }}>
            <span>
              {indexOfFirstItem + 1} – {Math.min(indexOfLastItem, data.length)} of {data.length}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <button
              style={{
                backgroundColor: "#003366",
                color: "#ffffff",
                border: "none",
                borderRadius: "0.375rem 0 0 0.375rem",
                padding: "0.5rem 1rem",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                opacity: currentPage === 1 ? 0.5 : 1,
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#002244")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#003366")}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <PreviousIcon />
            </button>
            <button
              style={{
                backgroundColor: "#003366",
                color: "#ffffff",
                border: "none",
                borderRadius: "0 0.375rem 0.375rem 0",
                padding: "0.5rem 1rem",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                opacity: currentPage === totalPages ? 0.5 : 1,
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#002244")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#003366")}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <NextIcon />
            </button>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#003366", fontWeight: "bold" }}>
          {selectedDemande ? "Modifier la demande" : "Ajouter une demande"}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const demandeData = Object.fromEntries(formData.entries());
            handleSave(demandeData);
          }}
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}
        >
          <div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Type Demande</label>
              <select
                name="typeDemande"
                defaultValue={selectedDemande?.type_demande || ""}
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="">Sélectionner un type</option>
                <option value="CURATIVE">Curative</option>
                <option value="PREVENTIVE">Préventive</option>


              </select>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Date Demande</label>
              <input
                type="date"
                name="date_demande"
                defaultValue={selectedDemande?.date_demande ? selectedDemande.date_demande.split('T')[0] : ""}
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Priorité</label>
              <select
                name="priorite"
                defaultValue={selectedDemande?.priorite || ""}
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="">Sélectionner une priorité</option>
                <option value="Haute">Haute</option>
                <option value="Moyenne">Moyenne</option>
                <option value="Basse">Basse</option>
              </select>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Statut</label>
              <select
                name="statut"
                defaultValue={selectedDemande?.statut || ""}
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="">Sélectionner un statut</option>
                <option value="En attente">En attente</option>
                <option value="En cours">En cours</option>
                <option value="Terminé">Terminé</option>
                <option value="Annulé">Annulé</option>
              </select>
            </div>
          </div>

          <div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Description</label>
              <textarea
                name="description"
                defaultValue={selectedDemande?.description || ""}
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  minHeight: "80px",
                }}
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Panne</label>
              <input
                type="text"
                name="panne"
                defaultValue={selectedDemande?.panne || ""}
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Urgence</label>
              <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input
                  type="checkbox"
                  name="urgence"
                  defaultChecked={selectedDemande?.urgence || false}
                  style={{ width: "16px", height: "16px" }}
                />
                Urgence
              </label>

            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Demandeur</label>
              <input
                type="text"
                name="demandeur"
                defaultValue={selectedDemande?.demandeur || ""}
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Fréquence</label>
              <input
                type="text"
                name="frequence"
                defaultValue={selectedDemande?.frequence || ""}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </div>

          </div>

          <div style={{ gridColumn: "1 / -1", textAlign: "center" }}>
            <button
              type="submit"
              style={{
                backgroundColor: "#003366",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "10px 20px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              Enregistrer
            </button>
          </div>
        </form>
      </Modal>


      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#003366", fontWeight: "bold" }}>
          Supprimer une demande
        </h2>
        <p style={{ textAlign: "center", marginBottom: "20px" }}>
          Êtes-vous sûr de vouloir supprimer cette demande ?
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
          <button
            onClick={closeDeleteModal}
            style={{
              backgroundColor: "#ccc",
              color: "#333",
              border: "none",
              borderRadius: "4px",
              padding: "10px 20px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            Annuler
          </button>
          <button
            onClick={handleDelete}
            style={{
              backgroundColor: "#ff4d4d",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              padding: "10px 20px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            Supprimer
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Interventions;