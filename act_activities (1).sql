-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 06 juin 2025 à 15:35
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
-- Structure de la table `act_activities`
--

DROP TABLE IF EXISTS `act_activities`;
CREATE TABLE IF NOT EXISTS `act_activities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `date` varchar(255) NOT NULL,
  `place` varchar(255) DEFAULT NULL,
  `price` varchar(20) DEFAULT NULL,
  `organizer_id` int DEFAULT NULL,
  `organizer` varchar(255) DEFAULT NULL,
  `capacity` int DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `alt` varchar(255) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `rating` decimal(2,1) DEFAULT NULL,
  `programme` text,
  `inscription` varchar(10) DEFAULT NULL,
  `keywords` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `organizer_id` (`organizer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `act_activities`
--

INSERT INTO `act_activities` (`id`, `title`, `description`, `date`, `place`, `price`, `organizer_id`, `organizer`, `capacity`, `img`, `alt`, `category`, `rating`, `programme`, `inscription`, `keywords`, `created_at`) VALUES
(1, 'Excursion de fin d’année', 'Croisière commentée : Les bords de Marne au pays des guinguettes', '2025-06-07 12:30:00', 'Escale déjeuner - Débarquement à la guinguette \'Chez Gégène\' à Joinville-le-Pont', '10', 1, 'Marie-joëlle', 10, '/images/excursion.jpg', NULL, 'EnPleinAir', NULL, NULL, NULL, NULL, '2025-06-06 14:10:37');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `act_activities`
--
ALTER TABLE `act_activities`
  ADD CONSTRAINT `fk_organizer` FOREIGN KEY (`organizer_id`) REFERENCES `usr_users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
