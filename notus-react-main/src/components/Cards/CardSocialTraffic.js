
// components

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function CardSocialTraffic() {
  const [testeurs, setTesteurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8089/PI/PI/testeurs/all")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement des testeurs.");
        return res.json();
      })
      .then((data) => {
        setTesteurs(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Helper for completion (simulate if not present)
  const getCompletion = (testeur) => {
    // Use testeur.completion if exists, else random for demo
    if (typeof testeur.completion === 'number') return testeur.completion;
    return Math.floor(Math.random() * 100) + 1;
  };

  const history = useHistory();
  const visibleTesteurs = testeurs.slice(0, 5);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded p-8">
        <div className="rounded-t mb-0 px-4 py-3 border-0 flex items-center justify-between">
          <h3 className="font-semibold text-2xl text-blueGray-700">Liste des Testeurs</h3>
          <button
            className="bg-indigo-600 text-white active:bg-indigo-700 text-lg font-bold uppercase px-6 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150 shadow-md hover:shadow-lg"
            type="button"
            onClick={() => history.push("/admin/settings")}
          >
            Voir tout
          </button>
        </div>
        <div className="block w-full overflow-x-auto mt-4">
          <table className="items-center w-full bg-transparent border-collapse text-lg">
            <thead>
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-700 align-middle border border-solid border-blueGray-100 py-4 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left">
                  Atelier
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-700 align-middle border border-solid border-blueGray-100 py-4 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left">
                  Ligne
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-700 align-middle border border-solid border-blueGray-100 py-4 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left">
                  Banc de Test
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-700 align-middle border border-solid border-blueGray-100 py-4 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left">
                  Code GMAO
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-700 align-middle border border-solid border-blueGray-100 py-4 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left">
                  Completion
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center p-6 text-xl">Chargement...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={5} className="text-center text-red-500 p-6 text-xl">{error}</td>
                </tr>
              ) : visibleTesteurs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-6 text-xl">Aucun testeur trouvé.</td>
                </tr>
              ) : (
                visibleTesteurs.map((t, idx) => {
                  const completion = getCompletion(t);
                  return (
                    <tr key={t.id || idx}>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 text-left font-medium">
                        {t.atelier || "-"}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 text-left font-medium">
                        {t.ligne || "-"}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 text-left font-medium">
                        {t.bancTest || t.bancDeTest || "-"}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 text-left font-medium">
                        {t.codeGMAO || "-"}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4">
                        <div className="flex items-center">
                          <span className="mr-2 font-bold">{completion}%</span>
                          <div className="relative w-full h-4">
                            <div className="overflow-hidden h-4 text-xs flex rounded bg-blue-200">
                              <div
                                style={{ width: `${completion}%` }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                        <div
                          style={{ width: "60%" }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                        ></div>
                      </div>
                   