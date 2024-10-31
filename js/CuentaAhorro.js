import Cliente from './cliente.js';

class CuentaAhorro extends Cliente {
    constructor(nombreTitular, numeroCuenta, saldo, clave) {
        super(nombreTitular, numeroCuenta);
        this.saldo = saldo;
        this.clave = clave;
    }

    //metodos
    depositar(cantidad) {
        if (cantidad > 0) {
            this.saldo += cantidad;
            return `Deposito de $${cantidad} realizado.`;
        }
        return "Cantidad de deposito invalida.";
    }

    retirar(cantidad) {
        if (cantidad > 0 && this.saldo >= cantidad) {
            this.saldo -= cantidad;
            return `Retiro de $${cantidad} realizado.`;
        }
        return "Saldo insuficiente o cantidad invalida.";
    }

    transferir(cuentaDestino, monto) {
        if (monto > 0 && monto <= this.saldo) {
            this.saldo -= monto;
            cuentaDestino.saldo += monto;
            return `Transferencia exitosa de $${monto}`;
        }
        return "Saldo insuficiente o monto inválido para la transferencia.";
    }
}

export default CuentaAhorro;