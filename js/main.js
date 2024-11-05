import Cuenta from "./Cuenta.js";
import CuentaAhorro from "./CuentaAhorro.js";

document
	.getElementById("formCrearCuenta")
	.addEventListener("submit", (event) => {
		event.preventDefault();
		const datosCuenta = {
			nombre: document.getElementById("nombre").value,
			apellido: document.getElementById("apellido").value,
			numeroCuenta: document.getElementById("numeroCuenta").value,
			tipoCuenta: document.getElementById("tipoCuenta").value,
			depositoInicial: document.getElementById("depositoInicial").value,
			clave: document.getElementById("clave").value,
		};

		// Crear una instancia de Cuenta con los valores capturados
		const cuenta = new Cuenta(
			datosCuenta.nombre,
			datosCuenta.apellido,
			datosCuenta.numeroCuenta,
			datosCuenta.tipoCuenta,
			datosCuenta.clave
		);
		cuenta.crearCuenta(datosCuenta);
	});

document
	.getElementById("formMostrarCuenta")
	.addEventListener("submit", (event) => {
		event.preventDefault();
		const datosCuentaMostrar = {
			numeroCuenta: document.getElementById("numeroCuentaIngresar").value,
			clave: document.getElementById("claveIngresar").value,
		};
		console.log(datosCuentaMostrar);
		// Obtener todas las claves en localStorage
		const keys = Object.keys(localStorage);

		// Buscar la cuenta en el localStorage
		let cuentaEncontrada = null;
		for (let key of keys) {
			if (key.startsWith("cuenta_")) {
				// Filtrar solo las claves que corresponden a cuentas
				const cuenta = JSON.parse(localStorage.getItem(key));

				// Comparar el número de cuenta y la clave
				if (
					cuenta.numeroCuenta === datosCuentaMostrar.numeroCuenta &&
					cuenta.clave === datosCuentaMostrar.clave
				) {
					cuentaEncontrada = cuenta;
					break;
				}
			}
		}

		// Mostrar el resultado de la búsqueda
		if (cuentaEncontrada) {
			console.log("Cuenta encontrada:", cuentaEncontrada);
		} else {
			console.log("No se encontró ninguna cuenta con los datos ingresados.");
		}
	});

// const cuentaUsuario = new CuentaAhorro();
// cuentaUsuario.mostrarMensaje("hola");
