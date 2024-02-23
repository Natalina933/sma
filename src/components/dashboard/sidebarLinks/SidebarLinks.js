import {
    FaUser,
    FaCog,
    FaCalendarAlt,
    FaUsers,
} from "react-icons/fa";

export const SidebarLinks = [
    {
        id: 1,
        title: "Adhérents",
        icon: <FaUsers />,
        subLinks: [
            { id: 1, title: "Liste Adhérents", url: "/members" },
            { id: 2, title: "Ajouter", url: "/members/add" },
            { id: 3, title: "Modifier", url: "/members/edit" },
            { id: 4, title: "Supprimer", url: "/members/delete" },
        ],
    },
    {
        id: 2,
        title: "Nos Activités",
        icon: <FaUser />,
        subLinks: [
            { id: 1, title: "Liste Activités", url: "/activities/add" },
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
        title: "Calendrier",
        icon: <FaCalendarAlt />,
        subLinks: [
            { id: 1, title: "Voir le calendrier", url: "/program/edit" },
            { id: 2, title: "Ajouter", url: "/program/add" },
            { id: 3, title: "Modifier", url: "/program/edit" },
            { id: 4, title: "Archiver", url: "/program/archive" },
        ],
    },
];