export default function ActivityList({ activities, inscrit, memberId }) {
    const handleInscription = async (activityId) => {
        const res = await fetch("/api/activity-members", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ activity_id: activityId, member_id: memberId }),
        });
        if (res.ok) {
            alert("Inscription réussie !");
            window.location.reload();
        } else {
            alert("Erreur lors de l'inscription");
        }
    };

    if (!activities.length) return <div>Aucune activité.</div>;

    return (
        <ul>
            {activities.map((a) => (
                <li key={a.id} style={{ marginBottom: 12 }}>
                    <strong>{a.title}</strong> — {a.date}
                    {inscrit ? (
                        <span style={{ color: "#388e3c", marginLeft: 8 }}>Inscrit</span>
                    ) : (
                        <button
                            style={{ marginLeft: 12, background: "#1976d2", color: "#fff", border: "none", borderRadius: 4, padding: "0.3em 1em", cursor: "pointer" }}
                            onClick={() => handleInscription(a.id)}
                        >
                            S&apos;inscrire
                        </button>
                    )}
                </li>
            ))}
        </ul>
    );
}