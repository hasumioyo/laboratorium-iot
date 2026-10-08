-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 08, 2026 at 11:12 AM
-- Server version: 26.7.0
-- PHP Version: 8.4.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_inventaris`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` varchar(10) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `level` enum('Admin','Petugas') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`, `level`) VALUES
('AD001', 'angel', '$2b$10$.xiz2j0LiL9SstEVpPah1OeX1Qb6wJ3ui4.3i7O03tbU4vMDjvwkq', 'Admin'),
('PT002', 'Angelina', '$2b$10$8.LeZUlhhiiOzE.9xrF/DOjude3Ibzut5gRzjaXXskuuV26NNAkDy', 'Petugas'),
('PT003', 'Angelinawqcacacac', '$2b$10$2Ddf01kxtzmNGOHfgpsGR.QI4p1GJ96juqEdCmKdXpmPDJ00plVOO', 'Petugas'),
('PT004', 'wwwwww', '$2b$10$NIHoHr.dSpnbMVtRKbrD1.ifPKQaJzGZB2s/.RerWc9euEurHuo8i', 'Petugas');

-- --------------------------------------------------------

--
-- Table structure for table `inventaris`
--

CREATE TABLE `inventaris` (
  `id` int NOT NULL,
  `nama_barang` varchar(100) NOT NULL,
  `kategori` enum('Mikrokontroler','Sensor','Akuator','') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `jumlah` int NOT NULL,
  `kondisi` enum('Baik','Tidak Baik') NOT NULL,
  `lokasi` enum('Ruang Praktikum','Laboratorium IoT 1','Laboratorium IoT 2','Gudang Peralatan') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `tanggal_masuk` date NOT NULL,
  `petugas` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `inventaris`
--

INSERT INTO `inventaris` (`id`, `nama_barang`, `kategori`, `jumlah`, `kondisi`, `lokasi`, `tanggal_masuk`, `petugas`) VALUES
(156, 'sss', 'Mikrokontroler', 5, 'Baik', 'Laboratorium IoT 1', '2026-10-08', 'PT002'),
(157, 'dddd', 'Mikrokontroler', 1, 'Baik', 'Ruang Praktikum', '2026-10-13', 'PT003');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inventaris`
--
ALTER TABLE `inventaris`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_inventaris_petugas` (`petugas`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `inventaris`
--
ALTER TABLE `inventaris`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=206;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `inventaris`
--
ALTER TABLE `inventaris`
  ADD CONSTRAINT `fk_inventaris_petugas` FOREIGN KEY (`petugas`) REFERENCES `admin` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
