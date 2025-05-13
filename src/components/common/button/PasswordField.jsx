import { useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

export default function PasswordField({ value, onChange, ...props }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div style={{ position: "relative", width: "100%" }}>
            <input
                type={showPassword ? "text" : "password"}
                value={value}
                onChange={onChange}
                {...props}
                style={{ width: "100%", paddingRight: 40 }}
                autoComplete="current-password"
            />
            <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                style={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#888",
                    padding: 0,
                }}
                tabIndex={-1}
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            >
                {showPassword ? <RiEyeFill size={22} /> : <RiEyeOffFill size={22} />}
            </button>
        </div>
    );
}