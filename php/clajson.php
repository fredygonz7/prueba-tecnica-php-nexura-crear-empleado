<?php
// clase json PHP
class clajson
{
    function __construct()
    {
    }

    // crea json a partir de 2 vectores 
    // ejemplo de los parametros de llegada: preparar_json(['resopesql','obsopesql'],[1,"Se ha agregado el registro satisfactoriamente."]);
    function preparar_json($pveccam, $pvecval)
    {
        $json = "{";
        for ($j = 0; $j < count($pveccam); $j++) {
            $json =  $json . '"' . $pveccam[$j] . '":"' . $pvecval[$j] . '"';
            if (!($j + 1 == count($pveccam))) {
                $json = $json . ",";
            }
        }
        $json = $json . "}";
        return $json;
    }
    // crea json a partir de 2 vectores 
    // ejemplo de los parametros de llegada: preparar_json_consulta(["estado", "mensaje","registros"],["1","Consulta realizada", mysqli_affected_rows($conexion)]).",".json_encode($usuario)."]";
    //donde .",".json_encode($usuario)."]" es otro json que se enviara tal cual, en la segunda pocision del array
    function preparar_json_consulta($pveccam, $pvecval)
    {
        $json = "{";
        for ($j = 0; $j < count($pveccam); $j++) {
            $json =  $json . '"' . $pveccam[$j] . '":"' . $pvecval[$j] . '"';
            if (!($j + 1 == count($pveccam))) {
                $json = $json . ",";
            }
        }
        $json = $json . "}";
        return $json;
    }


    function preparar_json_con($pveccam, $pvecjson)
    {
        $json = "[";
        for ($convecjson = 0; $convecjson < count($pvecjson); $convecjson++) {
            $json = $json . "{";
            //echo $pvecjson[$convecjson];
            //echo '______';
            $objjson = json_decode($pvecjson[$convecjson]);
            //echo $objjson->codetigru;
            for ($conveccam = 0; $conveccam < count($pveccam); $conveccam++) {
                $cam = $pveccam[$conveccam];
                $json =  $json . '"' . $pveccam[$conveccam] . '":"' . $objjson->$cam . '"';
                if (!($conveccam + 1 == count($pveccam))) {
                    $json = $json . ",";
                }
            }
            $json = $json . "}";
            if (!($convecjson + 1 == count($pvecjson))) {
                $json = $json . ",";
            }
        }
        $json = $json . "]";
        return $json;
    }
}