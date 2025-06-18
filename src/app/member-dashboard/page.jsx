"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ProfileCard from "@/components/member-dashboard/ProfileCard";
import ActivityList from "@/components/member-dashboard/ActivityList";

export default function DashboardAdherent() {
    const { data: session, status } = useSession();
    const [inscriptions, setInscriptions] = useState([]);
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === "authenticated" && session?.user?.id) {
            Promise.all([
                fetch(`/api/activity-members?member_id=${session.user.id}`).then(res => res.json()),
                fetch("/api/activities").then(res => res.json())
            ]).then(([inscrits, allActivities]) => {
                setInscriptions(inscrits);
                setActivities(allActivities);
                setLoading(false);
            });
        }
    }, [status, session]);

    if (loading) return <div>Chargement...</div>;
    if (status !== "authenticated") return <div>Veuillez vous connecter.</div>;

    // Liste des activités auxquelles il n'est pas inscrit
    const inscritIds = inscriptions.map(i => i.activity_id);
    const notInscrit = activities.filter(a => !inscritIds.includes(a.id));

    return (
        <div>
            <h1>Mon espace adhérent</h1>
            <ProfileCard user={session.user} />
            <h2>Mes activités</h2>
            <ActivityList activities={activities.filter(a => inscritIds.includes(a.id))} inscrit />
            <h2>Activités proposées</h2>
            <ActivityList activities={notInscrit} inscrit={false} memberId={session.user.id} />
        </div>
    );
}