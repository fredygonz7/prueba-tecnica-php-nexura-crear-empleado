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
    public function crear($nuevo_registro)
    {
        if (!isset($objjson)) $objjson = new clajson();

        $sql = 'INSERT INTO empleados (nombre, email, sexo, area_id, boletin, descripcion) 
                    VALUES (:nombre, :email, :sexo, :area_id, :boletin, :descripcion)';
        $resultado = $this->conexion->prepare($sql);

        if (!$resultado->execute($nuevo_registro)) {
            return json_encode(array('estado' => "0", 'mensaje' => "Error, el empleado no fue agregado"));
        } else {
            return json_encode(array('estado' => "1", 'mensaje' => "El empleado fue agregado"));
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

    /**
     * actualizar function
     *
     * @param [array] $registro
     * @return json
     */
    public function actualizar($registro)
    {
        if ($this->buscar_empleado($registro[0])->fetch() === false) {
            return json_encode(array('estado' => "0", 'mensaje' => "El empleado no existe"));
        } else {

            $consulta = $this->conexion->prepare("UPDATE empleados SET nombre = ?, email = ?, sexo = ?, area=? , descripcion = ?, boletin=? WHERE id = ?;");
            $resultado = $consulta->execute($registro);
            if ($resultado === TRUE)
                return json_encode(array("estado" => "1", "mensaje" => "Empleado actualizado correctamente"));
            else
                return json_encode(array("estado" => "0", "mensaje" => "El empleado no fue actualizado"));
        }

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
            // var_dump($consulta);
            if ($resultado === TRUE)
                return json_encode(array("estado" => "1", "mensaje" => "Empleado eliminado correctamente"));
            else
                return json_encode(array("estado" => "0", "mensaje" => "El empleado no fue eliminado"));
        }
    }

    /**
     * consulta todos los empleados function
     *
     * @return json
     */
    function listar_empleados()
    {
        $query = "SELECT * FROM empleados";
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

}
