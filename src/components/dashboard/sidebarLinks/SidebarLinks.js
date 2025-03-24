import { FaUser, FaCog, FaCalendarAlt, FaUsers } from "react-icons/fa";

export const SidebarLinks = [
  {
    id: 1,
    title: "Adhérents",
    icon: <FaUsers />,
    subLinks: [
      { id: 1, title: "Liste Adhérents", url: "/dashboard" },
      {
        id: 2,
        title: "Gérer les groupes",
        url: "/dashboard/sidebar/groups",
      },
      { id: 3, title: "Suivi des cotisations", url: "/dashboard/sidebar/cotis" },
      { id: 4, title: "Envoyer un message", url: "#/dashboard/message" },
      { id: 5, title: "Exporter les adhérents", url: "#/dashboard/export" },
    ],
  },
  {
    id: 2,
    title: "Nos Activités",
    icon: <FaUser />,
    subLinks: [
      { id: 1, title: "Liste Activités", url: "/dashboard/sidebar/activity" },
      { id: 2, title: "Ajouter", url: "/activities/add" },
      { id: 3, title: "Modifier", url: "/activities/edit" },
      { id: 4, title: "Archiver", url: "/activities/archive" },
    ],
  },
  {
    id: 3,
    title: "Programme",
    icon: <FaCalendarAlt />,
    subLinks: [
      { id: 1, title: "Voir le programme", url: "/program/edit" },
      { id: 2, title: "Ajouter", url: "/program/add" },
      { id: 3, title: "Modifier", url: "/program/edit" },
      { id: 4, title: "Archiver", url: "/program/archive" },
    ],
  },
  {
    id: 4,
    title: "Sortie Annuelle",
    icon: <FaCalendarAlt />,
    subLinks: [
      { id: 1, title: "Voir toute les sorties", url: "/program/edit" },
      { id: 2, title: "Ajouter", url: "/program/add" },
      { id: 3, title: "Modifier", url: "/program/edit" },
      { id: 4, title: "Archiver", url: "/program/archive" },
    ],
  },
];
