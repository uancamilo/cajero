import CuentaAhorro from './CuentaAhorro.js';



const crearCuenta = (event) => {
    event.preventDefault(); // Prevenir el envío del formulario


    const numeroCuenta = document.getElementById("numeroCuenta").value;
    const nombreTitular = document.getElementById("nombreTitular").value;
    const saldoInicial = parseFloat(document.getElementById("saldoInicial").value);
    const clave = document.getElementById("clave").value;
  

    // Guardar la cuenta
    localStorage.setItem(numeroCuenta, `${nombreTitular}|${saldoInicial}|${clave}`);
    document.getElementById("mensajes").textContent = "Usuario creado exitosamente.";
    
    // Mostrar mensaje de éxito
    const mensajeExito = document.getElementById("mensajes");
    mensajeExito.style.color = "green";
    mensajeExito.style.fontWeight = "bold";

    // Redirigir al login después de registrarse
    setTimeout(() => {
        window.location.href = "login.html";
    }, 2000);
};


const iniciarSesion = () => {
    const numeroCuenta = document.getElementById("numeroCuenta").value;
    const clave = document.getElementById("clave").value;
    const cuentaGuardada = localStorage.getItem(numeroCuenta);

    if (!cuentaGuardada) {
        document.getElementById("mensajes").textContent = "Número de cuenta no encontrado.";
        return;
    }

    const [nombreTitular, saldo, storedClave] = cuentaGuardada.split('|');
    if (storedClave !== clave) {
        document.getElementById("mensajes").textContent = "Clave incorrecta.";
        return;
    }

    localStorage.setItem("cuentaActual", numeroCuenta);
    window.location.href = "operaciones.html"; 
};

// Solo llamamos a mostrarCuentaActual después de cargar operaciones.html
window.onload = () => {
    if (window.location.pathname.endsWith("operaciones.html")) {
        mostrarCuentaActual();
    }
};

 const mostrarCuentaActual = () => {
    const numeroCuenta = localStorage.getItem("cuentaActual");

    if (numeroCuenta) {
        const cuentaGuardada = localStorage.getItem(numeroCuenta);
        if (cuentaGuardada) {
            const [nombreTitular, saldo] = cuentaGuardada.split('|');
            document.getElementById("numeroCuenta").textContent = ` ${numeroCuenta}`;
            document.getElementById("saldoActual").textContent = `$${parseFloat(saldo).toFixed(2)}`;
        }
    } else {
        document.getElementById("numeroCuenta").textContent = "No hay cuenta activa.";
        document.getElementById("saldoActual").textContent = "$0.00";
    }
};

const actualizarSaldoUI = () => {
    const numeroCuenta = localStorage.getItem("cuentaActual");
    const cuentaGuardada = localStorage.getItem(numeroCuenta);
    if (cuentaGuardada) {
        const [, saldo] = cuentaGuardada.split('|');
        document.getElementById("saldoActual").textContent = `$${parseFloat(saldo).toFixed(2)}`;
        document.getElementById("numeroCuenta").textContent = ` ${numeroCuenta}`;
    }
};

