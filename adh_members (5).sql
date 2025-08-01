-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 25 juin 2025 à 09:23
-- Version du serveur : 8.3.0
-- Version de PHP : 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `datas_sma`
--

-- --------------------------------------------------------

--
-- Structure de la table `adh_members`
--

DROP TABLE IF EXISTS `adh_members`;
CREATE TABLE IF NOT EXISTS `adh_members` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `mail` varchar(191) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) DEFAULT 'member',
  `phone` varchar(20) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `complement` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `cp` varchar(10) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` enum('Monsieur','Madame') DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `membership_type` enum('single','duo','family') DEFAULT 'single',
  `membership_start` date DEFAULT NULL,
  `membership_end` date DEFAULT NULL,
  `payment_status` enum('paid','pending','overdue') DEFAULT NULL,
  `payment_method` enum('card','paypal','cash','transfer') DEFAULT NULL,
  `preferred_contact` enum('email','phone','sms','none') DEFAULT NULL,
  `newsletter_subscription` tinyint(1) DEFAULT '1',
  `last_login` timestamp NULL DEFAULT NULL,
  `referred_by` int DEFAULT NULL,
  `status` enum('actif','inactif') DEFAULT 'actif',
  `notes` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mail` (`mail`),
  KEY `referred_by` (`referred_by`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `adh_members`
--

INSERT INTO `adh_members` (`id`, `name`, `surname`, `mail`, `password`, `role`, `phone`, `address`, `complement`, `city`, `cp`, `date_of_birth`, `gender`, `profile_picture`, `membership_type`, `membership_start`, `membership_end`, `payment_status`, `payment_method`, `preferred_contact`, `newsletter_subscription`, `last_login`, `referred_by`, `status`, `notes`, `created_at`, `updated_at`) VALUES
(1, 'Jean', 'Dupont', 'jean.dupont@example.com', '', 'member', '0612345678', '10 rue de Paris', NULL, 'Paris', '75001', '1985-06-15', 'Monsieur', NULL, 'single', '2024-01-01', '2025-01-01', 'paid', 'card', 'email', 1, NULL, NULL, 'actif', 'Membre fidèle depuis 5 ans', '2025-04-04 10:39:19', '2025-04-04 10:39:19'),
(2, 'Marie', 'Curie', 'marie.curie@example.com', '', 'member', '0623456789', '5 avenue des Lumières', '', 'Lyon', '69003', '1990-11-07', 'Madame', NULL, 'duo', '2023-06-01', '2024-06-01', 'pending', 'paypal', 'phone', 0, NULL, NULL, 'actif', 'Nouvelle adhérente, scientifique reconnue', '2025-04-04 10:39:19', '2025-05-12 16:23:38'),
(3, 'Albert', 'Einstein', 'albert.einstein@example.com', '', 'member', '0634567890', '3 boulevard Relativité', NULL, 'Nice', '06000', '1879-03-14', 'Monsieur', NULL, 'family', '2022-09-10', '2023-09-10', 'overdue', 'cash', 'sms', 1, NULL, NULL, 'inactif', 'Physicien mondialement connu', '2025-04-04 10:39:19', '2025-04-04 10:39:19'),
(4, 'Isaac', 'Newton', 'isaac.newton@example.com', '', 'member', '0645678901', '12 rue de la Gravité', NULL, 'Londres', 'WC2N', '1643-01-04', 'Monsieur', NULL, 'single', '2023-02-15', '2024-02-15', 'paid', 'transfer', 'email', 1, NULL, NULL, 'actif', 'Passionné de physique et d’astronomie', '2025-04-04 10:39:19', '2025-04-04 10:39:19'),
(5, 'Nikola', 'Tesla', 'nikola.tesla@example.com', '', 'member', '0656789012', '99 avenue de l’Électricité', NULL, 'Belgrade', '11000', '1856-07-10', 'Monsieur', NULL, 'duo', '2023-08-20', '2024-08-20', 'pending', 'paypal', 'phone', 1, NULL, NULL, 'actif', 'Toujours en avance sur son temps', '2025-04-04 10:39:19', '2025-04-04 10:39:19'),
(6, 'Ada', 'Lovelace', 'ada.lovelace@example.com', '', 'member', '0667890123', '8 boulevard des Algorithmes', NULL, 'Londres', 'W1B', '1815-12-10', 'Madame', NULL, 'family', '2024-03-01', '2025-03-01', 'paid', 'card', 'sms', 1, NULL, NULL, 'actif', 'Mathématicienne et pionnière en informatique', '2025-04-04 10:39:19', '2025-04-04 10:39:19'),
(7, 'Galilée', 'Galileo', 'galilee.galileo@example.com', '', 'member', '0678901234', '7 place des Étoiles', NULL, 'Pise', '56100', '1564-02-15', 'Monsieur', NULL, 'single', '2022-12-05', '2023-12-05', 'overdue', 'cash', 'email', 0, NULL, NULL, 'inactif', 'Astronome et physicien révolutionnaire', '2025-04-04 10:39:19', '2025-04-04 10:39:19'),
(8, 'Leonardo', 'da Vinci', 'leonardo.davinci@example.com', '', 'member', '0689012345', '21 rue de l’Art', NULL, 'Florence', '50100', '1452-04-15', 'Monsieur', NULL, 'duo', '2023-05-10', '2024-05-10', 'paid', 'transfer', 'none', 1, NULL, NULL, 'actif', 'Génie universel et artiste de renom', '2025-04-04 10:39:19', '2025-04-04 10:39:19'),
(9, 'Marie', 'Antoinette', 'marie.antoinette@example.com', '', 'member', '0690123456', 'Château de Versailles', NULL, 'Versailles', '78000', '1755-11-02', 'Madame', NULL, 'family', '2023-07-15', '2024-07-15', 'pending', 'paypal', 'phone', 0, NULL, NULL, 'actif', 'Aime organiser des réceptions somptueuses', '2025-04-04 10:39:19', '2025-04-04 10:39:19'),
(10, 'Vincent', 'Van Gogh', 'vincent.vangogh@example.com', '', 'member', '0601234567', '2 rue des Tournesols', NULL, 'Arles', '13200', '1853-03-30', 'Monsieur', NULL, 'single', '2023-09-25', '2024-09-25', 'paid', 'card', 'sms', 1, NULL, NULL, 'actif', 'Peintre talentueux en quête de reconnaissance', '2025-04-04 10:39:19', '2025-04-04 10:39:19'),
(11, 'nathaliegnd', 'Charbonnelcvx', 'nat111933@free.fr', '', 'member', '0624401417', '7 Rue de Dantzig', '', 'PARIS', '75016', NULL, NULL, NULL, 'single', NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, 'actif', NULL, '2025-05-12 14:05:18', '2025-05-12 14:05:18'),
(12, 'jjjjjj', ',msq,m', '933@mail.fr', '', 'member', '0254589632', '15d cko^^k', '	vpxjppkp', 'jkjoijio', '84410', NULL, NULL, NULL, 'single', NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, 'actif', NULL, '2025-05-12 14:35:25', '2025-05-12 14:35:25'),
(13, 'nathaliegggg', 'Charbonnelggggg', 'nat933gggg@free.frgggg', '', 'member', '0624501144', '15 rue Cler', '', 'PARIS', '75016', NULL, NULL, NULL, 'single', NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, 'actif', NULL, '2025-05-14 13:40:56', '2025-05-14 13:40:56'),
(14, 'nathaliezzzzzzz', 'Charbonnelzzzzzzzz', 'nat9000033zz@free.fr', '', 'member', 'nat933@free.fr', '0624501410', '', 'PARIS 15', '75015', NULL, NULL, NULL, 'single', NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, 'actif', NULL, '2025-05-15 15:26:00', '2025-05-15 15:26:00'),
(15, 'Christ', 'Jésus', 'jesusChrist@neuf.fr', '$2a$10$DCHlMI8VhLFH2dGV71zTaukGeDSOPoBPeHpYLFhv7Ms.Lxz832Fhm', 'member', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'single', NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, 'actif', NULL, '2025-06-25 08:45:13', '2025-06-25 08:45:13');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
