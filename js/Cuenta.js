import Cliente from "./Cliente.js";

class Cuenta extends Cliente {
	constructor(
		nombre,
		apellido,
		numeroCuenta,
		tipoCuenta,
		depositoInicial,
		clave
	) {
		super(nombre, apellido);
		this.id = Cuenta.generarId();
		this.numeroCuenta = numeroCuenta;
		this.tipoCuenta = tipoCuenta;
		this.depositoInicial = depositoInicial;
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
			depositoInicial: this.depositoInicial,
			clave: this.clave,
		};

		// Guardar datos de la cuenta en localStorage
		localStorage.setItem(`cuenta_${this.id}`, JSON.stringify(datosCuenta));
		console.log(
			`La cuenta ${this.tipoCuenta} ha sido creada para ${this.nombre} ${this.apellido} con ID ${this.id}`
		);
		document.getElementById("formCrearCuenta").reset();
	}

	async buscarCuenta(datosCuentaMostrar) {
		const keys = Object.keys(localStorage);
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
					break; // Terminar el ciclo si la cuenta es encontrada
				}
			}
		}
		return cuentaEncontrada;
	}

	async accederCuenta(datosCuentaMostrar) {
		// Esperar el resultado de buscarCuenta
		const cuentaEncontrada = await this.buscarCuenta(datosCuentaMostrar);

		if (cuentaEncontrada) {
			// Verificar si existe 'depositoInicial' y reemplazarlo por 'saldo'
			if (cuentaEncontrada.depositoInicial !== undefined) {
				cuentaEncontrada.saldo = cuentaEncontrada.depositoInicial;
				delete cuentaEncontrada.depositoInicial; // Eliminar depositoInicial si ya no es necesario
			}

			// Sobrescribir la cuenta actualizada en localStorage con la misma clave
			const cuentaKey = `cuenta_${cuentaEncontrada.id}`;
			localStorage.setItem(cuentaKey, JSON.stringify(cuentaEncontrada));
		} else {
			console.log("Cuenta no encontrada.");
		}

		return cuentaEncontrada;
	}

}

export default Cuenta;
