CREATE TABLE IF NOT EXISTS `usr_users` (
  `id` INT NOT NULL AUTO_INCREMENT, -- Identifiant unique de l'utilisateur
  `username` VARCHAR(50) NOT NULL, -- Nom d'utilisateur
  `email` VARCHAR(191) NOT NULL, -- Adresse email unique
  `password` VARCHAR(255) NOT NULL, -- Mot de passe haché
  `role` ENUM('admin', 'user', 'moderator') DEFAULT 'user', -- Rôle de l'utilisateur
  `status` ENUM('active', 'inactive', 'banned') DEFAULT 'active', -- Statut de l'utilisateur
  `profile_picture` VARCHAR(255) DEFAULT NULL, -- URL de la photo de profil
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Date de création
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Dernière mise à jour
  `last_login` TIMESTAMP NULL DEFAULT NULL, -- Dernière connexion
  PRIMARY KEY (`id`), -- Clé primaire
  UNIQUE KEY `email` (`email`), -- Email unique
  UNIQUE KEY `username` (`username`) -- Nom d'utilisateur unique
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;