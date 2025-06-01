import {
  FaHome,
  FaCalendarWeek,
  FaComments,
  FaFeather,
  FaEnvelopeOpenText,
} from "react-icons/fa";

export const Navlinks = [
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
    title: "Programme annuel",
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
];

export default Navlinks;
