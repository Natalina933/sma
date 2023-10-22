import { 
    FaHome,
    FaCogs,
    FaComments,
    FaCalendarWeek,
    FaEnvelopeOpenText,
    FaFeather,
  } from "react-icons/fa";

const menuItems = [
    {
      id: 1,
      title: "Accueil",
      url: "/",
      icon: <FaHome />,
    },
    {
      id: 2,
      title: "Nos Activités",
      url: "/activity",
      icon: <FaCalendarWeek />,
    },
    {
      id: 3,
      title: "Blog",
      url: "/blog",
      icon: <FaComments />,
    },
    {
      id: 4,
      title: "A propos de nous",
      url: "/about",
      icon: <FaFeather />,
    },
    {
      id: 5,
      title: "Contact",
      url: "/contact",
      icon: <FaEnvelopeOpenText />,
    },
    {
      id: 6,
      title: "Tableau de bord",
      url: "/dashboard",
      icon: <FaCogs />,
    },
  ];
  export default menuItems;