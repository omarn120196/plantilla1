export function animacionEntrada(elemento, direccion, tiempo, delay = 0){

    // Hacer visible el elemento
    elemento.css({
        'display': 'block',
        'opacity': 1
    });
    
    // Seleccionar Animación
    switch(direccion){
        case 'derecha-izquierda':
            gsap.from(elemento, {
                opacity: 0,
                x: 500,
                duration: tiempo,
                delay: delay,
                ease: "back.out(1.7)" 
            });
            break;
        case 'izquierda-derecha':
            gsap.from(elemento, {
                opacity: 0,
                x: -500,
                duration: tiempo,
                delay: delay,
                ease: "back.out(1.7)" 
            });
            break;
        case 'arriba-abajo':
            gsap.from(elemento, {
                opacity: 0,
                y: -500,
                duration: tiempo,
                delay: delay,
                ease: "back.out(1.7)" 
            });
            break;
        case 'abajo-arriba':
            gsap.from(elemento, {
                opacity: 0,
                y: 500,
                duration: tiempo,
                delay: delay,
                ease: "back.out(1.7)" 
            });
            break;
        default : 
            gsap.from(elemento, {
                opacity: 0,
                duration: tiempo,
                delay: delay 
            });
            break;
    }
}

export function animacionSalida(elemento, direccion, tiempo, delay = 0){
    
    // Seleccionar Animación
    switch(direccion){
        case 'izquierda-derecha':
            gsap.to(elemento, {
                opacity: 0,
                x: 500,
                duration: tiempo,
                delay: delay,
                ease: "back.in(1.7)"
            });
            break;
        case 'derecha-izquierda':
            gsap.to(elemento, {
                opacity: 0,
                x: -500,
                duration: tiempo,
                delay: delay,
                ease: "back.in(1.7)"
            });
            break;
        case 'abajo-arriba':
            gsap.to(elemento, {
                opacity: 0,
                y: 500,
                duration: tiempo,
                delay: delay,
                ease: "back.in(1.7)"
            });
            break;
        case 'arriba-abajo':
            gsap.to(elemento, {
                opacity: 0,
                y: -500,
                duration: tiempo,
                delay: delay,
                ease: "back.in(1.7)"
            });
            break;
        default : 
            gsap.to(elemento, {
                opacity: 0,
                duration: tiempo,
                delay: delay,
                ease: "back.in(1.7)" 
            });
            break;
    }

    const retraso = (delay * 1000) + 1000;

    setTimeout(()=>{
        elemento.css('display', 'none');
    }, retraso)
}

export function parpadea(elemento, tiempo=.8, delay=0){
    
    
    // Hacer visible el elemento
    elemento.css({
        'display': 'block',
        'opacity': .4,
        'cursor': 'pointer'
    });

    gsap.to(elemento, {
        duration: tiempo,
        delay: delay,
        repeat: -1,
        yoyo: true,
        opacity: 1,
        ease: "sine.inOut"
    });

    
}

export function zoom(elemento){

    gsap.to(elemento, {
        duration: .8,
        scale: 1.1,
        repeat: -1,
        yoyo: true,
    })
}