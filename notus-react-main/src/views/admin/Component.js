import React, { useState, useEffect } from "react";

// Constantes
const API_URL = "http://localhost:8089/PI/PI/component/all";
const API_ADD_OR_UPDATE = "http://localhost:8089/PI/PI/component/addOrIncrement";
const API_DELETE = "http://localhost:8089/PI/PI/component/delete";
const API_SEARCH = "http://localhost:8089/PI/PI/component/search";
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
      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
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
          width: "500px",
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
          <th
            style={{
              backgroundColor: "#ffffff",
              color: "#4a5568",
              border: "1px solid #e2e8f0",
              padding: "12px",
              textAlign: "left",
              fontSize: "0.75rem",
              fontWeight: "600",
              textTransform: "uppercase",
            }}
          >
            Article
          </th>
          <th
            style={{
              backgroundColor: "#ffffff",
              color: "#4a5568",
              border: "1px solid #e2e8f0",
              padding: "12px",
              textAlign: "left",
              fontSize: "0.75rem",
              fontWeight: "600",
              textTransform: "uppercase",
            }}
          >
            atl
          </th>
          <th
            style={{
              backgroundColor: "#ffffff",
              color: "#4a5568",
              border: "1px solid #e2e8f0",
              padding: "12px",
              textAlign: "left",
              fontSize: "0.75rem",
              fontWeight: "600",
              textTransform: "uppercase",
            }}
          >
            bur
          </th>
          <th
            style={{
              backgroundColor: "#ffffff",
              color: "#4a5568",
              border: "1px solid #e2e8f0",
              padding: "12px",
              textAlign: "left",
              fontSize: "0.75rem",
              fontWeight: "600",
              textTransform: "uppercase",
            }}
          >
            Designation
          </th>
          <th
            style={{
              backgroundColor: "#ffffff",
              color: "#4a5568",
              border: "1px solid #e2e8f0",
              padding: "12px",
              textAlign: "left",
              fontSize: "0.75rem",
              fontWeight: "600",
              textTransform: "uppercase",
            }}
          >
            Quantite
          </th>
          <th
            style={{
              backgroundColor: "#ffffff",
              color: "#4a5568",
              border: "1px solid #e2e8f0",
              padding: "12px",
              textAlign: "left",
              fontSize: "0.75rem",
              fontWeight: "600",
              textTransform: "uppercase",
            }}
          >
            prix
          </th>
          <th
            style={{
              backgroundColor: "#ffffff",
              color: "#4a5568",
              border: "1px solid #e2e8f0",
              padding: "12px",
              textAlign: "center",
              fontSize: "0.75rem",
              fontWeight: "600",
              textTransform: "uppercase",
            }}
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {currentItems.map((item, index) => (
          <tr key={index}>
            <td
              style={{
                border: "1px solid #e2e8f0",
                padding: "12px",
                textAlign: "left",
                fontSize: "0.75rem",
              }}
            >
              {item.trartArticle}
            </td>
            <td
              style={{
                border: "1px solid #e2e8f0",
                padding: "12px",
                textAlign: "left",
                fontSize: "0.75rem",
              }}
            >
              {item.atl}
            </td>
            <td
              style={{
                border: "1px solid #e2e8f0",
                padding: "12px",
                textAlign: "left",
                fontSize: "0.75rem",
              }}
            >
              {item.bur}
            </td>
            <td
              style={{
                border: "1px solid #e2e8f0",
                padding: "12px",
                textAlign: "left",
                fontSize: "0.75rem",
              }}
            >
              {item.trartDesignation}
            </td>
            <td
              style={{
                border: "1px solid #e2e8f0",
                padding: "12px",
                textAlign: "left",
                fontSize: "0.75rem",
              }}
            >
              {item.trartQuantite}
            </td>
            <td
              style={{
                border: "1px solid #e2e8f0",
                padding: "12px",
                textAlign: "left",
                fontSize: "0.75rem",
              }}
            >
              {item.prix}
            </td>
            <td
              style={{
                border: "1px solid #e2e8f0",
                padding: "12px",
                textAlign: "center",
                fontSize: "0.75rem",
              }}
            >
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
const SearchAndAddCard = ({ onAddComponent, onSearch }) => {
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
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "0.375rem",
                padding: "0.5rem 0.75rem",
                marginRight: "0.5rem",
                minWidth: "200px",
              }}
            />
          </div>
          <button
            onClick={onAddComponent}
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
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#002244")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#003366")}
          >
            Ajouter un composant
          </button>
        </div>
      </div>
    </div>
  );
};

// Composant principal
const Maps = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [componentToDelete, setComponentToDelete] = useState(null);

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
      const response = await fetch(`${API_SEARCH}?trartArticle=${searchTerm}`);
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

  const handleSave = async (componentData) => {
    try {
      const response = await fetch(API_ADD_OR_UPDATE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(componentData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout ou de la mise à jour du composant");
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
    if (componentToDelete) {
      try {
        const response = await fetch(`${API_DELETE}/${componentToDelete.trartArticle}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la suppression du composant");
        }

        console.log("Composant supprimé avec succès");
        fetchData();
        closeDeleteModal();
      } catch (error) {
        console.error("Erreur :", error);
      }
    }
  };

  const openAddModal = () => {
    setSelectedComponent(null);
    setIsModalOpen(true);
  };

  const openEditModal = (component) => {
    setSelectedComponent(component);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedComponent(null);
  };

  const openDeleteModal = (component) => {
    setComponentToDelete(component);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setComponentToDelete(null);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

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
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ position: "relative", width: "100%", padding: "0 1rem", maxWidth: "100%", flex: "1 1 auto" }}>
            <h3
              style={{
                color: "#003366",
                fontSize: "1.5rem",
                fontWeight: "600",
                paddingBottom: "0.5rem",
              }}
            >
              Liste des Composants
            </h3>
          </div>
        </div>
      </div>

      <SearchAndAddCard onAddComponent={openAddModal} onSearch={handleSearch} />

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
            <span style={{ marginRight: "0.5rem", fontSize: "0.875rem" }}>Items per page:</span>
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
          {selectedComponent ? "Modifier le composant" : "Ajouter un composant"}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const componentData = Object.fromEntries(formData.entries());
            handleSave(componentData);
          }}
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}
        >
          <div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Article</label>
              <input
                type="text"
                name="trartArticle"
                defaultValue={selectedComponent?.trartArticle || ""}
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
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>atl</label>
              <input
                type="text"
                name="atl"
                defaultValue={selectedComponent?.atl || ""}
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
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>bur</label>
              <input
                type="text"
                name="bur"
                defaultValue={selectedComponent?.bur || ""}
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

          <div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Designation</label>
              <input
                type="text"
                name="trartDesignation"
                defaultValue={selectedComponent?.trartDesignation || ""}
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
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Quantite</label>
              <input
                type="number"
                name="trartQuantite"
                defaultValue={selectedComponent?.trartQuantite || ""}
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
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>prix</label>
              <input
                type="price"
                name="prix"
                defaultValue={selectedComponent?.prix || ""}
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
          Supprimer un composant
        </h2>
        <p style={{ textAlign: "center", marginBottom: "20px" }}>
          Êtes-vous sûr de vouloir supprimer ce composant ?
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

export default Maps;