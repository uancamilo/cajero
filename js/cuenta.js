class cuenta {
    constructor(numeroCuenta, saldo = 0) {
        this.numeroCuenta = numeroCuenta;
        this.saldo = saldo;
    }

    //metodos
    
    consultarSaldo(){
        console.log(`El saldo actual de la cuenta ${this.numeroCuenta} es: ${this.saldo}`);
        return this.saldo;
    }

    realizarDeposito(cantidad){
        if (cantidad > 0) {
            this.saldo += cantidad;
            console.log(`Se ha depositado ${cantidad}. Saldo actual: ${this.saldo}`);
        } else {
            console.log('La cantidad a depositar debe ser mayor que 0.');
        }
    }
    realizarRetiro(cantidad){
        if (cantidad > 0 && cantidad <= this.saldo) {
            this.saldo -= cantidad;
            console.log(`Se ha retirado ${cantidad}. Saldo actual: ${this.saldo}`);
        } else {
            console.log('No se puede realizar el retiro. Saldo insuficiente o cantidad inválida.');
        }
    }
}
export default cuenta;