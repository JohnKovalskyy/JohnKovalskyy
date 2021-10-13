-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Czas generowania: 26 Mar 2021, 20:00
-- Wersja serwera: 10.4.14-MariaDB
-- Wersja PHP: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE `strona`;
USE `strona`;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `strona`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `cards`
--

CREATE TABLE `cards` (
  `id` int(11) NOT NULL,
  `image` text COLLATE utf8_polish_ci NOT NULL,
  `atk` int(11) NOT NULL,
  `pen` int(11) NOT NULL,
  `def` int(11) NOT NULL,
  `thorns` int(11) NOT NULL,
  `hp` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `cards`
--

INSERT INTO `cards` (`id`, `image`, `atk`, `pen`, `def`, `thorns`, `hp`) VALUES
(1, 'legendary_core.png', 1, 1, 25, 9, 69),
(2, 'fallen_angel.png', 36, 3, 1, 0, 20),
(3, 'mysterious_ring.png', 11, 1, 20, 2, 66),
(4, 'iron_horse.png', 15, 2, 7, 3, 50),
(5, 'scythe.png', 5, 30, 2, 3, 20),
(6, 'blue_gem.png', 10, 10, 10, 23, 50),
(7, 'red_gem.png', 5, 1, 21, 4, 65);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `cards`
--
ALTER TABLE `cards`
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `cards`
--
ALTER TABLE `cards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
