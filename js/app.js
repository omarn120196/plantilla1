import { App } from "./clases/App.js";
import { modoDesarrollador, tiempo, redimensionar } from "./funciones.js";
import {btnAdelante, btnAtras, btnMenu, btnCerrar, btnAudio, btnRecargar ,contenedorInterfaz, btnNavegacion} from './selectores.js';
import { registrarTiempo, cerrarConexion } from './conexion.js';

//Instanciar App e iniciarla------------------------------------------------------
export const aplicacion = new App;
aplicacion.iniciar();

// Funciones de los botones de navegación-----------------------------------------
btnAdelante.click(function(){
    aplicacion.nextPag();
});

btnAtras.click(function(){
    aplicacion.prevPag();
});

btnMenu.click(function(){
    aplicacion.desplegarMenu();
});

btnCerrar.click(function(){
    aplicacion.cerrarMenu();
});

btnAudio.click(function(){
    aplicacion.silenciarOPrender();
});

btnRecargar.click(function(){
    aplicacion.recargarPag();
});

//Al cerrar el curso
window.onunload = function(){
    registrarTiempo(tiempo);
    cerrarConexion();
}

// Modo desarrollador-------------------------------------------------------------
// modoDesarrollador();

//Redimensionar tamaño------------------------------------------------------------
redimensionar();
$(window).resize(function(){
    setTimeout(()=>{
        aplicacion.recargarPag();
    }, 100);
});
