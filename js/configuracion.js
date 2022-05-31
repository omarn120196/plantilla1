import { barraPorcentaje, btnAudio, btnMenu, btnRecargar, btnAtras, btnAdelante } from "./selectores.js"

//Arreglo con la información de las páginas--------------------------------------
export const paginas = [
    {
        noPagina: 1,
        ruta: 'pagina01.html'
    },
    {
        noPagina: 2,
        ruta: 'pagina02.html'
    },
    {
        noPagina: 3,
        ruta: 'pagina03.html'
    },
    {
        noPagina: 4,
        ruta: 'pagina04.html'
    },
    {
        noPagina: 5,
        ruta: 'pagina05.html'
    },
]

//Valores de elementos-----------------------------------------------------------
export const pBarraProgreso = {
    top: parseInt(barraPorcentaje.css('top')),
    left: parseInt(barraPorcentaje.css('left')),
    width: barraPorcentaje.width(),
    heigth: barraPorcentaje.height()
}

export const pBotonMenu = {
    top: parseInt(btnMenu.css('top')),
    left: parseInt(btnMenu.css('left')),
    width: btnMenu.width(),
    heigth: btnMenu.height()
}

export const pBotonRecargar = {
    top: parseInt(btnRecargar.css('top')),
    left: parseInt(btnRecargar.css('left')),
    width: btnRecargar.width(),
    heigth: btnRecargar.height()
}

export const pBotonAudio = {
    top: parseInt(btnAudio.css('top')),
    left: parseInt(btnAudio.css('left')),
    width: btnAudio.width(),
    heigth: btnAudio.height()
}

export const pBotonAtras = {
    top: parseInt(btnAtras.css('top')),
    left: parseInt(btnAtras.css('left')),
    width: btnAtras.width(),
    heigth: btnAtras.height()
}

export const pBotonAdelante = {
    top: parseInt(btnAdelante.css('top')),
    left: parseInt(btnAdelante.css('left')),
    width: btnAdelante.width(),
    heigth: btnAdelante.height()
}