<?php

/**
 * ClaSerEmplado class 
 * 
 * clase que contiene un metodo, el cual se encarga de recibir todas las peticiones relacionas con los empleados
 */

class ClaSerEmpleado
{
    /**
     * atender_peticion function
     * 
     * encargada:
     * - realizar la conexion con la base de datos
     * - ejecutar el metodo solicitado
     * 
     * @param [object] $locobj
     * @return json
     */
    function atender_peticion($locobj)
    {
        include_once 'conexion.php';
        if (!isset($objconexion)) {
            $objconexion = new Conexion();
        }
        // verifica que la conexion sea exitosa
        $conexionPDO = $objconexion->conexionPDO();
        if (!$conexionPDO) {
            return json_encode(array('estado' => "0", 'mensaje' => "Error, al conectarse a la base de datos"));
        }

        include_once("claempleado.php");
        if (!isset($empleado)) {
            $emplado = new Empleado($conexionPDO);
        }
        switch ($locobj->metodo) {
            case "crear":
                $registro = array(
                    "nombre" => $locobj->nombre,
                    "email" => $locobj->email,
                    "sexo" => $locobj->sexo,
                    "area_id" => $locobj->area,
                    "descripcion" => $locobj->descripcion,
                    "boletin" => $locobj->boletin
                );
                return $emplado->crear($registro);
                break;
                
            case "actualizar":
                if ((isset($locobj->id))
                    && (!empty($locobj->id))
                ) {
                    $registro = array(
                        $locobj->id,
                        $locobj->nombre,
                        $locobj->email,
                        $locobj->sexo,
                        $locobj->area,
                        $locobj->descripcion,
                        $locobj->boletin
                    );
                    return $emplado->actualizar($registro);
                } else {
                    return json_encode(array("estado" => "0", "mensaje" => "Error, datos no esperados"));
                }
                break;
            case "eliminar":
                if ((isset($locobj->id))
                    && (!empty($locobj->id))
                ) {
                    return $emplado->eliminar($locobj->id);
                } else {
                    return json_encode(array("estado" => "0", "mensaje" => "Error, datos no esperados"));
                }
                break;
            case "listar_empleados":
                return $emplado->listar_empleados();
                break;
            default:
                return json_encode(array('estado' => "0", 'mensaje' => "Error, metodo"));
                break;
        }
    }
}
