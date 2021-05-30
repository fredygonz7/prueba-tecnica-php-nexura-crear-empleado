<?php

/**
 * ClaSerEmpleado class 
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
            $empleado = new Empleado($conexionPDO);
        }
        switch ($locobj->metodo) {
            case "crear":
                $registro = array(
                    "nombre"        => $locobj->campos->nombre,
                    "email"         => $locobj->campos->email,
                    "sexo"          => $locobj->campos->sexo,
                    "area_id"       => $locobj->campos->area,
                    "descripcion"   => $locobj->campos->descripcion,
                    "boletin"       => $locobj->campos->boletin
                );
                return $empleado->crear($registro);
                break;
                
            case "actualizar":
                if ((isset($locobj->campos->id))
                    && (!empty($locobj->campos->id))
                ) {
                    $registro = array(
                        $locobj->campos->nombre,
                        $locobj->campos->email,
                        $locobj->campos->sexo,
                        $locobj->campos->area,
                        $locobj->campos->descripcion,
                        $locobj->campos->boletin
                    );
                    return $empleado->actualizar($registro,
                        $locobj->campos->id);
                } else {
                    return json_encode(array("estado" => "0", "mensaje" => "Error, datos no esperados"));
                }
                break;
            case "eliminar":
                if ((isset($locobj->id))
                    && (!empty($locobj->id))
                ) {
                    return $empleado->eliminar($locobj->id);
                } else {
                    return json_encode(array("estado" => "0", "mensaje" => "Error, datos no esperados"));
                }
                break;

            case "leer":
                if ((isset($locobj->id))
                    && (!empty($locobj->id))
                ) {
                    return $empleado->leer($locobj->id);
                } else {
                    return json_encode(array("estado" => "0", "mensaje" => "Error, datos no esperados"));
                }
                break;

            case "listar_empleados":
                return $empleado->listar_empleados();
                break;
            default:
                return json_encode(array('estado' => "0", 'mensaje' => "Error, metodo"));
                break;
        }
    }
}
