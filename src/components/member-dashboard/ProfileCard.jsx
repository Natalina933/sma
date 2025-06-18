export default function ProfileCard({ user }) {
    return (
        <div style={{ border: "1px solid #eee", borderRadius: 8, padding: 16, marginBottom: 24 }}>
            <h3>Profil</h3>
            <p><strong>Nom :</strong> {user.name} {user.surname}</p>
            <p><strong>Email :</strong> {user.email}</p>
            {/* Ajoute d'autres infos si besoin */}
        </div>
    );
}