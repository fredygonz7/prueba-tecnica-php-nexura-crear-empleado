mostrar_lista_empleados_inicio();
//mostrar_formulario_empleado();
document.getElementById("inicio").addEventListener("click", mostrar_lista_empleados_inicio);
// document.getElementById("mostrar-formulario-empleado").addEventListener("click", mostrar_formulario_empleado);

document.getElementById("crear-empleado-form").addEventListener("submit", function (event) {
    event.preventDefault();
    crear_empleado_form();
});


/**
 * esta funcion esta encargada de mostrar el inicio, una tabla con todos los empleados
 * 
 */
function mostrar_lista_empleados_inicio() {
    
    //ClaseAJAX.loadDoc("include/tabla-lista-empleados.html", "main");
    // const objJSON = 'parjson={"objeto": "empleado", "metodo": "listar_empleados"}';
    const objJSON = {
        objeto: "empleado",
        metodo: "listar_empleados"
    }
    const parJSON = 'parjson=' + JSON.stringify(objJSON);
    // console.log(parJSON,'parjson');

    ClaseAJAX.solicitar_url("./php/servidor.php", "POST", parJSON, mostrar_empleados_lista_callback);
}

/**
 * se ejecuta cuando se recibe la respuesta de mostrar empleados inicio
 * crea y llena cada fila la lista de empleados
 * @param {JSON} parametroJSON 
 */
function mostrar_empleados_lista_callback(parametroJSON) {
    
    locobj = JSON.parse(parametroJSON);
    // console.log(locobj.mensaje, "  -  ", locobj.estado, "  -  length", locobj.datos.length, "  -  ", locobj.datos[0]);
    // return;
    if (locobj.estado == "1") {
        let tbody = document.getElementById("empleados-lista-tbody");
        while (tbody.hasChildNodes()) {
            tbody.removeChild(tbody.firstChild);
        }

        //if para poder mostrar un solo empleado
        if (typeof locobj.datos.length === "undefined") {
            locobj.datos = [locobj.datos];
            console.log(locobj.datos[0], "mango");
        }
        for (let i = 0; i < locobj.datos.length; i++) {

            let fila = document.createElement("tr");

            arrayEtiquetas = [
                "nombre",
                "email",
                "sexo",
                "area_id",
                "boletin"
            ];

            arrayEtiquetas.forEach((element) => {
                let td = document.createElement("td");
                let text = document.createTextNode(locobj.datos[i][element]);
                td.appendChild(text);
                fila.appendChild(td);
                // fila.appendChild(document.createElement("td").appendChild(document.createTextNode(locobj.datos[i][element])));
            });

            let columnaBoton = document.createElement("td");
            let aEditar = document.createElement("a");
            let textoEditar = document.createTextNode("Editar");
            aEditar.href = "#";
            aEditar.appendChild(textoEditar);
            aEditar.setAttribute("data-empleado", locobj.datos[i].id);
            aEditar.onclick = function () { editar_empleado(this) };
            // columnaBoton.className = "cursor_pointer";
            columnaBoton.appendChild(aEditar);
            // fila.appendChild(columnaBoton);

            // let columnaBoton = document.createElement("td");
            let aEliminar = document.createElement("a");
            let textoEliminar = document.createTextNode("Eliminar");
            aEliminar.href = "#";
            aEliminar.appendChild(textoEliminar);
            aEliminar.setAttribute("data-empleado", locobj.datos[i].id);
            aEliminar.onclick = function () { eliminar_empleado(this) };
            // columnaBoton.className = "cursor_pointer";
            columnaBoton.appendChild(aEliminar);
            fila.appendChild(columnaBoton);

            tbody.appendChild(fila);
        }
    }
    else {
        let contenedor = document.getElementById("empleados-lista-tbody");
        while (contenedor.hasChildNodes()) {
            contenedor.removeChild(contenedor.firstChild);
        }
        alert(locobj.mensaje);
    }
}


/**
 * submit del formulario crear empleado
 */

function crear_empleado_form() {

    console.log("crear empleado form")
    let nombre = document.getElementById("nombre-completo").value;
    let email = document.getElementById("email").value;
    let sexo = (document.getElementById("sexoM").checked ? "M" : "F");
    let area = document.getElementById("area").value;
    let descripcion = document.getElementById("descripcion").value;
    let boletin = (document.getElementById("sexoM").checked ? "1" : "0");
    // let rolProfesionall = (document.getElementById("rol-profesionall").checked ? "1" : "");
    // let rolGerente = (document.getElementById("rol-gerente").checked ? "2" : "");
    // let rolAuxiliar = (document.getElementById("rol-auxiliar").checked ? "3" : "");

    const data = {
        objeto: "empleado",
        metodo: "crear",
        // campos: {
            nombre,
            email,
            sexo,
            area,
            descripcion,
            boletin
        // }
    }
    const parJSON = 'parjson=' + JSON.stringify(data);
    
    ClaseAJAX.solicitar_url("./php/servidor.php", "POST", parJSON, respuesta_crear_empleado);
}

function respuesta_crear_empleado(parametroJSON) {
    
    locobj = JSON.parse(parametroJSON);
    if (locobj.estado == "1") {
        document.getElementById("crear-empleado-form").reset();
        alert(locobj.mensaje);
        mostrar_lista_empleados_inicio();
    }
    else alert(locobj.mensaje);
}

/**
 * elimina un empleado
 * @param {object} element
 */
function eliminar_empleado(element) {
    if (confirm("Esta seguro que desea eliminar este empleado!")) {
        const objJSON = {
            id: element.getAttribute("data-empleado"),
            objeto: "empleado",
            metodo: "eliminar"
        }
        const parJSON = 'parjson=' + JSON.stringify(objJSON);
        ClaseAJAX.solicitar_url("./php/servidor.php", "POST", parJSON, respuesta_eliminar_empleado);
    }
}
/**
 * muesta un mensaje en caso de que el empleado no se haya eliminado
 * o carga nuevamente la tabla 
 * @param {json} parametroJSON 
 */
function respuesta_eliminar_empleado(parametroJSON) {
    locobj = JSON.parse(parametroJSON);
    if (locobj.estado == "1") mostrar_lista_empleados_inicio();
    else alert(locobj.mensaje);
}