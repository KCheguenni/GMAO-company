import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Dashboard from "views/admin/Dashboard.js";
import Maps from "views/admin/Maps.js";
import Settings from "views/admin/Settings.js";
import Tables from "views/admin/Tables.js";
import Component from "views/admin/Component.js";
import AddIntervention from "views/admin/AddIntervention.js";
import interventions from "views/admin/interventions.js";
import Profile from "views/admin/Profile.js";
import Bon from "views/admin/BonTravail.js";

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/admin/Bon-de-travail" exact component={Bon} />
            <Route path="/admin/profile" exact component={Profile} />
            <Route path="/admin/dashboard" exact component={Dashboard} />
            <Route path="/admin/planing" exact component={Maps} />
            <Route path="/admin/testeurs" exact component={Settings} />
            <Route path="/admin/tables" exact component={Tables} />
            <Route path="/admin/composants" exact component={Component} />
            <Route path="/admin/AddIntervention" exact component={AddIntervention} />
            <Route path="/admin/interventions" exact component={interventions} />
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
