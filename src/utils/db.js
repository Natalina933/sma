import mysql from "mysql2/promise";

let pool; // Utilisation d'un pool de connexions pour réutiliser les connexions

export const createConnection = async () => {
  try {
    // Si le pool n'est pas encore créé, on le crée
    if (!pool) {
      pool = mysql.createPool({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASS,
        database: process.env.DATABASE_NAME,
        charset: process.env.DATABASE_CHARSET || "utf8mb4", // Valeur par défaut
        waitForConnections: true,
        connectionLimit: 10, // Ajuster selon les besoins du projet
        queueLimit: 0,
      });
      console.log("Connexion au pool MySQL créée avec succès.");
    }
    return pool;
  } catch (error) {
    console.error(
      "Erreur lors de la création de la connexion MySQL :",
      error.message
    );
    throw error; // Relancer l'erreur pour gestion ultérieure par l'appelant
  }
};
