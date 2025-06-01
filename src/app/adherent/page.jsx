"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

export default function AdherentHomePage() {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "unauthenticated") {
            redirect("/dashboard/login");
        }
    }, [status]);

    if (!session) return <p className="p-4">Chargement...</p>;

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">Bienvenue {session.user.name} 👋</h1>
            <p className="text-gray-700">Voici votre espace adhérent :</p>

            <div className="grid md:grid-cols-2 gap-4">
                <Link
                    href="/dashboard/adherent/activites"
                    className="block p-4 bg-blue-100 rounded-xl hover:bg-blue-200"
                >
                    📅 Voir les activités à venir
                </Link>
                <Link
                    href="/dashboard/adherent/mes-activites"
                    className="block p-4 bg-green-100 rounded-xl hover:bg-green-200"
                >
                    ✅ Mes inscriptions aux activités
                </Link>
                <Link
                    href="/dashboard/adherent/messages"
                    className="block p-4 bg-yellow-100 rounded-xl hover:bg-yellow-200"
                >
                    💬 Messagerie entre adhérents
                </Link>
            </div>
        </div>
    );
}
