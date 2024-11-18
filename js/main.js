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
			document.getElementById("formNumeroCuenta").reset();
			document
				.getElementById("numeroCuentaIngresar")
				.removeAttribute("readonly");
			document.getElementById("formClaveCuenta").style.display = "none";
			document.getElementById("mostrarCuenta").style.display = "block";
			document.getElementById("formTranferir").style.display = "block";
		} else {
			console.log("Cuenta no encontrada.");
		}
	});

document.getElementById("formTranferir").addEventListener("submit", (event) => {
	event.preventDefault();

	// Obtener y validar los datos de entrada
	const numeroCuentaDestino = document
		.getElementById("numeroCuentaTransferir")
		.value.trim();
	const monto = parseFloat(document.getElementById("montoTransferir").value);
	const tipoCuentaTransferir = document.getElementById(
		"tipoCuentaTransferir"
	).value;

	if (
		!numeroCuentaDestino ||
		isNaN(monto) ||
		monto <= 0 ||
		!tipoCuentaTransferir
	) {
		alert("Por favor, completa todos los campos correctamente.");
		return;
	}

	// Obtener la cuenta actual del localStorage
	const cuentaActual = JSON.parse(localStorage.getItem("cuentaActual"));
	if (!cuentaActual) {
		alert("No se encontró información de la cuenta actual.");
		return;
	}

	const tipoCuentaActual = cuentaActual.tipoCuenta;
	const saldoActual = parseFloat(cuentaActual.saldo);

	// Validar tipo de cuenta y saldo permitido
	if (tipoCuentaActual === "ahorros" && saldoActual >= monto) {
		const transferencia = new CuentaAhorro();
		transferencia.transferir({
			numeroCuentaDestino,
			monto,
			tipoCuentaTransferir,
		});
	} else if (tipoCuentaActual === "corriente" && saldoActual - monto >= -500) {
		const transferencia = new CuentaCorriente();
		transferencia.transferir({
			numeroCuentaDestino,
			monto,
			tipoCuentaTransferir,
		});
	} else {
		alert("Saldo insuficiente para realizar la transferencia.");
	}
	document.getElementById("formTranferir").reset();
});

document.getElementById("btnCerrar").addEventListener("click", () => {
	localStorage.removeItem("cuentaActual");
});
