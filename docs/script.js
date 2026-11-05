var fotos = [
    { src: "fotos/foto1.jpg", texto: "Eres tu con una florecita" },
    { src: "fotos/foto2.jpg" },
    { src: "fotos/foto3.jpg" },
    { src: "fotos/foto4.jpg" },
    { src: "fotos/foto5.jpg" },
    { src: "fotos/foto6.jpg"},
    { src: "fotos/foto7.jpg" },
    { src: "fotos/foto8.jpg", texto: "Yo si un dia me dejas (más te vale que no)" }
];

var posicion = 0;
var intervalo;

var btnSi = document.getElementById("btn-si");
var btnNo = document.getElementById("btn-no");
var pantallaPregunta = document.getElementById("pantalla-pregunta");
var pantallaCarrusel = document.getElementById("pantalla-carrusel");

var foto = document.getElementById("foto");
var textoFoto = document.getElementById("texto-foto");
var contador = document.getElementById("contador");
var lluvia = document.getElementById("lluvia");


var corazones = ["❤️", "💖", "💕", "💗", "💘"];

function crearCorazon() {
    var c = document.createElement("span");
    c.className = "lluvia-corazon";
    c.textContent = corazones[Math.floor(Math.random() * corazones.length)];

    c.style.left = Math.floor(Math.random() * 95) + "%";
    c.style.fontSize = (15 + Math.floor(Math.random() * 25)) + "px";

    lluvia.appendChild(c);

    setTimeout(function () {
        c.remove();
    }, 6000);
}

setInterval(crearCorazon, 500);


var tamano = 20;

function moverNo() {
    btnNo.style.position = "fixed";

    var maxX = window.innerWidth - btnNo.offsetWidth - 10;
    var maxY = window.innerHeight - btnNo.offsetHeight - 10;

    var x = Math.floor(Math.random() * maxX);
    var y = Math.floor(Math.random() * maxY);

    btnNo.style.left = x + "px";
    btnNo.style.top = y + "px";

    if (tamano < 40) {
        tamano = tamano + 2;
        btnSi.style.fontSize = tamano + "px";
    }
}

btnNo.addEventListener("mouseover", moverNo);
btnNo.addEventListener("touchstart", function (e) {
    e.preventDefault();
    moverNo();
});
btnNo.addEventListener("click", moverNo);


btnSi.addEventListener("click", function () {
    pantallaPregunta.classList.add("oculto");
    btnNo.style.display = "none";
    pantallaCarrusel.classList.remove("oculto");

    for (var i = 0; i < 30; i++) {
        setTimeout(crearCorazon, i * 80);
    }

    mostrarFoto();
    empezarAutomatico();
});


function mostrarFoto() {
    foto.src = fotos[posicion].src;
    textoFoto.textContent = fotos[posicion].texto;
    contador.textContent = (posicion + 1) + " / " + fotos.length;
}

function siguiente() {
    posicion++;
    if (posicion >= fotos.length) {
        posicion = 0;
    }
    mostrarFoto();
}

function anterior() {
    posicion--;
    if (posicion < 0) {
        posicion = fotos.length - 1;
    }
    mostrarFoto();
}

function empezarAutomatico() {
    clearInterval(intervalo);
    intervalo = setInterval(siguiente, 5000);
}

document.getElementById("btn-siguiente").addEventListener("click", function () {
    siguiente();
    empezarAutomatico();
});

document.getElementById("btn-anterior").addEventListener("click", function () {
    anterior();
    empezarAutomatico();
});


var inicioX = 0;

foto.addEventListener("touchstart", function (e) {
    inicioX = e.touches[0].clientX;
});

foto.addEventListener("touchend", function (e) {
    var finX = e.changedTouches[0].clientX;
    var diferencia = finX - inicioX;

    if (diferencia < -40) {
        siguiente();
        empezarAutomatico();
    } else if (diferencia > 40) {
        anterior();
        empezarAutomatico();
    }
});

foto.addEventListener("dragstart", function (e) {
    e.preventDefault();
});

foto.addEventListener("mousedown", function (e) {
    inicioX = e.clientX;
});

foto.addEventListener("mouseup", function (e) {
    var diferencia = e.clientX - inicioX;

    if (diferencia < -40) {
        siguiente();
        empezarAutomatico();
    } else if (diferencia > 40) {
        anterior();
        empezarAutomatico();
    }
});