class Articulo{
    constructor(articulo){
        this._codigo = articulo.codigo;
        this._nombre = articulo.nombre;
        this._precio = articulo.precio;
        this._cantidad = articulo.cantidad;
        this._descripcion = articulo.descripcion;
    }

    get codigo(){
        return this._codigo;
    }

    get nombre(){
        return this._nombre;
    }

    get precio(){
        return this._precio;
    }

    get cantidad(){
        return this._cantidad;
    }

    get descripcion(){
        return this._descripcion;
    }
}

class Negocio{
    constructor(tabla){
        this._tabla = tabla;
        this._vector = [];
    }

    _agregar(articulo){
        let row = this._tabla.insertRow(-1);

        let cellCodigo = row.insertCell(0);
        let cellNombre = row.insertCell(1);
        let cellPrecio = row.insertCell(2);
        let cellCantidad = row.insertCell(3);
        let cellDescripcion = row.insertCell(4);
        row.insertCell(5);

        cellCodigo.innerHTML = articulo.codigo;
        cellNombre.innerHTML = articulo.nombre;
        cellPrecio.innerHTML = articulo.precio;
        cellCantidad.innerHTML = articulo.cantidad;
        cellDescripcion.innerHTML = articulo.descripcion;
        this._agregarBotonEliminar(row, articulo);

        let objArticulo = {
            codigo: articulo.codigo,
            nombre: articulo.nombre,
            precio: articulo.precio,
            cantidad: articulo.cantidad,
            descripcion: articulo.descripcion
        }
        this._vector.push(objArticulo);
    }

    _agregarBotonEliminar(row, articulo){
        let btnEliminar = document.createElement("input");
        btnEliminar.value = "Eliminar";
        btnEliminar.type = "button";
        btnEliminar.id = "btnEliminar";

        btnEliminar.addEventListener("click", () => {
            let x = new Negocio();
            x._eliminar(row, articulo)
        });
        row.cells[5].innerHTML = "";
        row.cells[5].appendChild(btnEliminar);
    }

    _eliminar(row, articulo){
        let x = this._buscarParaEliminar(articulo.codigo);
        this._vector.splice(x, 1);
        row.remove();
    }

    _buscarParaEliminar(codigo){
        let resultado = -1;
        this._vector.forEach((articulo, index) => {
            if(articulo.codigo === codigo){
                resultado = index;
                return;
            }
        });
        return resultado;
    }
}

let n1 = new Negocio(document.querySelector("#tabla"));

document.querySelector("#btn").addEventListener('click', () => {
    let codigo = Number(document.querySelector("#codigo").value);
    let nombre = document.querySelector("#nombre").value;
    let precio = Number(document.querySelector("#precio").value);
    let cantidad = Number(document.querySelector("#cantidad").value);
    let descripcion = document.querySelector("#descripcion").value;

    let objArticulo = {
        codigo: codigo,
        nombre: nombre,
        precio: precio,
        cantidad: cantidad,
        descripcion: descripcion
    }

    let articulo = new Articulo(objArticulo);

    n1._agregar(articulo);
});