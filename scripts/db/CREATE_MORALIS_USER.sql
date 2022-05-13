CREATE TABLE `MORALIS_USER` (
 `Id` bigint(20) NOT NULL AUTO_INCREMENT,
 `objectId` varchar(1000) NOT NULL,
 `emailVerified` tinyint(1) NOT NULL,
 `ACL` varchar(1000) NOT NULL,
 `updatedAt` date NOT NULL,
 `authData` longtext NOT NULL,
 `username` varchar(40) NOT NULL,
 `createdAt` date NOT NULL,
 `password` varchar(40) NOT NULL,
 `email` varchar(100) NOT NULL,
 `accounts` longtext NOT NULL,
 `ethAddress` varchar(256) NOT NULL,
 PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1
