import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// Pagination options
const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 50];

export default function TesteursPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Edit modal state
  const [editingRow, setEditingRow] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Details modal state
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Pagination state
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[1]);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch data from API
  function fetchData() {
    setLoading(true);
    setError(null);
    fetch("http://localhost:8089/PI/PI/testeurs/all")
      .then((res) => res.json())
      .then((apiData) => {
        setData(apiData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Filtered data
  const filteredData = data.filter((row) =>
    row.codeGMAO?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRows = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Open edit modal and set initial values
  const openEditModal = (row) => {
    setEditingRow(row);
    setEditValues({
      atelier: row.atelier || "",
      ligne: row.ligne || "",
      bancDeTest: row.bancDeTest || "",
      codeGMAO: row.codeGMAO || "",
    });
    setSuccessMessage("");
    setErrorMessage("");
    setModalOpen(true);
  };

  const closeEditModal = () => {
    setModalOpen(false);
    setEditingRow(null);
    setEditValues({});
  };

  const handleEditChange = (e) => {
    setEditValues({ ...editValues, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = () => {
    if (
      !editValues.atelier ||
      !editValues.ligne ||
      !editValues.bancDeTest ||
      !editValues.codeGMAO
    ) {
      setErrorMessage("Tous les champs sont obligatoires.");
      return;
    }
    setData((prev) =>
      prev.map((row) =>
        row === editingRow ? { ...row, ...editValues } : row
      )
    );
    setSuccessMessage("Modifications enregistrées !");
    setTimeout(closeEditModal, 900);
  };

  // Details modal open/close
  const openDetails = (row) => {
    setSelectedRow(row);
    setIsDetailsOpen(true);
  };
  const closeDetails = () => {
    setIsDetailsOpen(false);
    setSelectedRow(null);
  };

  // Color helper for completion
  const getCompletionColor = (completion) => {
    const percent = parseInt(completion, 10);
    if (percent >= 80) return "bg-green-500";
    if (percent >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="relative flex flex-col min-w-0  mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0 -mt-20">
      <div className="bg-gray-50 p-6 rounded-t-lg border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-800">
            Testeurs Management
          </h3>
          <input
            type="text"
            placeholder="Search GMAO..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-80 h-12 px-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <div className="bg-white p-4 overflow-x-auto">
        {loading && <p>Chargement...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Atelier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ligne</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Banc de Test</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code GMAO</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentRows.length > 0 ? (
                currentRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{row.atelier || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{row.ligne || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        {row.bancDeTest || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{row.codeGMAO || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-24 mr-2 text-right text-sm text-gray-600">{row.completion || '0%'}</div>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div style={{ width: row.completion || '0%' }} className={`${getCompletionColor(row.completion)}`}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => openDetails(row)} className="text-blue-600 hover:text-blue-800 mr-3">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button onClick={() => openEditModal(row)} className="text-green-600 hover:text-green-800">
                        <i className="fas fa-edit"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                    {data.length === 0 ? 'No data available' : 'No matching records found'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {/* Pagination Controls */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center px-4 py-3 bg-white border-t border-gray-100">
          <div className="flex items-center mb-2 md:mb-0">
            <span className="mr-2 text-sm text-gray-700">Items per page:</span>
            <select
              className="text-sm rounded border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={itemsPerPage}
              onChange={(e) => { setItemsPerPage(+e.target.value); setCurrentPage(1); }}
            >
              {ITEMS_PER_PAGE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center text-sm text-gray-700 mb-2 md:mb-0">
            <span>
              {filteredData.length === 0 ? 0 : indexOfFirstItem + 1} – {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className={`bg-blue-900 text-white px-3 py-2 rounded-l ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-800'}`}
            >
              &laquo;
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`bg-blue-900 text-white px-3 py-2 rounded-r ${(currentPage === totalPages || totalPages === 0) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-800'}`}
            >
              &raquo;
            </button>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {isDetailsOpen && createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Détails du Testeur</h3>
              <button onClick={closeDetails} className="text-gray-600 hover:text-gray-800">
                <i className="fas fa-times"></i>
              </button>
            </div>
            {selectedRow && (
              <div className="space-y-3">
                <p><strong>Atelier:</strong> {selectedRow.atelier}</p>
                <p><strong>Ligne:</strong> {selectedRow.ligne}</p>
                <p><strong>Banc de Test:</strong> {selectedRow.bancDeTest}</p>
                <p><strong>Code GMAO:</strong> {selectedRow.codeGMAO}</p>
              </div>
            )}
            <div className="mt-6 text-right">
              <button onClick={closeDetails} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                Fermer
              </button>
            </div>
          </div>
        </div>
      , document.body)}

      {/* Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <h3 className="text-center text-xl font-bold mb-4">Modifier le Testeur</h3>
            <div className="space-y-3">
              {['atelier','ligne','bancDeTest','codeGMAO'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium mb-1 capitalize">{field}</label>
                  <input
                    name={field}
                    value={editValues[field]}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              ))}
              {errorMessage && <p className="text-red-600">{errorMessage}</p>}
              {successMessage && <p className="text-green-600">{successMessage}</p>}
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button onClick={handleSaveEdit} className="px-4 py-2 bg-green-500 text-white rounded-lg">
                Enregistrer
              </button>
              <button onClick={closeEditModal} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
