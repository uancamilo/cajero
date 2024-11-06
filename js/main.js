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
			datosCuenta.depositoInicial,
			datosCuenta.clave
		);
		cuenta.crearCuenta(datosCuenta);
	});

document
	.getElementById("formMostrarCuenta")
	.addEventListener("submit", async (event) => {
		event.preventDefault();
		const datosCuentaMostrar = {
			numeroCuenta: document.getElementById("numeroCuentaIngresar").value,
			clave: document.getElementById("claveIngresar").value,
		};
		const cuenta = new Cuenta();
		const cuentaEncontrada = await cuenta.accederCuenta(datosCuentaMostrar);

		if (cuentaEncontrada) {
			console.log(cuentaEncontrada);
			// Asignar los valores de cuentaEncontrada a los elementos en el HTML
			document.getElementById("nombreMostrar").textContent =
				cuentaEncontrada.nombre;
			document.getElementById("apellidoMostrar").textContent =
				cuentaEncontrada.apellido;
			document.getElementById("numeroCuentaMostrar").textContent =
				cuentaEncontrada.numeroCuenta;
			document.getElementById("tipoCuentaMostrar").textContent =
				cuentaEncontrada.tipoCuenta;
			document.getElementById("saldoMostrar").textContent =
				cuentaEncontrada.saldo;
		} else {
			console.log("Cuenta no encontrada.");
		}
	});

document.getElementById("formTranferir").addEventListener("submit", (event) => {
	event.preventDefault();
	const datosTransferencia = {
		numeroCuentaDestino: document.getElementById("numeroCuentaTransferir")
			.value,
		monto: document.getElementById("montoTransferir").value,
		tipoCuentaTransferir: document.getElementById("tipoCuentaTransferir").value,
	};

	console.log(datosTransferencia);

	if (datosTransferencia.tipoCuentaTransferir === "ahorros") {
		const tranferencia = new CuentaAhorro;
		tranferencia.mostrarMensaje();
	} else {
		console.log("corriente");
	}
});
