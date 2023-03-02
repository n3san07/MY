-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 02 مارس 2023 الساعة 23:37
-- إصدار الخادم: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `my`
--

-- --------------------------------------------------------

--
-- بنية الجدول `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `firstname` text NOT NULL,
  `lastname` text NOT NULL,
  `email` text NOT NULL,
  `phone` int(15) NOT NULL,
  `state` text DEFAULT NULL,
  `country` text DEFAULT NULL,
  `city` text NOT NULL,
  `street` text DEFAULT NULL,
  `housenumber` int(11) DEFAULT NULL,
  `zip` int(11) DEFAULT NULL,
  `info` longtext DEFAULT NULL,
  `createdby` varchar(256) NOT NULL,
  `createTime` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `isDeleted` tinyint(4) NOT NULL DEFAULT 0,
  `gender` varchar(10) NOT NULL DEFAULT 'male'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `customers`
--

INSERT INTO `customers` (`id`, `firstname`, `lastname`, `email`, `phone`, `state`, `country`, `city`, `street`, `housenumber`, `zip`, `info`, `createdby`, `createTime`, `isDeleted`, `gender`) VALUES
(2, 'Jane', 'Doe', 'jane.doe@email.com', 987654321, 'Texas', 'USA', 'Houston', 'Broadway St', 456, 77001, 'Some additional info', 'Admin', '2023-03-03 00:34:29.000000', 0, 'Female'),
(3, 'Bob', 'Smith', 'bob.smith@email.com', 2147483647, 'New York', 'USA', 'New York City', '5th Ave', 789, 10001, 'Some additional info', 'Admin', '2023-03-03 00:34:49.000000', 0, 'Male'),
(4, 'Mary', 'Johnson', 'mary.johnson@email.com', 1112223333, 'Florida', 'USA', 'Miami', 'Ocean Dr', 1011, 33139, 'Some additional info', 'Admin', '2023-03-03 00:35:00.000000', 0, 'Female'),
(5, 'David', 'Brown', 'david.brown@email.com', 2147483647, 'California', 'USA', 'San Francisco', 'Market St', 1212, 94102, 'Some additional info', 'Admin', '2023-03-03 00:35:14.000000', 0, 'Male'),
(6, 'Emily', 'Davis', 'emily.davis@email.com', 1231231234, 'Florida', 'USA', 'Orlando', 'Orange Blossom Trl', 1415, 32809, 'Some additional info', 'Admin', '2023-03-03 00:35:28.000000', 0, 'Female'),
(36, 'John', 'Doe', 'john.doe@email.com', 1234567890, 'California', 'USA', 'Los Angeles', 'Main St', 123, 90001, 'Some additional info', 'Admin', '2023-03-03 00:33:41.000000', 1, 'Male');

-- --------------------------------------------------------

--
-- بنية الجدول `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `createdTime` datetime NOT NULL,
  `email` varchar(30) NOT NULL,
  `userName` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password` varchar(255) NOT NULL,
  `isadmin` int(10) NOT NULL DEFAULT 0
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `users`
--

INSERT INTO `users` (`id`, `createdTime`, `email`, `userName`, `password`, `isadmin`) VALUES
(23, '2023-03-01 21:15:58', 'hanigat7@gmail.com', 'hani', '76e105c3a61db1b3f13207774aeccc3c', 0),
(24, '2023-03-01 21:16:10', 'admin', 'admin', '21232f297a57a5a743894a0e4a801fc3', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userName` (`userName`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
