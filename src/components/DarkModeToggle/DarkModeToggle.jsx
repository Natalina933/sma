import styles from "./darkModeToggle.module.css";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import {
    FaHome,
    FaCogs,
    FaComments,
    FaCalendarWeek,
    FaEnvelopeOpenText,
    FaFeather,
} from "react-icons/fa";
const DarkModeToggle = () => {
    const { toggle, mode } = useContext(ThemeContext);
    return (
        <div className={styles.container} onClick={toggle}>
            <div className={styles.icon}>🌙</div>
            <div className={styles.icon}>🔆</div>
            <div
                className={styles.ball}
                style={mode === "light" ? { left: "2px" } : { right: "2px" }}
            />
        </div>
    );
};

export default DarkModeToggle;
