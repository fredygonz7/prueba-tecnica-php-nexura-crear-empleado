<?php

class Conexion
{
    public function conexionPDO()
    {
        $nombre_base_de_datos     =    "empleados_nexura";
        $usuario                 =    "root";
        $contraseña             =    "root";
        try {
            return new PDO('mysql:host=localhost;dbname=' . $nombre_base_de_datos, $usuario, $contraseña);
        } catch (Exception $e) {
            //$e->getMessage();
            return false;
        }
    }
}
