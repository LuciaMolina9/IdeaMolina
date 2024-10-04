//variables y constantes
let carrito = [];
let carritoFiltrado = [];
let carritoGuardado = [];
let prodSel = {};
let tablaCarrito = document.getElementById("tablaCarrito");
let idProd = 1
let eliminarId = 0
let eliminado = 0


//Local Storage
//Recuperacion
function traerCarrito() {
    carritoGuardado = localStorage.getItem("carrito");
    carrito = JSON.parse(carritoGuardado);
    console.log(carrito);
    renderizar();
}

//Subida al carrito
function subirCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

//funciones
//Toma de datos del formulario

function validacion(e) {
    e.preventDefault ();
    let formulario = e.target;
    tipo = formulario.children[1].value;
    talle = formulario.children[2].value;
    color = formulario.children[3].value;
    id = idProd;
    prodSel = new productos (tipo, talle, color, id);
    console.log (prodSel);
    carrito.push(prodSel);
    console.log(carrito);
    renderizar();
    subirCarrito ();
    idProd++;
}

//Eliminar carrito, compra finalizada
//pendiente de agregado, la idea es usar clear

//constructor de productos desde datos del formulario
class productos {
    constructor (tipo, talle, color, id) {
        this.tipo = tipo;
        this.talle = talle;
        this.color = color;
        this.id = id;
    }
}

//renderizacion
function renderizar () {
    tablaCarrito.innerHTML = " ";
        for(prodSel of carrito) {
            const fila = document.createElement("tr");
            fila.innerHTML = `
            <td>${prodSel.tipo}</td>
            <td>${prodSel.talle}</td>
            <td>${prodSel.color}</td>
        `;
            //boton eliminar
            let td = document.createElement("td");
            td.id = prodSel.id;
            let eliminar = document.createElement("button");
            eliminar.innerText = "Descartar";
            eliminar.addEventListener("click", eliminarProducto)
            td.append(eliminar);
            fila.append(td);
            tablaCarrito.append(fila);
        }
    
}

//eliminar del carrito
function eliminarProducto(e) {
        eliminado = prodSel.id;
        carritoFiltrado = carrito.filter((productos) => productos.id != eliminado);
        console.log("se elimina "+ eliminado); 
        carrito = carritoFiltrado;
        subirCarrito();
        console.log(carrito);
        renderizar();
}

/*Tengo un problema con la eliminacion. la idea era que cada producto en el carrito tenga un id, y cada boton de eliminar tambien. 
Que al tocar un boton, filtre por mismo id. Pero no puedo hacerlo funcionar. Queda pendiente de mejora
*/

//Programa
traerCarrito();
let miFormulario = document.getElementById("formulario");
miFormulario.addEventListener ("submit", validacion);

