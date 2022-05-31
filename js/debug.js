const contendorPáginas = $('#cont-paginas');

function cargarPagina(noPagina){

    let url;

    //Ruta de la página
    if(noPagina<10){
        url = `contenido/pagina0${noPagina}.html`;
    }
    else{
        url = `contenido/pagina${noPagina}.html`;
    }   
    

    //Visualizar página
    jQuery(function($){

        $.get(url, {}, function(data){
            contendorPáginas.html(data);
        });
    });

    //Posicionar los elementos
    setTimeout(()=>{
        posicionarElementos();
    }, 50)
}

function posicionarElementos(){

    //Elementos
    const elementos = $('.elementos');
    console.log(elementos);

    $.each(elementos, function(){
        const idElemento = this.id;
        const elemento = $(`#${idElemento}`);
        const posicionX = elemento.data('posx');
        const posicionY = elemento.data('posy');

        elemento.css({
            'top': `${posicionY}px`,
            'left': `${posicionX}px`
        });
    });
}