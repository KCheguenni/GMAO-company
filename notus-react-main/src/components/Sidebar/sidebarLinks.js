const links = [
    {
      title: "Layouts",
      items: [
        { to: "/admin/dashboard", icon: "fas fa-chart-pie", label: "dashboard" },
        { to: "/admin/profile", icon: "fas fa-user", label: "Profile" },
      //  { to: "/admin/bon-de-travail", icon: "fas fa-user", label: "Bon de Travail" },
        { to: "/admin/testeurs", icon: "fas fa-tools", label: "Testeurs" },
        { to: "/admin/composants", icon: "fas fa-cubes", label: "Composants" },
      //  { to: "/admin/tables", icon: "fas fa-table", label: "Emploi" },
        { to: "/admin/planing", icon: "fas fa-calendar", label: "Planning" },
      ],
    },
    {
      title: "Intervention",
      items: [
        { to: "/admin/interventions", icon: "fas fa-clipboard-list", label: "Liste des interventions" },
        { to: "/admin/AddIntervention", icon: "fas fa-plus-circle", label: "Ajouter intervention" },
      ],
   
    },
    {
       items: [
        { to: "/", icon: "fas fa-door-open",  label: "Déconnexion" },
      ],
    }
    /*{
      title: "Auth Layout Pages",
      items: [
        { to: "/auth/login", icon: "fas fa-sign-in-alt", label: "Login" },
        { to: "/auth/register", icon: "fas fa-user-plus", label: "Register" },
      ],
    },*/
  ];
  
  export default links;
  