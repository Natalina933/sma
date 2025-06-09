-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 09 juin 2025 à 10:39
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `act_activities`
--

INSERT INTO `act_activities` (`id`, `title`, `description`, `date`, `place`, `price`, `organizer_id`, `organizer`, `capacity`, `img`, `alt`, `category`, `rating`, `programme`, `inscription`, `keywords`, `created_at`) VALUES
(1, 'Excursion de fin d’année', 'Croisière commentée : Les bords de Marne au pays des guinguettes', '2025-06-07 12:30:00', 'Escale déjeuner - Débarquement à la guinguette \'Chez Gégène\' à Joinville-le-Pont', '10', 2, 'Marie-joëlle', 10, '/images/excursion.jpg', NULL, 'EnPleinAir', NULL, NULL, NULL, NULL, '2025-06-06 14:10:37'),
(2, 'Yoga détente', 'Séance de yoga douce pour se relaxer.', 'Mercredi 18h', 'Salle municipale - 12 rue des Lilas', '15', NULL, 'Studio Zen', 15, '/images/yoga.jpeg', NULL, 'Bien-être', 4.5, NULL, 'oui', 'yoga, relaxation, méditation', '2025-06-07 10:28:52'),
(3, 'Atelier peinture', 'Cours de peinture avec un artiste professionnel.', 'Samedi 15h', 'Atelier municipal - 8 rue des Arts', '30', NULL, 'Atelier des Arts', 12, '/images/peinture.jpeg', NULL, 'Activités créatives', 5.0, NULL, 'oui', 'peinture, art, créativité', '2025-06-07 10:28:52'),
(4, 'Randonnée en montagne', 'Randonnée encadrée pour découvrir la montagne.', 'Dimanche 8h', 'Massif des Alpes', '10', NULL, 'Club Rando', 25, '/images/randonnee.jpeg', NULL, 'En plein air', 4.7, NULL, 'oui', 'randonnée, nature, aventure', '2025-06-07 10:28:52'),
(5, 'Atelier cuisine', 'Apprenez à cuisiner des plats traditionnels français.', 'Vendredi 18h', 'Maison de quartier', '25', NULL, 'École de Cuisine', 10, '/images/cuisine.jpeg', NULL, 'Gastronomie', 5.0, NULL, 'oui', 'cuisine, gastronomie, découverte', '2025-06-07 10:28:52'),
(6, 'Soirée jeux de société', 'Venez jouer et découvrir de nouveaux jeux de société.', 'Vendredi 20h', 'Maison des associations', 'gratuit', NULL, 'Ludothèque Saint-Mandé', 30, '/images/scabble.jpg', NULL, 'Loisirs', 5.0, NULL, 'oui', 'jeux, divertissement, stratégie', '2025-06-07 10:28:52'),
(7, 'Méditation guidée', 'Séance de méditation en pleine conscience.', 'Dimanche 9h', 'Jardin zen - Rue de la Paix', 'gratuit', NULL, 'Association Bien-Être', 20, '/images/yoga.jpeg', NULL, 'Bien-être', 4.8, NULL, 'oui', 'méditation, bien-être, relaxation', '2025-06-07 10:28:52'),
(8, 'Cercle de lecture', 'Partagez et discutez autour de vos lectures favorites.', 'Mardi 14h', 'Bibliothèque municipale', 'gratuit', NULL, 'Club de Lecture', 15, '/images/cercle.jpg', NULL, 'Culture et savoir', 5.0, NULL, 'oui', 'lecture, littérature, discussion', '2025-06-07 10:28:52'),
(9, 'Cours de danse latine', 'Initiation et perfectionnement en salsa et bachata.', 'Mercredi 19h', 'Salle des fêtes', '20', NULL, 'Académie de Danse', 20, '/images/danse.jpeg', NULL, 'Activités sportives', 4.9, NULL, 'oui', 'danse, salsa, bachata', '2025-06-07 10:28:52'),
(10, 'Initiation au self-défense', 'Apprenez les bases de la self-défense avec un instructeur.', 'Samedi 10h', 'Gymnase municipal', '15', NULL, 'Club Self-Défense', 15, '/images/selfdefense.jpeg', NULL, 'Activités sportives', 4.6, NULL, 'oui', 'self-défense, sécurité, sport', '2025-06-07 10:28:52'),
(11, 'journée au soleil', 'journée au soleil', '2025-06-07T10:00', 'Vincennes', '150', NULL, 'admin', 16, 'blob:http://localhost:3000/e8c3c558-1787-4318-9ef3-ea245b1cdae5', 'Image de l\'activité journée au soleil', 'Gastronomie', NULL, 'ffffsdfgq', 'oui', 'journée, soleil', '2025-06-07 11:22:06'),
(12, 'Atelier découverte de la photographie', 'Présentation, exercices pratiques, échanges et conseils personnalisés', '2025-06-26T14:00', 'Maison des Associations, Salle 2', '10', NULL, 'Marie-joëlle', 10, 'blob:http://localhost:3000/8cdf0ca0-c5f5-4c61-a065-e2194e782d78', 'Image de l\'activité Atelier découverte de la photographie', 'Culture et savoir', NULL, NULL, 'oui', 'présentation, exercices, pratiques, échanges, conseils, personnalisés', '2025-06-07 12:07:11');

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
