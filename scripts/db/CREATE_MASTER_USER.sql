CREATE TABLE `MASTER_USER` (
 `Master_user_Id` bigint(20) NOT NULL AUTO_INCREMENT,
 `User_name` varchar(50) NOT NULL,
 `First_name` varchar(50) NOT NULL,
 `Last_name` varchar(50) NOT NULL,
 `Email_address` varchar(200) NOT NULL,
 `User_role` varchar(200) NOT NULL,
 `Is_active` tinyint(1) NOT NULL,
 `Moralis_user_id` bigint(20) NOT NULL,
 `Wp_user_id` bigint(20) NOT NULL,
 PRIMARY KEY (`Master_user_Id`),
 KEY `FK_1` (`Moralis_user_id`),
 CONSTRAINT `FK_1` FOREIGN KEY (`Moralis_user_id`) REFERENCES `MORALIS_USER` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1
