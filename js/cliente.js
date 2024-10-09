class cliente {
    constructor(nombre, apellido,direccion, id ) {
        this._nombre = nombre;
        this._apellido = apellido;
        this._direccion = direccion;
        this._id = id;
    }

    //metodos
  

    actualizarNombre(nuevoNombre) {
        this._nombre = nuevoNombre;
    }

    actualizarApellido(nuevoApellido) {
        this._apellido = nuevoApellido;
    }

    actualizarDireccion(nuevaDireccion) {
        this._direccion = nuevaDireccion;
    }

    actualizarIdentificacion(nuevaIdentificacion) {
        this._identificacion = nuevaIdentificacion;
    }

    mostrarDatos() {
        console.log(`Nombre: ${this._nombre}, Apellido: ${this._apellido}, Dirección: ${this._direccion}, Identificación: ${this._identificacion}`);
    }
}
export default cliente;