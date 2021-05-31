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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla empleados_nexura.areas: ~6 rows (aproximadamente)
DELETE FROM `areas`;
/*!40000 ALTER TABLE `areas` DISABLE KEYS */;
INSERT INTO `areas` (`id`, `nombre`) VALUES
	(1, 'Administracion'),
	(2, 'Secretaria'),
	(3, 'Recursos humanos'),
	(4, 'Produccion'),
	(5, 'Finanzas'),
	(6, 'Marketing y ventas');
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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla empleados_nexura.empleados: ~7 rows (aproximadamente)
DELETE FROM `empleados`;
/*!40000 ALTER TABLE `empleados` DISABLE KEYS */;
INSERT INTO `empleados` (`id`, `nombre`, `email`, `sexo`, `area_id`, `boletin`, `descripcion`) VALUES
	(1, 'Fredy David Gonzalez Monterroza', 'fredgonz7@gmail.com', 'M', 1, 1, 'Prueba'),
	(2, 'Neira Mercado', 'mercado@gmail.com', 'F', 3, 0, 'Prueba'),
	(3, 'Juana Martinez', 'juena@gmail.com', 'F', 2, 0, 'Prueba'),
	(11, 'David', 'David.Monterroza@gmail.com', 'M', 1, 1, 'Prueba'),
	(16, 'Neira Mercado', 'neira7@gmail.com', 'F', 5, 0, 'prueba'),
	(19, 'nombres apellidos', 'correo@xxx.xx', 'M', 3, 1, 'DescripciÃ³n'),
	(20, 'Fredy David Gonzalez', 'fredy.gonzalez@cecar.edu.co', 'M', 1, 0, '11'),
	(23, 'nombres apellidos', 'xxxxx@xxx.xx', 'M', 5, 1, 'prueba');
/*!40000 ALTER TABLE `empleados` ENABLE KEYS */;

-- Volcando estructura para tabla empleados_nexura.empleado_rol
CREATE TABLE IF NOT EXISTS `empleado_rol` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empleado_id` int(11) NOT NULL,
  `rol_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla empleados_nexura.roles: ~0 rows (aproximadamente)
DELETE FROM `roles`;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` (`id`, `nombre`) VALUES
	(0, 'No aplica'),
	(1, 'Profesional de proyectos - Desarrollador'),
	(2, 'Gerente estrategico'),
	(3, 'Auxiliar administrativo');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
