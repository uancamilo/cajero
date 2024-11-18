class CuentaAhorro {
	async transferir(datosTransferencia) {
		const cuentaDestino = datosTransferencia.numeroCuentaDestino;
		const montoTransferencia = Number(datosTransferencia.monto); // Convertir monto a número

		const cuentaActual = JSON.parse(localStorage.getItem("cuentaActual"));
		let saldoCuentaActual = Number(cuentaActual.saldo); // Convertir saldo a número

		const keys = Object.keys(localStorage);
		let cuentaDestinoEncontrada = null;

		// Verificar si la cuenta de destino existe y obtener sus datos
		for (let key of keys) {
			if (key.startsWith("cuenta_")) {
				const cuenta = JSON.parse(localStorage.getItem(key));
				if (cuenta.numeroCuenta === cuentaDestino) {
					cuentaDestinoEncontrada = cuenta;
					break;
				}
			}
		}

		if (!cuentaDestinoEncontrada) {
			console.log("La cuenta de destino no existe.");
			return;
		}

		let saldoDestino = Number(cuentaDestinoEncontrada.saldo); // Convertir saldo a número

		// Verificar si el saldo de la cuenta actual es suficiente
		if (saldoCuentaActual >= montoTransferencia) {
			// Actualizar el saldo de la cuenta actual y la cuenta de destino
			cuentaActual.saldo = saldoCuentaActual - montoTransferencia;
			cuentaDestinoEncontrada.saldo = saldoDestino + montoTransferencia;

			// Guardar los cambios en el localStorage
			localStorage.setItem("cuentaActual", JSON.stringify(cuentaActual));
			localStorage.setItem(
				`cuenta_${cuentaDestinoEncontrada.id}`,
				JSON.stringify(cuentaDestinoEncontrada)
			);
			localStorage.setItem(
				`cuenta_${cuentaActual.id}`,
				JSON.stringify(cuentaActual)
			);

			document.getElementById("saldoMostrar").textContent = cuentaActual.saldo;

			console.log("Transferencia realizada con éxito.");
		} else {
			console.log("No se puede realizar la transferencia: saldo insuficiente.");
		}
	}
}
export default CuentaAhorro;
