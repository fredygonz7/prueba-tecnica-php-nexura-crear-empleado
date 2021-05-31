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
                if ($this->validar_campos($locobj)) {
                    $registro = array(
                        "nombre"        => $locobj->campos->nombre,
                        "email"         => $locobj->campos->email,
                        "sexo"          => $locobj->campos->sexo,
                        "area_id"       => $locobj->campos->area,
                        "descripcion"   => $locobj->campos->descripcion,
                        "boletin"       => $locobj->campos->boletin
                    );
                    return $empleado->crear($registro);
                } else {
                    return json_encode(array("estado" => "0", "mensaje" => "Error, verifique los campos"));
                }
                break;

            case "actualizar":
                if ($this->validar_campo_id($locobj)) {
                    if ($this->validar_campos($locobj)) {
                        $registro = array(
                            $locobj->campos->nombre,
                            $locobj->campos->email,
                            $locobj->campos->sexo,
                            $locobj->campos->area,
                            $locobj->campos->descripcion,
                            $locobj->campos->boletin
                        );
                        return $empleado->actualizar(
                            $registro,
                            $locobj->campos->id
                        );
                    } else {
                        return json_encode(array("estado" => "0", "mensaje" => "Error, verifique los campos"));
                    }
                } else {
                    return json_encode(array("estado" => "0", "mensaje" => "Error, datos no validos"));
                }
                break;
            case "eliminar":
                if ($this->validar_id($locobj)) {
                    return $empleado->eliminar($locobj->id);
                } else {
                    return json_encode(array("estado" => "0", "mensaje" => "Error, datos no validos"));
                }
                break;

            case "leer":
                if ($this->validar_id($locobj)) {
                    return $empleado->leer($locobj->id);
                } else {
                    return json_encode(array("estado" => "0", "mensaje" => "Error, datos no validos"));
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

    /**
     * valida el campo id de modificar
     *
     * @param [object] $locobj
     * @return boolean
     */
    function validar_campo_id($locobj)
    {
        // probar dato de formulario id
        // $formulario = '{"campos":""}';
        // $formulario = '{"campos":{"id":"0"}}';
        // $locobj = json_decode($formulario);

        $expresionId = "/^([1-9][0-9]{0,10})$/";

        if ((!isset($locobj->campos->id))
            || (empty($locobj->campos->id))
        ) {
            return false;
        } else if (!preg_match($expresionId, $locobj->campos->id))
            return false;
        return true;
    }

    /**
     * valida id de eliminar y leer
     *
     * @param [object] $locobj
     * @return boolean
     */
    function validar_id($locobj)
    {
        $expresionId = "/^([1-9][0-9]{0,10})$/";

        if ((!isset($locobj->id))
            || (empty($locobj->id))
        ) {
            return false;
        } else if (!preg_match($expresionId, $locobj->id))
            return false;
        return true;
    }

    /**
     * valida varios campos de modificar y crear
     *
     * @param [object] $locobj
     * @return boolean
     */
    function validar_campos($locobj)
    {
        // validar datos de formulario
        // $formulario = '{"objeto":"empleado","metodo":"actualizar","campos":{"id":"1","nombre":"Fredy","email":"fredgonz7@gmail.com","sexo":"M","area":"1","descripcion":"Prueba","boletin":"0"}}';
        // $formulario = '{"campos":{"sexo":"M","area":"1","descripcion":"Prueba","boletin":"0"}}';
        // $locobj = json_decode($formulario);

        $expresionNombre = "/^([A-Za-zÁÉÍÓÚñáéíóúÑ]{2,15})([\s][A-Za-zÁÉÍÓÚñáéíóúÑ]{2,15}){0,5}$/";
        $expresionEmail = "/^[A-z][A-z0-9]{2,250}([\.][A-z0-9]{2,250})*@[A-z0-9]{3,20}[.][A-z]{2,3}([.][A-z]{2}){0,1}$/";
        $expresionSexo = "/^[MF]$/";
        $expresionAreaId = "/^([1-9][0-9]{0,10})$/";
        $expresionDescripcion = "/^([A-Za-zÁÉÍÓÚñáéíóúÑ0-9\-\.]+)([\s][A-Za-zÁÉÍÓÚñáéíóúÑ0-9\-\.]+)*$/";
        $expresionBoletin = "/^[10]$/";
        // $expresionRolProfesional = "/^[0-3]$/";
        // $expresionRolGerente = "/^[0-3]$/";
        // $expresionRolAuxiliar = "/^[0-3]$/";

        if ((!isset($locobj->campos->nombre))
            || (empty($locobj->campos->nombre))
            || (!isset($locobj->campos->email))
            || (empty($locobj->campos->email))
            || (!isset($locobj->campos->sexo))
            || (empty($locobj->campos->sexo))
            || (!isset($locobj->campos->area))
            || (empty($locobj->campos->area))
            || (!isset($locobj->campos->descripcion))
            || (empty($locobj->campos->descripcion))
            || (!isset($locobj->campos->boletin))

            // || (!isset($locobj->campos->rolProfesional))
            // || (!isset($locobj->campos->rolGerente))
            // || (!isset($locobj->campos->rolAuxiliar))
        ) {
            return false;
        }

        if (!preg_match($expresionNombre, $locobj->campos->nombre)) {
            return false;
        }
        if (!preg_match($expresionEmail, $locobj->campos->email)) {
            return false;
        }
        if (!preg_match($expresionSexo, $locobj->campos->sexo)) {
            return false;
        }
        if (!preg_match($expresionAreaId, $locobj->campos->area)) {
            return false;
        }
        if (!preg_match($expresionDescripcion, $locobj->campos->descripcion)) {
            return false;
        }
        if (!preg_match($expresionBoletin, $locobj->campos->boletin)) {
            return false;
        }

        // if (!preg_match($expresionRolProfesional, $locobj->campos->rolProfesional)) {
        //     return false;
        // }
        // if (!preg_match($expresionRolGerente, $locobj->campos->rolGerente)) {
        //     return false;
        // }
        // if (!preg_match($expresionRolAuxiliar, $locobj->campos->rolAuxiliar)) {
        //     return false;
        // }
        return true;
    }
}
