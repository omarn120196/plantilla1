import {cargarPagina, 
        iniciarContenido, 
        actualizarPorcentaje,
        calcularTiempo, 
        desactivarBotonAtras, 
        desactivarBotonSiguiente, 
        activarBotonAtras,
        activarBotonSiguiente,
        actualizarTemario,
        redimensionar} 
from '../funciones.js';

import {menuLateral} from '../selectores.js';

import {paginas} from '../configuracion.js';

import { conectarLMS, 
        asignarLocacion, 
        verificarLocacion, 
        statusCurso,
        asignarCalificacion } 
from '../conexion.js';

export class App{

    // Parametros de Inicio------------------------------------------------------

    constructor(){
        this.audio;
        this.muteado = false;
        this.noPagina = verificarLocacion();
        this.paginasActivas = 0;
        this.totalPaginas = paginas.length;
        this.intento = 1;
        this.calificacion = 0;
    }

    //Iniciar el curso-----------------------------------------------------------

    iniciar(){
        conectarLMS();
        calcularTiempo();
        desactivarBotonSiguiente();
        actualizarTemario(this.noPagina);
        actualizarPorcentaje(this.noPagina, this.totalPaginas);
        iniciarContenido(this.noPagina);        
    }

    //Esta función solo es para modo desarrollador y temario-------------------------
    irPagina(noPagina){

        const pagina = noPagina - 1;

        if(pagina <= this.totalPaginas && pagina >= 0){
            this.noPagina = pagina;

            this.activarNavegacion();
            desactivarBotonSiguiente();
            this.detenerAudios();
            actualizarTemario(this.noPagina);
            actualizarPorcentaje(this.noPagina, this.totalPaginas);
            cargarPagina(this.noPagina, this.paginasActivas);
        }
        else{
            console.log('Esa página no existe');
        }
    }

    //Metodos de botones----------------------------------------------------------
 
    nextPag(){
        if(this.noPagina < this.totalPaginas - 1){
            
            if(this.noPagina == this.paginasActivas){
                this.paginasActivas++
            }

            this.noPagina++;
            actualizarTemario(this.noPagina);
            desactivarBotonSiguiente();
            asignarLocacion(this.noPagina);
            this.detenerAudios();
            actualizarPorcentaje(this.noPagina, this.totalPaginas);
            cargarPagina(this.noPagina, this.paginasActivas);
        }
        else{
            console.log('Estas en la ultima página');
        }
    }

    prevPag(){
        if(this.noPagina > 0){
            this.noPagina--;

            asignarLocacion(this.noPagina);
            this.detenerAudios();
            actualizarPorcentaje(this.noPagina, this.totalPaginas);
            cargarPagina(this.noPagina, this.paginasActivas);
        }
        else{
            console.log('Estas en la primer página');
        }
    }

    recargarPag(){
        this.detenerAudios();
        cargarPagina(this.noPagina, this.paginasActivas);
    }

    desplegarMenu(){
        menuLateral.addClass('menu-abierto');
    }

    cerrarMenu(){
        menuLateral.removeClass('menu-abierto');
    }

    terminaPantalla(){
        activarBotonSiguiente();
    }

    bloquearNavegacion(){
        desactivarBotonAtras();
    }

    activarNavegacion(){
        activarBotonAtras();
    }

    //Metodos para reproducir y silenciar audios---------------------------------

    reproducirAudio(audio, funcion, delay = 0){

        this.audio = audio;

        if(this.muteado){
            this.audio.muted = true;
        }
        else{
            this.audio.muted = false;
        }

        setTimeout(()=>{
            this.audio.play();
          
            this.audio.addEventListener("ended", () => {
                funcion();
            });
        }, delay);
    }

    silenciarOPrender(){
        const imagenBocina = $('#audio img');

        if(this.muteado){
            this.audio.muted = false;
            imagenBocina.attr('src', 'img/interfaz/audio.png');
            this.muteado = false
        }
        else{
            this.audio.muted = true;
            imagenBocina.attr('src', 'img/interfaz/audio_off.png');
            this.muteado = true;
        }
    }

    detenerAudios(){
        this.audio.pause();
    }

    //Guardar Calificacion-------------------------------------------------------
    guardarCalificacion(calificacion){
        this.calificacion = calificacion;
        asignarCalificacion(this.calificacion);
        statusCurso('passed');
    }

    compararCalificaciones(calificacion){
        if(calificacion > this.calificacion){
            this.calificacion = calificacion;
        }
        asignarCalificacion(this.calificacion);
    }

    //Actualizar estatus de curso------------------------------------------------
    actualizarEstado(){
        if(this.noPagina != this.totalPaginas -1){
            statusCurso('incomplete');
        }
        else{
            statusCurso('completed');
        }
    }

    //Metodo para aumentar intentos de evaluación--------------------------------
    siguienteIntento(){
        this.intento++;
    }    
}