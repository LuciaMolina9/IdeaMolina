//variables y constantes
let carrito = [];
let carritoFiltrado = [];
let carritoGuardado = JSON.stringify(carrito);
let prodSel = {};
let tablaCarrito = document.getElementById("tablaCarrito");
let idProd = 1
let eliminarId = 0
let eliminado = 0

//Recuperacion del Local Storage previo a comenzar
localStorage.getItem('carritoGuardado')


//funciones
//Toma de datos del formulario
let miFormulario = document.getElementById("formulario");
miFormulario.addEventListener ("submit", validacion);

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
    localStorage.setItem('carrito', carritoGuardado)
    idProd++;
}


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
        console.log(carrito);
        renderizar();
}


//creacion del carrito en storage

















//almacenamiento de carrito


