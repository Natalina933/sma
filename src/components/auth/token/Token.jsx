import { useSession } from "next-auth";

const Token = () => {
  const { session } = useSession();
  const token = session?.token;

  if (!token) {
    return <p>Pas connecté</p>;
  }

  return (
    <div>
      <p>Utilisateur : {session.user.email}</p>
      <p>Jeton : {token}</p>
    </div>
  );
};