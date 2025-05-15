import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/UserList.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";

export default function Dashboard() {
  const [userCount, setUserCount] = useState(0);
  const [testeurCount, setTesteurCount] = useState(0);
  const [interventionCount, setInterventionCount] = useState(0);
  const [componentCount, setComponentCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [usersRes, testeursRes, demandesRes, componentsRes] = await Promise.all([
          fetch("http://localhost:8089/PI/user/all").then(r => r.json()),
          fetch("http://localhost:8089/PI/PI/testeurs/all").then(r => r.json()),
          fetch("http://localhost:8089/PI/PI/demandes/recuperer/all").then(r => r.json()),
          fetch("http://localhost:8089/PI/PI/component/all").then(r => r.json()),
        ]);
        setUserCount(Array.isArray(usersRes) ? usersRes.length : 0);
        setTesteurCount(Array.isArray(testeursRes) ? testeursRes.length : 0);
        setInterventionCount(Array.isArray(demandesRes) ? demandesRes.length : 0);
        setComponentCount(Array.isArray(componentsRes) ? componentsRes.length : 0);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement des statistiques : " + err.message);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 px-2 md:px-8 flex flex-col items-center rounded-t-lg">
      {/* Sagemcom Gradient Accent Bar */}
      <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-blue-500 from-25% via-green-500 via-50% via-purple-500 via-75% to-red-500 rounded-t-lg z-10" />

      {/* Main Card Container */}
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-gray-100 mt-5 mb-10 p-0 overflow-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 px-8 py-8 border-b border-gray-100 bg-gradient-to-br from-blue-50 to-green-50">
         
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight mb-2 font-sans">Sagemcom Admin Dashboard</h1>
            <p className="text-blue-700 text-lg font-medium font-sans">Panel d'administration centralisé</p>
          </div>
        </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12 px-4">
        {/* Utilisateurs */}
        <div className="bg-white rounded-xl shadow-lg p-7 flex flex-col items-center border-t-4 border-blue-500 transition-all duration-200 hover:shadow-2xl hover:-translate-y-1">
          <div className="mb-3 flex items-center justify-center w-12 h-12 rounded-full bg-blue-50">
            <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          </div>
          <span className="text-3xl font-extrabold text-blue-500 mb-1">{loading ? '...' : userCount}</span>
          <span className="text-blue-700 text-lg font-semibold tracking-wide">Utilisateurs</span>
        </div>
        {/* Testeurs */}
        <Link to="/admin/testeurs" className="focus:outline-none">
          <div className="bg-white rounded-xl shadow-lg p-7 flex flex-col items-center border-t-4 border-green-500 cursor-pointer transition-all duration-200 hover:shadow-2xl hover:-translate-y-1 hover:bg-gradient-to-br hover:from-green-50 hover:to-green-100 group">
            <div className="mb-3 flex items-center justify-center w-12 h-12 rounded-full bg-green-50">
  <i className="fas fa-vial text-green-500 text-2xl"></i>
</div>
            <span className="text-3xl font-extrabold text-green-500 mb-1 group-hover:animate-pulse">{loading ? '...' : testeurCount}</span>
            <span className="text-green-700 text-lg font-semibold tracking-wide">Testeurs</span>
          </div>
        </Link>
        {/* Interventions */}
        <Link to="/admin/interventions" className="focus:outline-none">
          <div className="bg-white rounded-xl shadow-lg p-7 flex flex-col items-center border-t-4 border-purple-500 cursor-pointer transition-all duration-200 hover:shadow-2xl hover:-translate-y-1 hover:bg-gradient-to-br hover:from-purple-50 hover:to-purple-100 group">
            <div className="mb-3 flex items-center justify-center w-12 h-12 rounded-full bg-purple-50">
  <i className="fas fa-tools text-purple-500 text-2xl"></i>
</div>
            <span className="text-3xl font-extrabold text-purple-500 mb-1 group-hover:animate-pulse">{loading ? '...' : interventionCount}</span>
            <span className="text-purple-700 text-lg font-semibold tracking-wide">Interventions</span>
          </div>
        </Link>
        {/* Composants */}
        <Link to="/admin/composants" className="focus:outline-none">
          <div className="bg-white rounded-xl shadow-lg p-7 flex flex-col items-center border-t-4 border-red-500 cursor-pointer transition-all duration-200 hover:shadow-2xl hover:-translate-y-1 hover:bg-gradient-to-br hover:from-red-50 hover:to-red-100 group">
            <div className="mb-3 flex items-center justify-center w-12 h-12 rounded-full bg-red-50">
  <i className="fas fa-microchip text-red-500 text-2xl"></i>
</div>
            <span className="text-3xl font-extrabold text-red-500 mb-1 group-hover:animate-pulse">{loading ? '...' : componentCount}</span>
            <span className="text-red-700 text-lg font-semibold tracking-wide">Composants</span>
          </div>
        </Link>
      </div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      {/* Main Cards Section */}
      <div className="grid grid-cols-1 gap-8 mb-8">
        <CardPageVisits />
      </div>
        {/* Watermark/Footer */}
        
      </div>
    </div>
  );
}
