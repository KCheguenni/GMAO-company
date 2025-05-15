
// components

import React, { useEffect, useState } from "react";

export default function UserList() {
  // Search and sort state
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 50];

  useEffect(() => {
    fetch("http://localhost:8089/PI/user/all")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement des utilisateurs.");
        return res.json();
      })
      .then((data) => {
        setUsers(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // --- Filtering ---
  const filteredUsers = users.filter((user) => {
    const name = user.nom || user.name || ((user.firstName || user.prenom || '') + ' ' + (user.lastName || user.surname || '')).trim();
    const email = user.email || '';
    const role = user.role || '';
    const term = searchTerm.toLowerCase();
    return (
      name.toLowerCase().includes(term) ||
      email.toLowerCase().includes(term) ||
      role.toLowerCase().includes(term)
    );
  });

  // --- Sorting ---
  const sortedUsers = React.useMemo(() => {
    if (!sortConfig.key) return filteredUsers;
    const sorted = [...filteredUsers].sort((a, b) => {
      let aValue, bValue;
      if (sortConfig.key === "nom") {
        aValue = a.nom || a.name || ((a.firstName || a.prenom || '') + ' ' + (a.lastName || a.surname || '')).trim();
        bValue = b.nom || b.name || ((b.firstName || b.prenom || '') + ' ' + (b.lastName || b.surname || '')).trim();
      } else if (sortConfig.key === "email") {
        aValue = a.email || '';
        bValue = b.email || '';
      } else if (sortConfig.key === "role") {
        aValue = a.role || '';
        bValue = b.role || '';
      }
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredUsers, sortConfig]);

  // Pagination logic (after filter & sort)
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedUsers.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // SVG Icons
  const PreviousIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
  );
  const NextIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
  );

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words ">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 flex items-center justify-between">
              <h3 className="font-semibold text-base text-blueGray-700">
                Liste des utilisateurs
              </h3>
              <input
                type="text"
                className="ml-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                placeholder="Rechercher par nom, email ou rôle..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                style={{ minWidth: 220 }}
              />
            </div>
          </div>
        </div>
        {/* User Table Rendering */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none"
                  onClick={() => {
                    setSortConfig((prev) => {
                      let direction = "asc";
                      if (prev.key === "nom" && prev.direction === "asc") direction = "desc";
                      return { key: "nom", direction };
                    });
                  }}
                >
                  Nom complet
                  {sortConfig.key === "nom" && (
                    <span className="ml-1">{sortConfig.direction === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none"
                  onClick={() => {
                    setSortConfig((prev) => {
                      let direction = "asc";
                      if (prev.key === "email" && prev.direction === "asc") direction = "desc";
                      return { key: "email", direction };
                    });
                  }}
                >
                  Email
                  {sortConfig.key === "email" && (
                    <span className="ml-1">{sortConfig.direction === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none"
                  onClick={() => {
                    setSortConfig((prev) => {
                      let direction = "asc";
                      if (prev.key === "role" && prev.direction === "asc") direction = "desc";
                      return { key: "role", direction };
                    });
                  }}
                >
                  Rôle
                  {sortConfig.key === "role" && (
                    <span className="ml-1">{sortConfig.direction === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((user, idx) => (
                <tr key={user.id || idx}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
  {user.nom || user.name || ((user.firstName || user.prenom || '') + ' ' + (user.lastName || user.surname || '')).trim() || '-'}
</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.role || '-'}</td>
                </tr>
              ))}
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan="3" className="px-6 py-6 text-center text-gray-400">Aucun utilisateur trouvé.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination and Items Per Page Bar */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center px-4 py-3 bg-white border-t border-gray-100">
          <div className="flex items-center mb-2 md:mb-0">
            <span className="mr-2 text-sm text-gray-700">Items per page:</span>
            <select
              className="text-sm rounded border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              {ITEMS_PER_PAGE_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center text-sm text-gray-700 mb-2 md:mb-0">
            <span>
              {users.length === 0 ? 0 : indexOfFirstItem + 1} – {Math.min(indexOfLastItem, users.length)} of {users.length}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <button
              className={`bg-blue-900 text-white px-3 py-2 rounded-l transition-colors duration-200 focus:outline-none ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-800'}`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <PreviousIcon />
            </button>
            <button
              className={`bg-blue-900 text-white px-3 py-2 rounded-r transition-colors duration-200 focus:outline-none ${currentPage === totalPages || totalPages === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-800'}`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              aria-label="Next page"
            >
              <NextIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
