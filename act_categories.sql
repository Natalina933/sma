-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 09 juin 2025 à 13:00
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
-- Structure de la table `act_categories`
--

DROP TABLE IF EXISTS `act_categories`;
CREATE TABLE IF NOT EXISTS `act_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  `alt` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `act_categories`
--

INSERT INTO `act_categories` (`id`, `title`, `img`, `alt`) VALUES
(1, 'Bien-être', '/images/yoga.jpeg', 'Bien-être'),
(2, 'Gastronomie', '/images/cuisine.jpeg', 'Gastronomie'),
(3, 'Culture et savoir', '/images/cercle.jpg', 'Culture et savoir'),
(4, 'Activités sportives', '/images/danse.jpeg', 'Activités sportives'),
(5, 'En plein air', '/images/randonnee.jpeg', 'En plein air'),
(8, 'Activités créatives', NULL, NULL),
(11, 'Loisirs', NULL, NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
