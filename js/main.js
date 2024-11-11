import Cuenta from "./Cuenta.js";
import CuentaAhorro from "./CuentaAhorro.js";
import CuentaCorriente from "./CuentaCorriente.js";

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
	.getElementById("formNumeroCuenta")
	.addEventListener("submit", async (event) => {
		event.preventDefault();
		const numeroCuenta = document.getElementById("numeroCuentaIngresar").value;
		const cuenta = new Cuenta();
		const cuentaEncontrada = await cuenta.buscarCuenta(numeroCuenta);

		// Verifica si se encontró la cuenta y muestra el formulario de clave
		if (cuentaEncontrada === numeroCuenta) {
			document
				.getElementById("numeroCuentaIngresar")
				.setAttribute("readonly", true);
			document.getElementById("formClaveCuenta").style.display = "block";
		} else {
			alert("Cuenta no encontrada");
		}
	});

document
	.getElementById("formClaveCuenta")
	.addEventListener("submit", async (event) => {
		event.preventDefault();

		// Obtener los datos de los formularios
		const numeroCuenta = document.getElementById("numeroCuentaIngresar").value;
		const clave = document.getElementById("claveIngresar").value;

		// Asignar los valores a una variable
		const datosIngresar = {
			numeroCuenta: numeroCuenta,
			clave: clave,
		};

		const cuenta = new Cuenta();
		const cuentaMostrar = await cuenta.accederCuenta(datosIngresar);
		if (cuentaMostrar) {
			// Asignar los valores de cuentaMostrar a los elementos en el HTML
			document.getElementById("nombreMostrar").textContent =
				cuentaMostrar.nombre;
			document.getElementById("apellidoMostrar").textContent =
				cuentaMostrar.apellido;
			document.getElementById("numeroCuentaMostrar").textContent =
				cuentaMostrar.numeroCuenta;
			document.getElementById("tipoCuentaMostrar").textContent =
				cuentaMostrar.tipoCuenta;
			document.getElementById("saldoMostrar").textContent = cuentaMostrar.saldo;
			document.getElementById("formClaveCuenta").reset();
			document.getElementById("mostrarCuenta").style.display = "block";
			document.getElementById("formTranferir").style.display = "block";
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

	if (datosTransferencia.tipoCuentaTransferir === "ahorros") {
		const transferencia = new CuentaAhorro();
		transferencia.transferir(datosTransferencia);
	} else {
		const transferencia = new CuentaCorriente();
		transferencia.transferir(datosTransferencia);
	}
});
