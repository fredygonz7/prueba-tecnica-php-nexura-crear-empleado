mostrar_lista_empleados_inicio();
//mostrar_formulario_empleado();
document.getElementById("inicio").addEventListener("click", mostrar_lista_empleados_inicio);
// document.getElementById("mostrar-formulario-empleado").addEventListener("click", mostrar_formulario_empleado);

document.getElementById("crear-empleado-form").addEventListener("submit", function (event) {
    event.preventDefault();
    if (document.getElementById("nombre-completo").getAttribute("data-empleado") == "")
        crear_empleado_form();
    else
        modificar_empleado_form();
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
    try {
        locobj = JSON.parse(parametroJSON);
    } catch (error) {
        alert("Datos inesperados del servidor");
        return false;
    }
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

                // modifica el valor de boletin (1 = Si, 0 = No)
                if (element == "boletin") {
                    if (locobj.datos[i][element] == "1")
                        text = document.createTextNode("Si");
                    else if (locobj.datos[i][element] == "1")
                        text = document.createTextNode("No");
                }
                td.appendChild(text);
                fila.appendChild(td);
                // fila.appendChild(document.createElement("td").appendChild(document.createTextNode(locobj.datos[i][element])));
            });

            let columnaBoton = document.createElement("td");
            let aEditar = document.createElement("a");
            let textoEditar = document.createTextNode("Modificar");
            aEditar.href = "#";
            aEditar.appendChild(textoEditar);
            aEditar.setAttribute("data-empleado", locobj.datos[i].id);
            aEditar.onclick = function () { consultar_empleado_para_modificar(this) };
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

function mostrar_formulario() {
    $("#crear-empleado-form").trigger("reset");
    document.getElementById("nombre-completo").setAttribute("data-empleado", "");
    $('#formularioModal').modal('show');
}
function ocultar_formulario() {
    $('#formularioModal').modal('hide');
}

/**
 * 
 */
let nombre;
let email;
let sexo;
let area;
let descripcion;
let boletin;
function obtenerDatosDelFormulario() {
    nombre = document.getElementById("nombre-completo").value;
    email = document.getElementById("email").value;
    sexo = (document.getElementById("sexoM").checked ? "M" : "F");
    area = document.getElementById("area").value;
    descripcion = document.getElementById("descripcion").value;
    boletin = (document.getElementById("boletin").checked ? "1" : "0");
}



/**
 * submit del formulario crear empleado
 */

function crear_empleado_form() {

    console.log("crear empleado form")
    // let nombre = document.getElementById("nombre-completo").value;
    // let email = document.getElementById("email").value;
    // let sexo = (document.getElementById("sexoM").checked ? "M" : "F");
    // let area = document.getElementById("area").value;
    // let descripcion = document.getElementById("descripcion").value;
    // let boletin = (document.getElementById("sexoM").checked ? "1" : "0");

    // let rolProfesionall = (document.getElementById("rol-profesionall").checked ? "1" : "");
    // let rolGerente = (document.getElementById("rol-gerente").checked ? "2" : "");
    // let rolAuxiliar = (document.getElementById("rol-auxiliar").checked ? "3" : "");
    obtenerDatosDelFormulario();

    const data = {
        objeto: "empleado",
        metodo: "crear",
        campos: {
            nombre,
            email,
            sexo,
            area,
            descripcion,
            boletin
        }
    }
    const parJSON = 'parjson=' + JSON.stringify(data);

    ClaseAJAX.solicitar_url("./php/servidor.php", "POST", parJSON, respuesta_crear_empleado);
}
function respuesta_crear_empleado(parametroJSON) {
    try {
        locobj = JSON.parse(parametroJSON);
        if (locobj.estado == "1") {
            $("#crear-empleado-form").trigger("reset");
            ocultar_formulario();
            alert(locobj.mensaje);
            mostrar_lista_empleados_inicio();
        }
        else alert(locobj.mensaje);
    } catch (error) {
        alert("Datos inesperados del servidor");
    }
}

/**
 * elimina un empleado
 * @param {object} element
 */
function eliminar_empleado(element) {
    if (confirm("¡Esta seguro que desea eliminar este empleado!")) {
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
    try {
        locobj = JSON.parse(parametroJSON);
        if (locobj.estado == "1") mostrar_lista_empleados_inicio();
        else alert(locobj.mensaje);

    } catch (error) {
        alert("Datos inesperados del servidor");
    }
}


/**
 * consulta un empleado
 * 
 * @param {object} element
 */
function consultar_empleado_para_modificar(element) {

    let id = element.getAttribute("data-empleado");
    if (!(isNaN(id)) && (id != "")) {
        const objJSON = {
            id,
            objeto: "empleado",
            metodo: "leer"
        }
        const parJSON = 'parjson=' + JSON.stringify(objJSON);
        ClaseAJAX.solicitar_url("./php/servidor.php", "POST", parJSON, respuesta_consultar_empleado_para_modificar);
    }
    else
        alert("Debe digitar un numero");
}
function respuesta_consultar_empleado_para_modificar(parametroJSON) {
    try {
        locobj = JSON.parse(parametroJSON);
    } catch (error) {
        alert("Datos inesperados del servidor");
        return false;
    }
    if (locobj.estado == "1") cargar_empleado_en_form(locobj);
    else alert(locobj.mensaje);
}

/**
 * carga los datos del empleado consultado
 *
 * @param {json} parametroJSON
 */
function cargar_empleado_en_form({ datos }) {
    mostrar_formulario();
    let nombre = document.getElementById("nombre-completo")
    nombre.value = datos.nombre;
    nombre.setAttribute("data-empleado", datos.id);
    document.getElementById("email").value = datos.email;
    document.getElementById("area").value = datos.area_id;
    descripcion = document.getElementById("descripcion").value = datos.descripcion;

    if (datos.sexo == "M")
        document.getElementById("sexoM").checked = true;
    else
        document.getElementById("sexoF").checked = true;

    (datos.boletin == "1" ? document.getElementById("boletin").checked = true : document.getElementById("boletin").checked = false);
}

/**
 * modifica un empleado
 * @param void
 */
function modificar_empleado_form() {
    obtenerDatosDelFormulario();
    if (confirm("¡Esta seguro que desea modificar el empleado!")) {
        const data = {
            objeto: "empleado",
            metodo: "actualizar",
            campos: {
                id: document.getElementById("nombre-completo").getAttribute("data-empleado"),
                nombre,
                email,
                sexo,
                area,
                descripcion,
                boletin,
            }
        }
        const parJSON = 'parjson=' + JSON.stringify(data);
        ClaseAJAX.solicitar_url("./php/servidor.php", "POST", parJSON, respuesta_modificar_empleado);
    }
}
function respuesta_modificar_empleado(parametroJSON) {
    try {
        locobj = JSON.parse(parametroJSON);
        if (locobj.estado == "1") {
            document.getElementById("crear-empleado-form").reset();
            alert(locobj.mensaje);
            ocultar_formulario()
            mostrar_lista_empleados_inicio();
        }
        else alert(locobj.mensaje);
    } catch (error) {
        alert("Datos inesperados del servidor");
    }
}