class ClaseAJAX {
	constructor() {

	};
	static solicitar_url(url, metodoPeticion, parametroEnvio, callback) {
		let xhr = new XMLHttpRequest();

		switch (metodoPeticion) {
			case "POST":
				xhr.open("POST", url, true);
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				xhr.send(parametroEnvio);
				break;
			case "GET":
				xhr.open("GET", url, true);
				xhr.send();
				break;
			default:
				callback("Metodo de peticion invalido");
				break;
		}

		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				//this.readyState === XMLHttpRequest.DONE que es lo mismo que 4

				// console.log(this.response);
				// console.log(this.responseText);
				let ptexjso = this.responseText; //hay que validar si es json
				callback(ptexjso);
			}
			else if (this.readyState == 4) {
				callback(this.statusText);
			}
		};
		//xhr.send(null);
	}

	static fetchPeticion(url, method, data, callback) {
		var headers = new Headers();
		headers.append('a', '1');
		headers.append('b', '2');
		var request = new Request(url, {
		        headers: headers
		    });
		console.log('request =', request);
		for (var k of request.headers.keys()) {
		    console.log('request.headers.get("' + k + '") =', request.headers.get(k));
		}
		fetch(url, {
			method, // 'POST' or 'PUT'
			body: JSON.stringify(data), // data can be `string` or {object}!
			headers: {
				'Access-Control-Allow-Origin': '*'
			}
		}).then(res => res.json())
			.catch(error => callback(error))
			.then(response => callback(response));
	}

	static fetchPeticionGET(url, callback) {
		fetch(url).then(res => res.json())
			.catch(error => callback(error))
			.then(response => callback(response));
	}

	static loadDoc(url, id) {
		console.log("loadDoc");
		let xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				document.getElementById(id).innerHTML = this.responseText;
			}
		};
		xhttp.open("GET", url, true);
		xhttp.send();
	}

}
// var objajax = new ClaseAJAX();

// ClaseAJAX.solicitar_url("../php/servidor.php", "POST", "Fredy", mostrarMensaje);