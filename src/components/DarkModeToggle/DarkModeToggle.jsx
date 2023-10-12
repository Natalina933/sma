import styles from "./darkModeToggle.module.css";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import {
    FaHome,
    FaCogs,
   
} from "react-icons/fa";
const DarkModeToggle = () => {
    const { toggle, mode } = useContext(ThemeContext);
    return (
        <div className={styles.container} onClick={toggle}>
            <div className={styles.icon}><FaCogs /></div>
            <div className={styles.icon}><FaHome /></div>
            <div
                className={styles.ball}
                style={mode === "light" ? { left: "2px" } : { right: "2px" }}
            />
        </div>
    );
};

export default DarkModeToggle;
