const socket = io();

let size = 20; 
let ide = 0; 

let elementos = [];
let cursores = []; 
let color = 1000;

function setup() {
    createCanvas(800,800)
    ide = int(Math.random() * 1000);
}

function draw(){
    background(200); 

    elementos.forEach(e => {
        fill(e.r, e.g, e.b);
        ellipse(e.x, e.y, e.size, e.size)
    });

    cursores.forEach(e => {
        fill(0, 0, 0);
        ellipse(e.x, e.y, e.size, e.size)
    });
}

function mousePress() {
    const elemento = {
        x: mouseX,
        y: mouseY,
        r: color.r,
        g: color.g,
        b: color.b,
        size
    }
    socket.emit("enviar-elemento", elemento)
}

function mouseDragged() {
    const elemento = {
        x: mouseX,
        y: mouseY,
        r: color.r,
        g: color.g,
        b: color.b,
        size, 
        id: ide
    };
    socket.emit("enviar-cursor", elemento)
}

socket.on("elemento-recibido", (elemento) =>{
    console.log("recibido: ", elemento);
    elementos.push(elemento)
})

socket.on("cursor-recibido", (elemento) =>{
    console.log("cursor: ", elemento);

    let cursorIndex = cursores.findIndex((item) => elemento.id == item.id);
    if (cursorIndex == 1) {
        cursores[cursorIndex] = elemento; 
    }else{
        cursores.push(elemento)
    }
})
