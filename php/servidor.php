<?php

/**
 * servidor, se utiliza para la comunicacion
 * todas las solicitudes llegan aqui y desde aqui siguen al objeto deseado
 */

include_once 'clajson.php';

if (isset($_POST['parjson']) && !empty($_POST['parjson'])) {

    $locobj = json_decode($_POST['parjson']);
    
    if (!isset($objjson)) $objjson = new clajson();
    if ($objeto = $locobj->objeto ?? false) {
        switch ($objeto) {
            
            case "empleado":
                include_once("claserempleado.php");

                if (!isset($objserempleado)) $objserempleado = new ClaSerEmpleado();

                echo $objserempleado->atender_peticion($locobj);
                break;

            default:
                echo $objjson->preparar_json(["estado", "mensaje", "registros"], ["-1", "Objeto no valido", "0"]);
                break;
        }
    } else {
        echo $objjson->preparar_json(["estado", "mensaje", "registros"], ["-1", "Entrada no valida", "0"]);
    }
} else {
    echo $objjson->preparar_json(["estado", "mensaje", "registros"], ["-1", "Digite los datos", "0"]);
}
