-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 09 juin 2025 à 13:03
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
  `category_id` int DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `inscription` varchar(10) DEFAULT NULL,
  `keywords` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `organizer_id` (`organizer_id`),
  KEY `category_id` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `act_activities`
--

INSERT INTO `act_activities` (`id`, `title`, `description`, `date`, `place`, `price`, `organizer_id`, `organizer`, `capacity`, `img`, `alt`, `category_id`, `category`, `inscription`, `keywords`, `created_at`) VALUES
(1, 'Atelier découverte de la photographie', 'Initiez-vous à la photographie avec un professionnel. Apportez votre appareil ou votre smartphone.', '2025-07-15T18:00', 'Maison des Associations, Salle 2', 'gratuit', NULL, 'Club Photo Saint-Mandé', 15, '/images/photo-atelier.jpg', 'Image de l\'activité Atelier découverte de la photographie', 3, 'Culture et savoir', 'oui', 'photographie, atelier, découverte, loisir', '2025-06-09 10:43:55'),
(2, 'Yoga détente', 'Séance de yoga douce pour se relaxer.', '2025-06-20T18:00', 'Salle municipale - 12 rue des Lilas', '15', NULL, 'Studio Zen', 15, '/images/yoga.jpeg', 'Image de l\'activité Yoga détente', 1, 'Bien-être', 'oui', 'yoga, relaxation, méditation', '2025-06-09 10:43:55');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `act_activities`
--
ALTER TABLE `act_activities`
  ADD CONSTRAINT `fk_category` FOREIGN KEY (`category_id`) REFERENCES `act_categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_organizer` FOREIGN KEY (`organizer_id`) REFERENCES `usr_users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
