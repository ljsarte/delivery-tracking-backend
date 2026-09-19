-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 19, 2026 at 03:25 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `delivery_tracking`
--

-- --------------------------------------------------------

--
-- Table structure for table `deliveries`
--

CREATE TABLE `deliveries` (
  `id` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  `riderId` int(11) NOT NULL,
  `status` enum('assigned','picked_up','in_transit','delivered','failed') NOT NULL DEFAULT 'assigned',
  `currentLat` decimal(10,6) DEFAULT NULL,
  `currentLng` decimal(10,6) DEFAULT NULL,
  `deliveredAt` timestamp NULL DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `deliveries`
--

INSERT INTO `deliveries` (`id`, `orderId`, `riderId`, `status`, `currentLat`, `currentLng`, `deliveredAt`, `notes`, `updatedAt`) VALUES
(5, 1, 1, 'delivered', NULL, NULL, '2026-09-19 08:38:49', NULL, '2026-09-19 16:38:49.000000');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `customerId` int(11) NOT NULL,
  `pickupAddress` varchar(255) NOT NULL,
  `dropoffAddress` varchar(255) NOT NULL,
  `itemDescription` text DEFAULT NULL,
  `status` enum('pending','dispatched','completed','cancelled') NOT NULL DEFAULT 'pending',
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `customerId`, `pickupAddress`, `dropoffAddress`, `itemDescription`, `status`, `createdAt`) VALUES
(1, 1, '123 Rizal St, Imus, Cavite', '456 Aguinaldo Hwy, Dasmariñas, Cavite', 'Documents package', 'completed', '2026-09-19 16:01:05.217255'),
(2, 1, '123 Rizal St, Imus, Cavite', '456 Aguinaldo Hwy, Dasmariñas, Cavite', 'Documents package', 'pending', '2026-09-19 16:13:48.753352'),
(3, 1, '123 Rizal St, Imus, Cavite', '456 Aguinaldo Hwy, Dasmariñas, Cavite', 'Documents package', 'pending', '2026-09-19 16:13:52.628664');

-- --------------------------------------------------------

--
-- Table structure for table `riders`
--

CREATE TABLE `riders` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `vehicleType` varchar(50) NOT NULL,
  `licensePlate` varchar(20) DEFAULT NULL,
  `isAvailable` tinyint(4) NOT NULL DEFAULT 1,
  `currentLat` decimal(10,6) DEFAULT NULL,
  `currentLng` decimal(10,6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `riders`
--

INSERT INTO `riders` (`id`, `userId`, `vehicleType`, `licensePlate`, `isAvailable`, `currentLat`, `currentLng`) VALUES
(1, 1, 'motorcycle', 'ABC-123', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullName` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `role` enum('customer','rider','admin') NOT NULL DEFAULT 'customer',
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullName`, `email`, `password`, `phone`, `role`, `createdAt`) VALUES
(1, 'Lj Sarte', 'lorenzjustinsarte@gmail.com', '$2b$10$w0207LYgPL.sDeBbJqUQj.2jZXPAGfkJT.AnHw2IRZA8GYiH0WDSa', NULL, 'customer', '2026-09-19 12:07:44.924486'),
(2, 'Pedro Rider', 'pedro.rider@test.com', '$2b$10$PyHEuQJW9AJ4Fz.IDKeopekA.Jr6gJvL67.KFGUkeyYsWLTYZBsXq', NULL, 'rider', '2026-09-19 15:31:54.933823'),
(3, 'Test User', 'test@test.com', '$2b$10$/E81gKPEF.CN75xSKX489eumU0g50G34442ytt61eLl2cAIBvR0r2', NULL, 'customer', '2026-09-19 19:53:08.998603');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `deliveries`
--
ALTER TABLE `deliveries`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `REL_f7433e3639e213f901e22cf864` (`orderId`),
  ADD KEY `FK_b7db6457af9341c4446be5f1e74` (`riderId`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_e5de51ca888d8b1f5ac25799dd1` (`customerId`);

--
-- Indexes for table `riders`
--
ALTER TABLE `riders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `REL_28d2f063ec2ca9775e57754bf0` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `deliveries`
--
ALTER TABLE `deliveries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `riders`
--
ALTER TABLE `riders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `deliveries`
--
ALTER TABLE `deliveries`
  ADD CONSTRAINT `FK_b7db6457af9341c4446be5f1e74` FOREIGN KEY (`riderId`) REFERENCES `riders` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_f7433e3639e213f901e22cf8640` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `FK_e5de51ca888d8b1f5ac25799dd1` FOREIGN KEY (`customerId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `riders`
--
ALTER TABLE `riders`
  ADD CONSTRAINT `FK_28d2f063ec2ca9775e57754bf0a` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
