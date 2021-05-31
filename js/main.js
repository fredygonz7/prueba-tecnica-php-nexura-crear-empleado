mostrar_lista_empleados_inicio();
//mostrar_formulario_empleado();
document.getElementById("inicio").addEventListener("click", mostrar_lista_empleados_inicio);
// document.getElementById("mostrar-formulario-empleado").addEventListener("click", mostrar_formulario_empleado);

document.getElementById("crear-empleado-form").addEventListener("submit", function (event) {
    event.preventDefault();
    if ($("#crear-empleado-form").valid()) {
        if (document.getElementById("nombre").getAttribute("data-empleado") == "")
            crear_empleado_form();
        else
            modificar_empleado_form();
    }
});


/**
 * atributos de referencia de los campos del formulario
 */
let nombre;
let email;
let sexo;
let area;
let descripcion;
let boletin;
// let rolProfesional;
// let rolGerente;
// let rolAuxiliar;
function obtenerDatosDelFormulario() {
    nombre = document.getElementById("nombre").value;
    email = document.getElementById("email").value;
    sexo = (document.getElementById("sexoM").checked ? "M" : "F");
    area = document.getElementById("area").value;
    descripcion = document.getElementById("descripcion").value;
    boletin = (document.getElementById("boletin").checked ? "1" : "0");
    // rolProfesional = (document.getElementById("rol-profesional").checked ? "1" : "0");
    // rolGerente = (document.getElementById("rol-gerente").checked ? "2" : "0");
    // rolAuxiliar = (document.getElementById("rol-auxiliar").checked ? "3" : "0");
}

/**
 * metodo para validar email
 */
$.validator.addMethod("email",
    function (value, element) {
        return /^[A-z][A-z0-9]{2,250}([\.][A-z0-9]{2,250})*@[A-z0-9]{3,20}[.][A-z]{2,3}([.][A-z]{2}){0,1}$/.test(value);
    },
    "Solo email. xxxx@xxx.xx, xx.xx@xxxxx.xxx.xx"
);
/**
 * Validar campos de formulario
 */
$("#crear-empleado-form").validate({
    rules: {
        nombre: {
            required: true,
            minlength: 3,
            maxlength: 255
        },
        email: {
            required: true,
            minlength: 6,
            maxlength: 255,
            email: true
        },
        area: {
            required: true,
            maxlength: 11
        },
        descripcion: {
            required: true,
        },
        // boletin: {
        //     bolean
        // },
        sexo: {
            required: true
        },
        roles: {
            required: true
        }
    }
});
$(document).ready(function () {
    jQuery.extend(jQuery.validator.messages, {
        required: "Este campo es obligatorio.",
        remote: "Por favor, rellena este campo.",
        email: "Por favor, escribe una dirección de correo válida",
        url: "Por favor, escribe una URL válida.",
        date: "Por favor, escribe una fecha válida.",
        dateISO: "Por favor, escribe una fecha (ISO) válida.",
        number: "Por favor, escribe un número entero válido.",
        digits: "Por favor, escribe sólo dígitos.",
        creditcard: "Por favor, escribe un número de tarjeta válido.",
        equalTo: "Por favor, escribe el mismo valor de nuevo.",
        accept: "Por favor, escribe un valor con una extensión aceptada.",
        maxlength: jQuery.validator.format("Por favor, no escribas más de {0} caracteres."),
        minlength: jQuery.validator.format("Por favor, no escribas menos de {0} caracteres."),
        rangelength: jQuery.validator.format("Por favor, escribe un valor entre {0} y {1} caracteres."),
        range: jQuery.validator.format("Por favor, escribe un valor entre {0} y {1}."),
        max: jQuery.validator.format("Por favor, escribe un valor menor o igual a {0}."),
        min: jQuery.validator.format("Por favor, escribe un valor mayor o igual a {0}.")
    });
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
                    else if (locobj.datos[i][element] == "0")
                        text = document.createTextNode("No");
                }
                td.appendChild(text);
                fila.appendChild(td);
                // fila.appendChild(document.createElement("td").appendChild(document.createTextNode(locobj.datos[i][element])));
            });

            let columnaModificar = document.createElement("td");
            let aEditar = document.createElement("a");
            let iModificar = document.createElement("i");
            iModificar.setAttribute("class", "fas fa-edit");
            aEditar.href = "#";
            aEditar.appendChild(iModificar);
            aEditar.setAttribute("data-empleado", locobj.datos[i].id);
            aEditar.onclick = function () { consultar_empleado_para_modificar(this) };
            columnaModificar.appendChild(aEditar);
            fila.appendChild(columnaModificar);

            let columnaEliminar = document.createElement("td");
            let aEliminar = document.createElement("a");
            let iEliminar = document.createElement("i");
            iEliminar.setAttribute("class", "fas fa-trash-alt");
            aEliminar.href = "#";
            aEliminar.appendChild(iEliminar);
            aEliminar.setAttribute("data-empleado", locobj.datos[i].id);
            aEliminar.onclick = function () { eliminar_empleado(this) };
            columnaEliminar.appendChild(aEliminar);
            fila.appendChild(columnaEliminar);

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
    document.getElementById("nombre").setAttribute("data-empleado", "");
    $('#formularioModal').modal('show');
}
function ocultar_formulario() {
    $('#formularioModal').modal('hide');
}

/**
 * submit del formulario crear empleado
 */
function crear_empleado_form() {

    console.log("crear empleado form")
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
            boletin,
            // rolProfesional,
            // rolGerente,
            // rolAuxiliar,
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
        if (locobj.estado == "1")
            mostrar_lista_empleados_inicio();
        alert(locobj.mensaje);

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
    let nombre = document.getElementById("nombre")
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
                id: document.getElementById("nombre").getAttribute("data-empleado"),
                nombre,
                email,
                sexo,
                area,
                descripcion,
                boletin,
                // rolProfesional,
                // rolGerente,
                // rolAuxiliar,
            }
        }
        const parJSON = 'parjson=' + JSON.stringify(data);
        ClaseAJAX.solicitar_url("./php/servidor.php", "POST", parJSON, respuesta_modificar_empleado);
    }
}
function respuesta_modificar_empleado(parametroJSON) {
    console.log("parametroJSON", parametroJSON);
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