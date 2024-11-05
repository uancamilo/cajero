import Cliente from "./Cliente.js";

class Cuenta extends Cliente {
	constructor(nombre, apellido, numeroCuenta, tipoCuenta, clave) {
		super(nombre, apellido);
		this.id = Cuenta.generarId();
		this.numeroCuenta = numeroCuenta;
		this.tipoCuenta = tipoCuenta;
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
			clave: this.clave,
		};

		// Guardar datos de la cuenta en localStorage
		localStorage.setItem(`cuenta_${this.id}`, JSON.stringify(datosCuenta));
		console.log(
			`La cuenta ${this.tipoCuenta} ha sido creada para ${this.nombre} ${this.apellido} con ID ${this.id}`
		);
		console.log(datosCuenta);
		document.getElementById("formCrearCuenta").reset();
	}

}

export default Cuenta;
