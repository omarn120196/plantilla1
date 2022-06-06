import {contendorPáginas, 
        btnComenzar, 
        modalBienvenida, 
        relacion, 
        porcentajeBarra,
        btnAdelante,
        contPrincipal,
        btnAtras, 
        contenedorInterfaz,
        barraPorcentaje,
        btnMenu,
        btnRecargar,
        btnAudio,
        spinner,
        temas,
        menuLateral,
        titulo,
        cuadros, 
        nombreTemas} 
from './selectores.js';

import {pBarraProgreso, paginas, pBotonMenu, pBotonRecargar, pBotonAudio, pBotonAtras, pBotonAdelante, pMenuLateral, pCuadros, pTitulos, pNombreTemas} from './configuracion.js';

import { parpadea } from './animaciones.js';

import { aplicacion } from './app.js';

export function iniciarContenido(noPagina){
    btnComenzar.click(function(){
        modalBienvenida.css({
            'opacity': 0,
            'display': 'none'
        })
        cargarPagina(noPagina);
    });
}

export function cargarPagina(noPagina, paginasActivas){

    if(noPagina<paginasActivas){
        activarBotonSiguiente();
    }

    //Ruta de la página
    const url = `contenido/${paginas[noPagina].ruta}`;

    //Visualizar página
    jQuery(function($){

        $.get(url, {}, function(data){
            contendorPáginas.html(data);

            ajustarElementos(); 
        });
    });
}

function posicionamiento(){
    return new Promise(resolve=>{
        resolve(posicionarElementos());  
    })
}

async function ajustarElementos(){
    try {
        await posicionamiento();
        setTimeout(()=>{
            console.log('redimensionando');
            redimensionar();
        }, 1500);
    } catch (error) {
        console.log(error);
    }
}

export function actualizarPorcentaje(noPagina, totalPaginas){
    //Actualizar la relación del curso
    noPagina = noPagina + 1;
    relacion.html(`${noPagina}/${totalPaginas}`);

    //Carlcular el porcentaje de la barra
    const porcentaje = (noPagina * 100) / totalPaginas;
    porcentajeBarra.css({
        'width': `${porcentaje}%`
    });
}

export function posicionarElementos(){

    const elementos = $('.elementos');

    $.each(elementos, function(){
        const posicionX = $(this).data('posx');
        const posicionY = $(this).data('posy');

        $(this).css({
            'top': `${posicionY}px`,
            'left': `${posicionX}px`
        });
    });
}

    //Activar y desactivar botones------------------------------------------------

    export function activarBotonSiguiente(){
        btnAdelante.prop('disabled', false);
        btnAdelante.removeClass('btnNavDesactivado');
        btnAdelante.addClass('btnNavActivo');
        setTimeout(()=>{
            parpadea(btnAdelante);
        }, 300);
    }

    export function desactivarBotonSiguiente(){
        TweenMax.killTweensOf(btnAdelante);
        
        setTimeout(()=>{
            btnAdelante.prop('disabled', true);
            btnAdelante.removeClass('btnNavActivo');
            btnAdelante.addClass('btnNavDesactivado');
            btnAdelante.css({
                'opacity': .6,
                'cursor': 'default'
            })
        }, 300);
    }

    export function activarBotonAtras(){
        btnAtras.prop('disabled', false);
        btnAtras.removeClass('btnNavDesactivado');
        btnAtras.addClass('btnNavActivo');
    }

    export function desactivarBotonAtras(){
        btnAtras.prop('disabled', true);
        btnAtras.removeClass('btnNavActivo');
        btnAtras.addClass('btnNavDesactivado');
    }

//Calcular el tiempo total-------------------------------------------------------
export let tiempo = '00:00:00';

export function calcularTiempo(){    
        let horas = 0;
        let minutos = 0;
        let segundos = 0;
        let hr = '00';
        let min = '00'
        let seg = '00';
        let cronometro;
    
        cronometro = setInterval(function(){
    
            if(segundos > 59){
                segundos = 0;
                minutos++; 
                if(minutos<10){
                    min = `0${minutos}`;
                }
                else{
                    min = `${minutos}`;
                }
    
                if(minutos > 59){
                    minutos = 0;
                    horas++;
                    
                    if(horas<10){
                        hr = `0${horas}`;
                    }
                    else{
                        hr = `${horas}`;
                    }
                }
            }
    
            segundos++;
    
            if(segundos<10){
                seg = `0${segundos}`;
            }  
            else{
                seg = `${segundos}`;
            }
            
            tiempo = `${hr}:${min}:${seg}`;
    
        }, 1000);
    
    }

// Modo desarrollador-------------------------------------------------------------
export function modoDesarrollador(){
    
    const totalPaginas = paginas.length;

    const contFormulario = $('<div>');
    contFormulario.addClass('modoDesarrollador');
    contFormulario.html(`
        <div class="titulo">
            <h4>Desarrollo-Navegacion</h4>
        </div>

        <form class="formulario">
            <label for="paginaInput">Página</label>
            <input type="number" id="paginaInput" placeholder="1" min="1" max="${totalPaginas}">
        </form>
    `);

    contPrincipal.append(contFormulario);

    const input = $('#paginaInput');
    input.change(function(){
        const noPagina = parseInt(input.val());
        
        aplicacion.irPagina(noPagina);
    });
}

