class Cliente {
    constructor(nombreTitular, numeroCuenta) {
        this.nombreTitular = nombreTitular;
        this.numeroCuenta = numeroCuenta;
    }

    // Método para actualizar los datos del cliente
    actualizarDatos(nuevoNombre, nuevaClave, nuevaDireccion, id) {
        this.nombre = nuevoNombre;
        this.clave = nuevaClave;
        console.log(`Datos del cliente ${id} actualizados.`);
    }
}

export default Cliente;