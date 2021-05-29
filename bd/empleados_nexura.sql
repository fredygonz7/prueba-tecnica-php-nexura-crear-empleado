-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         5.7.24 - MySQL Community Server (GPL)
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para empleados_nexura
CREATE DATABASE IF NOT EXISTS `empleados_nexura` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `empleados_nexura`;

-- Volcando estructura para tabla empleados_nexura.areas
CREATE TABLE IF NOT EXISTS `areas` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador del area',
  `nombre` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla empleados_nexura.areas: ~0 rows (aproximadamente)
DELETE FROM `areas`;
/*!40000 ALTER TABLE `areas` DISABLE KEYS */;
/*!40000 ALTER TABLE `areas` ENABLE KEYS */;

-- Volcando estructura para tabla empleados_nexura.empleados
CREATE TABLE IF NOT EXISTS `empleados` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `sexo` char(1) NOT NULL,
  `area_id` int(11) NOT NULL,
  `boletin` int(11) NOT NULL,
  `descripcion` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla empleados_nexura.empleados: ~2 rows (aproximadamente)
DELETE FROM `empleados`;
/*!40000 ALTER TABLE `empleados` DISABLE KEYS */;
INSERT INTO `empleados` (`id`, `nombre`, `email`, `sexo`, `area_id`, `boletin`, `descripcion`) VALUES
	(1, 'Fredy Gonzalez', 'fredgonz7@gmail.com', 'M', 1, 0, 'Prueba'),
	(2, 'Fredy Gonzalez', 'fredgonz7@gmail.com', 'M', 1, 1, 'Prueba'),
	(3, 'David Gonzalez', 'fredg@gmail.com', 'M', 2, 1, 'Prueba'),
	(4, 'Fredy Gonzalez', 'fredgonz7@gmail.com', 'M', 1, 1, 'Prueba'),
	(5, 'Fredy Gonzalez', 'fredgonz7@gmail.com', 'M', 1, 1, 'Prueba'),
	(6, 'Fredy Gonzalez', 'fredgonz7@gmail.com', 'M', 1, 1, 'Prueba'),
	(7, 'Fredy Gonzalez', 'fredgonz7@gmail.com', 'M', 1, 1, 'Prueba'),
	(8, 'Fredy Gonzalez', 'fredgonz7@gmail.com', 'M', 1, 1, 'Prueba'),
	(9, 'Fredy Gonzalez', 'fredgonz7@gmail.com', 'M', 1, 1, 'Prueba'),
	(10, 'Fredy Gonzalez', 'fredgonz7@gmail.com', 'M', 1, 1, 'Prueba'),
	(11, 'Fredy Gonzalez', 'fredgonz7@gmail.com', 'M', 1, 1, 'Prueba'),
	(12, 'Fredy Gonzalez', 'fredgonz7@gmail.com', 'M', 1, 1, 'Prueba');
/*!40000 ALTER TABLE `empleados` ENABLE KEYS */;

-- Volcando estructura para tabla empleados_nexura.empleado_rol
CREATE TABLE IF NOT EXISTS `empleado_rol` (
  `empleado_id` int(11) NOT NULL,
  `rol_id` int(11) NOT NULL,
  PRIMARY KEY (`empleado_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla empleados_nexura.empleado_rol: ~0 rows (aproximadamente)
DELETE FROM `empleado_rol`;
/*!40000 ALTER TABLE `empleado_rol` DISABLE KEYS */;
/*!40000 ALTER TABLE `empleado_rol` ENABLE KEYS */;

-- Volcando estructura para tabla empleados_nexura.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla empleados_nexura.roles: ~0 rows (aproximadamente)
DELETE FROM `roles`;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
