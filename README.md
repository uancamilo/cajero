# Enunciado del Proyecto

Desarrollar un sistema bancario que modele de manera efectiva a los clientes y los distintos tipos de cuentas bancarias, permitiendo realizar operaciones comunes como depósitos, retiros, y transferencias. El sistema debe estar estructurado utilizando los principios de la programación orientada a objetos (POO), con un enfoque en la implementación de clases, herencia, y la correcta organización del código. Los estudiantes deberán aplicar estos conceptos para crear un sistema robusto y extensible, capaz de gestionar múltiples tipos de cuentas y sus respectivas operaciones.

## Clases

- **Cliente**: 
  - **Atributos**: nombre, apellido, dirección, número de identificación.
  - **Métodos**: consultar saldo, realizar depósito, realizar retiro.

- **Cuenta**: 
  - **Atributos**: número de cuenta, saldo.
  - **Métodos**: consultar saldo, realizar depósito, realizar retiro.

- **CuentaCorriente**: 
  - Hereda de Cuenta.
  - **Atributos**: descubierto permitido.
  - **Métodos**: realizar transferencia.

- **CuentaAhorros**: 
  - Hereda de Cuenta.
  - **Atributos**: tasa de interés.
  - **Métodos**: calcular intereses.

## Herencia

Implementar una jerarquía de clases donde `CuentaCorriente` y `CuentaAhorros` hereden de la clase `Cuenta`.

## Operaciones

- **Depósito**: Incrementar el saldo de una cuenta.
- **Retiro**: Disminuir el saldo de una cuenta, validando que no se sobrepase el descubierto permitido en una cuenta corriente.
- **Transferencia**: Transferir dinero entre dos cuentas.
- **Consulta de saldo**: Mostrar el saldo actual de una cuenta.

## Consideraciones Adicionales

- **Encapsulación**: Proteger los datos de las clases utilizando modificadores de acceso (public, private, protected).
- **Abstracción**: Identificar las características esenciales de cada clase y omitir los detalles de implementación.
- **Modularidad**: Dividir el código en módulos o funciones para mejorar la organización y la reutilización.

## Interfaz de Usuario

Diseñar una interfaz de usuario simple (consola) para interactuar con el sistema. El usuario debe poder crear cuentas, realizar operaciones y consultar información.

### Funciones de la Interfaz

- **Nombre de la App**
- **Usuario**
- **Contraseña**
- **Crear Cliente**
- **Crear Cuenta**
- **Actualizar Datos**
- **TRANSACCIONES**
  - Retirar
  - Consignar
  - Consultar Movimientos
  - Consultar Saldo
- **Salir**

Implementar entorno web para cada opción.