const realizarOperaciones = () => {
    const numeroCuenta = localStorage.getItem("cuentaActual");

    if (!numeroCuenta) {
        window.location.href = "login.html";
        return;
    }

    const cuentaGuardada = localStorage.getItem(numeroCuenta);
    const [nombreTitular, saldo, clave] = cuentaGuardada.split('|');
    const cuenta = new CuentaAhorro(nombreTitular, numeroCuenta, parseFloat(saldo), clave);


    //muestra el saldo actual
    actualizarSaldoUI();
   

    document.getElementById("btnDepositar").addEventListener("click", () => {
        const cantidadDeposito = parseFloat(document.getElementById("cantidadDeposito").value);
        const mensaje = cuenta.depositar(cantidadDeposito);
        document.getElementById("mensajes").textContent = mensaje;
        localStorage.setItem(numeroCuenta, `${cuenta.nombreTitular}|${cuenta.saldo}|${cuenta.clave}`);
    
        actualizarSaldoUI();
    });

    document.getElementById("btnRetirar").addEventListener("click", () => {
        const cantidadRetiro = parseFloat(document.getElementById("cantidadRetiro").value);
        const mensaje = cuenta.retirar(cantidadRetiro);
        document.getElementById("mensajes").textContent = mensaje;
        localStorage.setItem(numeroCuenta, `${cuenta.nombreTitular}|${cuenta.saldo}|${cuenta.clave}`);
     
        actualizarSaldoUI();
    });

    

    document.getElementById("btnTransferir").addEventListener("click", () => {
        const numeroCuenta = localStorage.getItem("cuentaActual");
        const cuentaGuardada = localStorage.getItem(numeroCuenta);
        const numeroCuentaDestino = document.getElementById("numeroCuentaDestino").value;
        const montoTransferencia = parseFloat(document.getElementById("montoTransferencia").value);
        const cuentaDestinoGuardada = localStorage.getItem(numeroCuentaDestino);
    
        if (!cuentaGuardada) {
            document.getElementById("mensajes").textContent = "Cuenta actual no encontrada.";
            return;
        }
    
        if (cuentaDestinoGuardada) {
            // Instancia de la cuenta actual
            const [nombreTitular, saldo, clave] = cuentaGuardada.split('|');
            const cuenta = new CuentaAhorro(nombreTitular, numeroCuenta, parseFloat(saldo), clave);
    
            // Instancia de la cuenta destino
            const [nombreTitularDestino, saldoDestino, claveDestino] = cuentaDestinoGuardada.split('|');
            const cuentaDestino = new CuentaAhorro(nombreTitularDestino, numeroCuentaDestino, parseFloat(saldoDestino), claveDestino);
    
            // Realizar la transferencia
            const mensaje = cuenta.transferir(cuentaDestino, montoTransferencia);
            document.getElementById("mensajes").textContent = mensaje;
    
            // Guardar los saldos actualizados en localStorage
            localStorage.setItem(numeroCuenta, `${cuenta.nombreTitular}|${cuenta.saldo}|${cuenta.clave}`);
            localStorage.setItem(numeroCuentaDestino, `${cuentaDestino.nombreTitular}|${cuentaDestino.saldo}|${cuentaDestino.clave}`);
    
            // Actualizar la interfaz
            actualizarSaldoUI();
    
            // Mostrar detalles de la transferencia en la lista
            const transaccionesLista = document.querySelector(".transaccionesLista");
            transaccionesLista.innerHTML += `
                <p>Usuario: ${nombreTitularDestino} <br> Cuenta: ${numeroCuentaDestino}</p>
                <br> 
                <p>Nuevo saldo disponible: $${cuenta.saldo}</p>
                <hr>
            `;
        } else {
            document.getElementById("mensajes").textContent = "La cuenta de destino no existe.";
        }
    });

    document.getElementById("btnSalir").addEventListener("click", () => {
        localStorage.removeItem("cuentaActual");
        window.location.href = "login.html";
    });
};

const initPageEvents = () => {
    const formCrearCuenta = document.getElementById("formCrearCuenta");
    const btnIniciarSesion = document.getElementById("btnIniciarSesion");
    const btnRegistrarse = document.getElementById("btnRegistrarse");
    const btnDepositar = document.getElementById("btnDepositar");
    const btnRetirar = document.getElementById("btnRetirar");
    const btnTransferir = document.getElementById("btnTransferir");

    if (formCrearCuenta) formCrearCuenta.addEventListener("submit", crearCuenta);
    if (btnIniciarSesion) btnIniciarSesion.addEventListener("click", iniciarSesion);
    if (btnRegistrarse) btnRegistrarse.addEventListener("click", () => window.location.href = "index.html");
    if (btnDepositar || btnRetirar) realizarOperaciones();
    if (btnTransferir) btnTransferir.addEventListener("click", transferirDinero);
};

initPageEvents();

