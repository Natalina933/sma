"use client";
import { useSession } from "next-auth/react";

/**
 * Affiche le token de connexion NextAuth, y compris l'e-mail,
 * l'ID utilisateur et la date d'expiration.
 *
 * Si l'utilisateur n'est pas connect , affiche un message
 * indiquant que l'utilisateur n'est pas connect .
 *
 * @returns Un JSX contenant les informations du token
 */
const Token = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Chargement...</p>;
  if (status === "unauthenticated") return <p>Pas connecté</p>;

  return (
    <div>
      <p>Utilisateur : {session.user.email}</p>
      <p>ID utilisateur : {session.user.id}</p>
      <p>Expiration de la session : {session.expires ? new Date(session.expires).toLocaleString() : "N/A"}</p>
    </div>
  );
};

export default Token;
