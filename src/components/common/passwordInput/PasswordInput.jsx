import { useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import styles from "./PasswordInpute.module.css";

export default function PasswordField({ value, onChange, ...props }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={styles.passwordContainer}>
            <input
                type={showPassword ? "text" : "password"}
                value={value}
                onChange={onChange}
                {...props}
                className={styles.input}
                autoComplete={props.autoComplete || "current-password"}
            />
            <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className={styles.passwordToggle}
                tabIndex={-1}
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            >
                {showPassword ? <RiEyeFill size={22} /> : <RiEyeOffFill size={22} />}
            </button>
        </div>
    );
}