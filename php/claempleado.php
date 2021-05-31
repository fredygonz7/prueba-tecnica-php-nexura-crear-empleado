<?php

/**
 * Empleado Class
 * contiene todo el modelo de Empleado
 * 
 */
class Empleado
{
    private $conexion;
    /**
     * __construct function
     * 
     * al instanciar la clase Empleado se recibe como parametro un objeto conexion
     * 
     * @param [object] $objconexion
     */
    public function __construct($objconexion)
    {
        // $objconexion = new PDO('mysql:host=localhost;dbname=db_perfiles;', 'root', '');
        $this->conexion = $objconexion;
    }

    /**
     * crear function
     * 
     * metodo que crea un empleado
     * 
     * @param [array] $nuevo_registro
     * @return json
     */
    public function crear($nuevo_registro, $nuevo_registroRoles)
    {
        if (!isset($objjson)) $objjson = new clajson();

        $sql = 'INSERT INTO empleados (nombre, email, sexo, area_id, boletin, descripcion) 
                    VALUES (:nombre, :email, :sexo, :area_id, :boletin, :descripcion)';
        $resultado = $this->conexion->prepare($sql);

        if (!$resultado->execute($nuevo_registro)) {
            return json_encode(array('estado' => "0", 'mensaje' => "Error, el empleado no fue agregado"));
        } else {
            // optener el ultimo registro
            $empleado_id = $this->conexion->lastInsertId();
            // insertar los roles del empleado
            if ($this->crear_empleado_roles($nuevo_registroRoles, $empleado_id))
                return json_encode(array('estado' => "1", 'mensaje' => "El empleado fue agregado"));
            return json_encode(array('estado' => "0", 'mensaje' => "Error, el empleado fue agregado, pero no se almacenaron los roles"));
        }

        /*if (($email = $nuevo_registro["email"] ?? false)
            && (!empty($nuevo_registro["email"]))
        ) {
            $empleado = $this->buscar_empleado($email)->fetch();

            // var_dump($resultadoConsulta);
            if ($empleado === false) {
                $sql = 'INSERT INTO empleados (nombre, email, sexo, area, boletin, descripcion) 
                    VALUES (:nombre, :email, :sexo, :area, :boletin, :descripcion)';
                $resultado = $this->conexion->prepare($sql);

                if (!$resultado->execute($nuevo_registro)) {
                    return json_encode(array('estado' => "0", 'mensaje' => "Error, el empleado no fue agregado"));
                } else {
                    return json_encode(array('estado' => "1", 'mensaje' => "El empleado fue agregado"));
                }
            }
            return json_encode(array('estado' => "0", 'mensaje' => "El empleado ya existe"));
        } else {
            return $objjson->preparar_json(["estado", "mensaje"], ["0", "Error, datos no esperados"]);
        }*/
    }
    public function crear_empleado_roles($nuevo_registroRoles, $empleado_id)
    {
        $rol = 0;
        $sql = 'INSERT INTO empleado_rol (empleado_id, rol_id) 
                    VALUES (:empleado_id, :rol_id)';
        $resultado = $this->conexion->prepare($sql);
        $resultado->bindParam(':empleado_id', $empleado_id);
        $resultado->bindParam(':rol_id', $rol);

        foreach ($nuevo_registroRoles as $registroRol) {
            $rol = $registroRol;
            if (!$resultado->execute()) {
                return false;
            }
        }
        return true;
    }

