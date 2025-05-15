import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function CardBarChart() {
  const history = useHistory();
  const [interventions, setInterventions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8089/PI/PI/demandes/recuperer/all")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement des interventions.");
        return res.json();
      })
      .then((data) => {
        setInterventions(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const visibleInterventions = interventions.slice(0, 5);

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded p-8">
      <div className="rounded-t mb-0 px-4 py-3 bg-transparent flex items-center justify-between">
        <div className="relative w-full max-w-full flex-grow flex-1">
          <h6 className="uppercase text-blueGray-400 mb-1 text-lg font-semibold">
            Interventions récentes
          </h6>
          <h2 className="text-blueGray-700 text-2xl font-semibold">
            Aperçu des interventions
          </h2>
        </div>
        <button
          className="bg-indigo-600 text-white active:bg-indigo-700 text-lg font-bold uppercase px-6 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150 shadow-md hover:shadow-lg ml-4"
          type="button"
          onClick={() => history.push("/admin/intervention")}
        >
          Voir tout
        </button>
      </div>
      <div className="block w-full overflow-x-auto mt-4">
        <table className="items-center w-full bg-transparent border-collapse text-lg">
          <thead>
            <tr>
              <th className="px-4 py-3 bg-blueGray-50 text-blueGray-700 align-middle border border-solid border-blueGray-100 text-lg uppercase font-bold text-left">
                Type Demande
              </th>
              <th className="px-4 py-3 bg-blueGray-50 text-blueGray-700 align-middle border border-solid border-blueGray-100 text-lg uppercase font-bold text-left">
                ID
              </th>
              <th className="px-4 py-3 bg-blueGray-50 text-blueGray-700 align-middle border border-solid border-blueGray-100 text-lg uppercase font-bold text-left">
                Date Demande
              </th>
              <th className="px-4 py-3 bg-blueGray-50 text-blueGray-700 align-middle border border-solid border-blueGray-100 text-lg uppercase font-bold text-left">
                Description
              </th>
              <th className="px-4 py-3 bg-blueGray-50 text-blueGray-700 align-middle border border-solid border-blueGray-100 text-lg uppercase font-bold text-left">
                Priorité
              </th>
              <th className="px-4 py-3 bg-blueGray-50 text-blueGray-700 align-middle border border-solid border-blueGray-100 text-lg uppercase font-bold text-left">
                Statut
              </th>
              <th className="px-4 py-3 bg-blueGray-50 text-blueGray-700 align-middle border border-solid border-blueGray-100 text-lg uppercase font-bold text-left">
                Panne
              </th>
              <th className="px-4 py-3 bg-blueGray-50 text-blueGray-700 align-middle border border-solid border-blueGray-100 text-lg uppercase font-bold text-left">
                Urgence
              </th>
              <th className="px-4 py-3 bg-blueGray-50 text-blueGray-700 align-middle border border-solid border-blueGray-100 text-lg uppercase font-bold text-left">
                Fréquence
              </th>
              <th className="px-4 py-3 bg-blueGray-50 text-blueGray-700 align-middle border border-solid border-blueGray-100 text-lg uppercase font-bold text-left">
                Prochain RDV
              </th>
              <th className="px-4 py-3 bg-blueGray-50 text-blueGray-700 align-middle border border-solid border-blueGray-100 text-lg uppercase font-bold text-left">
                Demandeur
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={11} className="text-center p-6 text-xl">Chargement...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={11} className="text-center text-red-500 p-6 text-xl">{error}</td>
              </tr>
            ) : visibleInterventions.length === 0 ? (
              <tr>
                <td colSpan={11} className="text-center p-6 text-xl">Aucune intervention trouvée.</td>
              </tr>
            ) : (
              visibleInterventions.map((i, idx) => (
                <tr key={i.id || idx}>
                  <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap text-left font-medium">
                    {i.typeDemande || "-"}
                  </td>
                  <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap text-left font-medium">
                    {i.id || "-"}
                  </td>
                  <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap text-left font-medium">
                    {i.dateDemande ? new Date(i.dateDemande).toLocaleDateString() : "-"}
                  </td>
                  <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap text-left font-medium max-w-xs truncate">
                    {i.description || "-"}
                  </td>
                  <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap text-left font-medium">
                    {i.priorite || "-"}
                  </td>
                  <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap text-left font-medium">
                    {i.statut || "-"}
                  </td>
                  <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap text-left font-medium">
                    {i.panne || "-"}
                  </td>
                  <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap text-left font-medium">
                    {i.urgence || "-"}
                  </td>
                  <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap text-left font-medium">
                    {i.frequence || "-"}
                  </td>
                  <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap text-left font-medium">
                    {i.prochainRDV || "-"}
                  </td>
                  <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap text-left font-medium">
                    {i.demandeur || "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}