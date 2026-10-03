// =========================================
// ELEMENTOS
// =========================================

const botonComenzar =
    document.getElementById("botonComenzar");

const botonReiniciar =
    document.getElementById("botonReiniciar");

const inicio =
    document.getElementById("inicio");

const principal =
    document.getElementById("principal");

const elementos =
    document.querySelectorAll(".elemento");

const modal =
    document.getElementById("modal");

const mensajeModal =
    document.getElementById("mensajeModal");

const cerrarModal =
    document.getElementById("cerrarModal");

const progreso =
    document.getElementById("progreso");

const barraProgreso =
    document.getElementById("barraProgreso");

const final =
    document.getElementById("final");

const corazonesFondo =
    document.getElementById("corazones-fondo");


// =========================================
// VARIABLES
// =========================================

let descubiertos = 0;

let todosDescubiertos = false;


// =========================================
// BOTÓN COMENZAR
// =========================================

botonComenzar.addEventListener("click", () => {

    inicio.classList.add("oculto");

    principal.classList.remove("oculto");

});


// =========================================
// CORAZONES FLOTANTES DEL FONDO
// =========================================

function crearCorazonFlotante() {

    const corazon =
        document.createElement("span");

    corazon.classList.add(
        "corazon-flotante"
    );


    // Diferentes corazones

    const tipos = [
        "♡",
        "♥",
        "❤",
        "♡",
        "♥"
    ];


    corazon.textContent =
        tipos[
            Math.floor(
                Math.random() *
                tipos.length
            )
        ];


    // Posición horizontal aleatoria

    corazon.style.left =
        Math.random() * 100 + "%";


    // Tamaño aleatorio

    const tamaño =
        Math.random() * 18 + 12;

    corazon.style.fontSize =
        tamaño + "px";


    // Duración aleatoria

    const duracion =
        Math.random() * 7 + 7;

    corazon.style.animationDuration =
        duracion + "s";


    // Retraso aleatorio

    corazon.style.animationDelay =
        Math.random() * 2 + "s";


    // Lo agregamos al fondo

    corazonesFondo.appendChild(
        corazon
    );


    // Lo eliminamos después de la animación

    setTimeout(() => {

        corazon.remove();

    }, (duracion + 3) * 1000);

}


// =========================================
// CREAR CORAZONES CONTINUAMENTE
// =========================================

setInterval(() => {

    crearCorazonFlotante();

}, 700);


// =========================================
// CREAR ALGUNOS INMEDIATAMENTE
// =========================================

for (let i = 0; i < 8; i++) {

    setTimeout(() => {

        crearCorazonFlotante();

    }, i * 400);

}


// =========================================
// EXPLOSIÓN DE CORAZONES
// =========================================

function explosionCorazones(elemento) {

    const rect =
        elemento.getBoundingClientRect();


    const centroX =
        rect.left +
        rect.width / 2;


    const centroY =
        rect.top +
        rect.height / 2;


    for (let i = 0; i < 12; i++) {

        const corazon =
            document.createElement("span");


        corazon.classList.add(
            "corazon-explosion"
        );


        corazon.textContent =
            i % 2 === 0
                ? "♥"
                : "♡";


        // Posición inicial

        corazon.style.left =
            centroX + "px";

        corazon.style.top =
            centroY + "px";


        // Dirección aleatoria

        const angulo =
            Math.random() *
            Math.PI *
            2;


        const distancia =
            Math.random() *
            100 +
            50;


        const x =
            Math.cos(angulo) *
            distancia;


        const y =
            Math.sin(angulo) *
            distancia;


        const rotacion =
            Math.random() *
            90 -
            45;


        corazon.style.setProperty(
            "--x",
            x + "px"
        );


        corazon.style.setProperty(
            "--y",
            y + "px"
        );


        corazon.style.setProperty(
            "--rotacion",
            rotacion + "deg"
        );


        document.body.appendChild(
            corazon
        );


        // Eliminar después

        setTimeout(() => {

            corazon.remove();

        }, 1100);

    }

}


// =========================================
// CLIC EN LOS OBJETOS
// =========================================

elementos.forEach((elemento) => {

    elemento.addEventListener("click", () => {


        // =================================
        // PRIMERA VEZ QUE SE DESCUBRE
        // =================================

        if (!elemento.dataset.visto) {

            elemento.dataset.visto =
                "true";


            // Lo marcamos visualmente

            elemento.classList.add(
                "descubierto"
            );


            // Aumentamos contador

            descubiertos++;


            // Actualizamos texto

            progreso.textContent =
                `Has descubierto ${descubiertos} de 10 ❤️`;


            // Actualizamos barra

            const porcentaje =
                (
                    descubiertos /
                    elementos.length
                ) * 100;


            barraProgreso.style.width =
                porcentaje + "%";


            // ¿Ya encontró todos?

            if (
                descubiertos ===
                elementos.length
            ) {

                todosDescubiertos =
                    true;

            }

        }


        // =================================
        // EFECTO EN CADA CLIC
        // =================================
        //
        // Esto sucede aunque el objeto
        // ya haya sido descubierto.
        //

        explosionCorazones(
            elemento
        );


        // =================================
        // MOSTRAR MENSAJE
        // =================================

        mensajeModal.textContent =
            elemento.dataset.mensaje;


        modal.classList.remove(
            "oculto"
        );

    });

});


// =========================================
// CERRAR VENTANA
// =========================================

function cerrarVentana() {

    modal.classList.add(
        "oculto"
    );


    // =====================================
    // SI YA DESCUBRIÓ LOS 10
    // =====================================

    if (todosDescubiertos) {


        // Mostrar carta final

        final.classList.remove(
            "oculto"
        );


        // Mostrar botón
        // SOLO cuando aparece la carta final

        botonReiniciar.classList.remove(
            "oculto"
        );


        // Esperar un poco y bajar

        setTimeout(() => {

            final.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }, 300);

    }

}


// =========================================
// BOTÓN X
// =========================================

cerrarModal.addEventListener(
    "click",
    cerrarVentana
);


// =========================================
// CERRAR HACIENDO CLIC FUERA
// =========================================

modal.addEventListener(
    "click",
    (evento) => {

        if (
            evento.target === modal
        ) {

            cerrarVentana();

        }

    }
);


// =========================================
// BOTÓN VOLVER A EMPEZAR
// =========================================

botonReiniciar.addEventListener(
    "click",
    () => {


        // =================================
        // REINICIAR CONTADOR
        // =================================

        descubiertos = 0;

        todosDescubiertos = false;


        // =================================
        // REINICIAR TEXTO
        // =================================

        progreso.textContent =
            "Has descubierto 0 de 10 ❤️";


        // =================================
        // REINICIAR BARRA
        // =================================

        barraProgreso.style.width =
            "0%";


        // =================================
        // REINICIAR OBJETOS
        // =================================

        elementos.forEach((elemento) => {

            delete elemento.dataset.visto;

            elemento.classList.remove(
                "descubierto"
            );

        });


        // =================================
        // OCULTAR CARTA FINAL
        // =================================

        final.classList.add(
            "oculto"
        );


        // =================================
        // OCULTAR BOTÓN
        // =================================

        botonReiniciar.classList.add(
            "oculto"
        );


        // =================================
        // CERRAR MODAL
        // =================================

        modal.classList.add(
            "oculto"
        );


        // =================================
        // REGRESAR A LA PANTALLA INICIAL
        // =================================

        principal.classList.add(
            "oculto"
        );

        inicio.classList.remove(
            "oculto"
        );


        // =================================
        // REGRESAR ARRIBA
        // =================================

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);