    /**
     * actualizar function
     *
     * @param [array] $registro
     * @param number $id
     * @return json
     */
    public function actualizar($registro, $empleado_id, $registroRoles,  $registroIdRoles)
    {
        if ($this->buscar_empleado($empleado_id)->fetch() === false) {
            return json_encode(array('estado' => "0", 'mensaje' => "El empleado no existe"));
        } else {

            $consulta = $this->conexion->prepare("UPDATE empleados SET nombre = ?, email = ?, sexo = ?, area_id=? , descripcion = ?, boletin=? WHERE id = $empleado_id;");
            $resultado = $consulta->execute($registro);
            if ($resultado === TRUE) {
                if ($this->actulizar_empleado_roles($empleado_id, $registroRoles, $registroIdRoles))
                    return json_encode(array("estado" => "1", "mensaje" => "Empleado actualizado correctamente"));
                return json_encode(array('estado' => "0", 'mensaje' => "Error, el empleado fue actualizado, pero no se almacenaron los roles"));
            } else
                return json_encode(array("estado" => "0", "mensaje" => "El empleado no fue actualizado"));
        }
    }
    /**
     * actualiza roles de un empleado
     *
     * @param [string] $empleado_id
     * @param [array] $registroRoles de los roles que pueden tener los empleados
     * @param [array] $registroIdRoles de los ids donde esta almacenado cada rol
     * @return boolean
     */
    public function actulizar_empleado_roles($empleado_id, $registroRoles, $registroIdRoles)
    {
        for ($i = 0; $i < 3; $i++) {
            if ($registroIdRoles[$i] == "null") {
                $sqlInsert = "INSERT INTO empleado_rol (empleado_id, rol_id) 
                    VALUES ('$empleado_id', '$registroRoles[$i]')";
                $resultado = $this->conexion->prepare($sqlInsert);
                if (!$resultado->execute()) {
                    return false;
                }
            } else {
                $sql = "UPDATE empleado_rol SET empleado_id = '$empleado_id', rol_id = '$registroRoles[$i]' 
                    WHERE id = '$registroIdRoles[$i]'";
                $resultado = $this->conexion->prepare($sql);
                if (!$resultado->execute()) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * eliminar function
     *
     * @param [string] $id
     * @return json
     */
    public function eliminar($id)
    {
        if ($this->buscar_empleado($id)->fetch() === false) {
            return json_encode(array('estado' => "0", 'mensaje' => "El empleado no existe"));
        } else {
            $consulta = $this->conexion->prepare("DELETE FROM empleados WHERE id = ?;");
            $resultado = $consulta->execute([$id]);
            
            if ($resultado === TRUE)
                return json_encode(array("estado" => "1", "mensaje" => "Empleado eliminado correctamente"));
            else
                return json_encode(array("estado" => "0", "mensaje" => "El empleado no fue eliminado"));
        }
    }

    /**
     * leer function
     *
     * metodo que consulta o lee un usuario
     * 
     * @param [string] $id
     * @return json
     */
    public function leer($id)
    {
        $registro = $this->buscar_empleado_con_roles($id)->fetch(PDO::FETCH_OBJ);

        if (empty($registro)) {
            return json_encode(array("estado" => "0", "mensaje" => "El registro no existe"));
        }
        return json_encode(array('estado' => "1", 'mensaje' => "Consulta realizada", 'datos' => $registro));
    }

    /**
     * consulta todos los empleados function
     *
     * @return json
     */
    function listar_empleados()
    {
        $query = "SELECT  empleados.id, empleados.nombre, empleados.email, 
            IF ( empleados.sexo = 'M', 'Masculino', 'Femenino' ) AS sexo, 
            areas.nombre as area_id, empleados.boletin, empleados.descripcion 
            FROM  empleados
            LEFT JOIN areas ON empleados.area_id = areas.id";

        $consulta = $this->conexion->prepare($query);
        $consulta->execute();
        $empleados = $consulta->fetchAll(PDO::FETCH_OBJ);
        if (empty($empleados))
            return json_encode(array('estado' => "0", 'mensaje' => "La tabla no tiene registros"));
        else
            return json_encode(array('estado' => "1", 'mensaje' => "Consulta realizada", 'datos' => $empleados));
    }

    /**
     * buscar_empleado function
     *
     * @param [string] $id
     * @return object
     */
    private function buscar_empleado($id)
    {
        $query = "SELECT * FROM empleados WHERE id = '$id'";
        $consulta = $this->conexion->prepare($query);
        $consulta->execute();
        // var_dump($consulta);
        return $consulta;
    }


    /**
     * busca empleado con sus roles function
     *
     * @param [string] $id
     * @return object
     */
    private function buscar_empleado_con_roles($id)
    {
        $query = "SELECT  
            empleados.id, empleados.nombre, empleados.email, empleados.sexo, 
            empleados.area_id, 
            empleados.boletin, empleados.descripcion,
            
            (select empleado_rol.id
            from empleado_rol
            where empleado_id = '$id' and rol_id = 1) AS idRolProfesional,

            IF ( (select empleado_rol.rol_id
            from empleado_rol
            where empleado_id = '$id' and rol_id = 1) = 1 , 1, 0 ) AS rolProfesional,
            
            (select empleado_rol.id
            from empleado_rol
            where empleado_id = '$id' and rol_id = 2) AS idRolGerente,

            IF ( (select empleado_rol.rol_id
            from empleado_rol
            where empleado_id = '$id' and rol_id = 2) = 2 , 2, 0 ) AS rolGerente,
            
            (select empleado_rol.id
            from empleado_rol
            where empleado_id = '$id' and rol_id = 3) AS idRolAuxiliar,
            
            IF ( (select empleado_rol.rol_id
            from empleado_rol
            where empleado_id = '$id' and rol_id = 3) = 3 , 3, 0 ) AS rolAuxiliar
            
        FROM  empleados

        WHERE empleados.id = '$id'";

        $consulta = $this->conexion->prepare($query);
        $consulta->execute();
        return $consulta;
    }
}