//Redimensionar página-----------------------------------------------------------
export function redimensionar(){

    let escalaTemplate = 1;
    const ancho = 1024;
    const alto = 620;

    setTimeout(()=>{

        const anchoPantalla = $(window).width();
        const alturaPantalla = $(window).height();

        const escalaX = anchoPantalla / ancho;
        const escalaY = alturaPantalla / alto;

        const proporcion = ancho / alto;

        if(anchoPantalla<ancho){
            if(escalaX <= escalaY){
                    escalaTemplate = escalaX;
            }
            else{
                escalaTemplate = escalaY;
            }
        }

        contenedorInterfaz.width(ancho * escalaTemplate);
        contenedorInterfaz.height(alto * escalaTemplate);

    
        posicionObjeto(pBarraProgreso, barraPorcentaje, escalaTemplate);
        posicionBoton(pBotonMenu, btnMenu, escalaTemplate);
        posicionBoton(pBotonRecargar, btnRecargar, escalaTemplate);
        posicionBoton(pBotonAudio, btnAudio, escalaTemplate);
        posicionBoton(pBotonAtras, btnAtras, escalaTemplate);
        posicionBoton(pBotonAdelante, btnAdelante, escalaTemplate);
        posicionarMenu(pMenuLateral, menuLateral, escalaTemplate);
        posicionarTemas(pTitulos, titulo, escalaTemplate);
        posicionarTemas(pCuadros, cuadros, escalaTemplate);
        posicionarTemas(pNombreTemas, nombreTemas, escalaTemplate);

        setTimeout(()=>{
            const elementos = $('.elementos');

            if(elementos){
                posicionarElemento(elementos, escalaTemplate);
            }
        }, 10);
    }, 10)
}

function posicionObjeto(objeto, elemento, escala){

    const nuevoTop = objeto.top * escala;
    const nuevoLeft = objeto.left * escala;
    const nuevoWidth = objeto.width * escala;
    const nuevoHeight = objeto.height * escala;

    elemento.css({
        'width': `${nuevoWidth}px`,
        'height': `${nuevoHeight}px`,
        'top': `${nuevoTop}px`,
        'left': `${nuevoLeft}px`
    });

}

function posicionBoton(objeto, elemento, escala){

    const nuevoTop = objeto.top * escala;
    const nuevoLeft = objeto.left * escala;
    const nuevoWidth = objeto.width * escala;
    const nuevoHeight = nuevoWidth;

    elemento.css({
        'width': `${nuevoWidth}px`,
        'height': `${nuevoHeight}px`,
        'top': `${nuevoTop}px`,
        'left': `${nuevoLeft}px`
    });

}

function posicionarElemento(elementos, escala){
    
    $.each(elementos, function(){
        const nuevoTop = parseInt($(this).data('posy')) * escala;
        const nuevoLeft = parseInt($(this).data('posx')) * escala;
        const nuevoWidth = parseInt($(this).css('width').split('px')) * escala;
        const nuevoHeight = parseInt($(this).css('height').split('px')) * escala;
        
        const tamanoLetra = parseInt($(this).css('fontSize').split('px')) * escala;
        
        $(this).css({
            'top': `${nuevoTop}px`,
            'left': `${nuevoLeft}px`,
            'width': `${nuevoWidth}px`,
            'height': `${nuevoHeight}px`, 
            'fontSize': `${tamanoLetra}px`
        });
    });
}

function posicionarMenu(objeto, elemento, escala){
    const nuevoWidth = objeto.width * escala;
    const nuevoHeight = objeto.height * escala;

    elemento.css({
        'width': `${nuevoWidth}px`,
        'heigth': `${nuevoHeight}px`
    })
}

function posicionarTemas(objeto, elemento, escala){

    const nuevoFontSize = objeto.fontSize * escala;
    elemento.css('fontSize', `${nuevoFontSize}px`);
}

// Spinner----------------------------------------------------------------------
export function cargando(funcion){

    spinner.css({
        'display': 'flex',
        'opacity': '1'
    });

    spinner.html(`
        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    `);

    setTimeout(()=>{
        spinner.css({
            'display': 'none',
            'opacity': '0'
        });
        spinner.html();
        funcion();
    }, 1500)
}

//Actualizar temario-----------------------------------------------------------
export function actualizarTemario(noPagina){
    noPagina = noPagina + 1;
    
    $.each(temas, function(){
        const pagina =parseInt($(this).data('pagina'));
        
        if(pagina<noPagina){
            $(this).addClass('tema-activo');
            $(this).find('i').removeClass('bx-square-rounded');
            $(this).find('i').addClass('bx-check-square');
            $(this).find('i').css('fontSize', '20px');

            if($(this).hasClass('tema-activo')){
                $(this).click(function(){
                    aplicacion.irPagina(pagina);
                });
            }
        }
    });
}