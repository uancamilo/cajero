import Cliente from "./Cliente.js";

class Cuenta extends Cliente {
	constructor(nombre, apellido, numeroCuenta, tipoCuenta, saldo, clave) {
		super(nombre, apellido);
		this.id = Cuenta.generarId();
		this.numeroCuenta = numeroCuenta;
		this.tipoCuenta = tipoCuenta;
		this.saldo = Number(saldo);
		this.clave = clave;
	}

	// Método estático para generar un ID consecutivo
	static generarId() {
		const ultimoId = localStorage.getItem("ultimoIdCuenta");
		const nuevoId = ultimoId ? parseInt(ultimoId) + 1 : 1;
		localStorage.setItem("ultimoIdCuenta", nuevoId);
		return nuevoId;
	}

	crearCuenta() {
		// Crear el objeto con los datos de la cuenta
		const datosCuenta = {
			id: this.id,
			nombre: this.nombre,
			apellido: this.apellido,
			numeroCuenta: this.numeroCuenta,
			tipoCuenta: this.tipoCuenta,
			saldo: Number(this.saldo),
			clave: this.clave,
		};

		// Guardar datos de la cuenta en localStorage
		localStorage.setItem(`cuenta_${this.id}`, JSON.stringify(datosCuenta));
		console.log(
			`La cuenta ${this.tipoCuenta} ha sido creada para ${this.nombre} ${this.apellido} con ID ${this.id}`
		);
		document.getElementById("formCrearCuenta").reset();
	}

	async buscarCuenta(numeroCuenta) {
		for (let key in localStorage) {
			if (key.startsWith("cuenta_")) {
				const cuenta = JSON.parse(localStorage.getItem(key));
				if (cuenta.numeroCuenta === numeroCuenta) {
					return cuenta.numeroCuenta;
				}
			}
		}
		console.log("Cuenta no encontrada"); 
		return false;
	}

	async accederCuenta(datosCuentaMostrar) {
		const keys = Object.keys(localStorage);

		for (let key of keys) {
			if (key.startsWith("cuenta_")) {
				const cuenta = JSON.parse(localStorage.getItem(key));

				// Verificar si el número de cuenta y la clave coinciden
				if (
					cuenta.numeroCuenta === datosCuentaMostrar.numeroCuenta &&
					cuenta.clave === datosCuentaMostrar.clave
				) {
					localStorage.setItem("cuentaActual", JSON.stringify(cuenta));
					return cuenta;
				}
			}
		}
		// Si no se encuentra la cuenta, mostrar un mensaje o realizar otra acción
		console.log("Cuenta no encontrada.");
		return null;
	}
}
export default Cuenta;
