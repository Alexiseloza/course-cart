

/// Variables del proyecto

const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');


// Event Listeners
cargarEventListeners();

function cargarEventListeners(){
        // dispara la funcion cuando presiona "Agregar al Carrito"
        cursos.addEventListener('click', comprarCurso);

        // elimina el curso de el carrito
        carrito.addEventListener('click' , eliminarCurso);

        // vaciar el carrito BTN
        vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

        // recuperando carrito desde local storage
        document.addEventListener('DOMContentLoaded', leerLocalStorage);

}



//  FUNCIONES DE EL PROGRAMA 
      // comprarCurso agrega el curso al carrito !!
function comprarCurso(e) {
     e.preventDefault();
     // delegation para agregar carrito !!
     if(e.target.classList.contains('agregar-carrito')){
          const curso = e.target.parentElement.parentElement;
               // envia los datos del curso seleccionado
          leerDatosCurso(curso);
     }
}
 // lee los datos del cursos

 function leerDatosCurso(curso) {
               const infoCurso ={
                    imagen:curso.querySelector('img').src,
                    titulo: curso.querySelector('h4').textContent,
                    precio: curso.querySelector('.precio span').textContent,
                    id: curso.querySelector('a').getAttribute('data-id')
               }

      insertarCarrito(infoCurso);
 }

 // muestra el curso en el carrito

 function insertarCarrito(curso) {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td> <img src="${curso.imagen}" width=100 > </td>
          <td> ${curso.titulo}</td>
          <td> ${curso.precio}</td>
           <td> <a href="#" class="borrar-curso" data-id="${curso.id}">X</a> </td>
      
      `;
      
      listaCursos.appendChild(row);
      guardarCursoLocalStorage(curso);
     
 }

 // elimina el curso de el carrito
 function eliminarCurso(e) {
      e.preventDefault();

      let curso, curosId;
      if(e.target.classList.contains('borrar-curso')) {
           e.target.parentElement.parentElement.remove();
           curso = e.target.parentElement.parentElement;
           cursoId = curso.querySelector('a').getAttribute('data-id');
           //console.log(cursoId)
      }
          // funcion que elimina el curso que se elimina en el carrito de local storage
        eliminarCursoLocalStorage(cursoId);
      
 }

 // funcion  para eliminar cursos con el boton vaciar carrito
 function vaciarCarrito(){
     // modo 1 
      //  => // listaCursos.innerHTML='';

     // metodo recomendado
     while(listaCursos.firstChild) {
          listaCursos.removeChild(listaCursos.firstChild);
     }
     

     // vaciar totalmente Local Storage
     vaciarLocalStorage();
     return false;
 }

 // almacenar la los cursos seleccionados en local storage
 function guardarCursoLocalStorage(curso) {
     let cursos;

     cursos = obtenerCursosLocalSotorage();

     cursos.push(curso);

     localStorage.setItem('cursos', JSON.stringify(cursos) );
 }

 // comprobacion de los itmes en local storage
 function obtenerCursosLocalSotorage(){
      let cursosLS;

      // verificar local storage
      if(localStorage.getItem('cursos') === null){
           cursosLS = [];
      }else{
           cursosLS = JSON.parse(localStorage.getItem('cursos') );
      }
      return cursosLS;
 }

 // recuperar el carrito leyendo el local storage
 function leerLocalStorage(){
     let cursosLS;

     cursosLS = obtenerCursosLocalSotorage();
      
     //reconstruir el template del carrito desde local storage

     cursosLS.forEach(function(curso) {
          const row = document.createElement('tr');
           row.innerHTML = `
          <td> <img src="${curso.imagen}" width=100 > </td>
          <td> ${curso.titulo}</td>
          <td> ${curso.precio}</td>
           <td> <a href="#" class="borrar-curso" data-id="${curso.id}">X</a> </td>
      
                    `;
           listaCursos.appendChild(row);
     });
 }

 // elimina el curso por ID  de local storage

 function eliminarCursoLocalStorage(curso){
          let cursosLS;

          cursosLS = obtenerCursosLocalSotorage();

          cursosLS.forEach(function(cursoLS, index) {
               if(cursoLS.id === curso){
                    cursosLS.splice(index, 1);
               }
          });
          
          localStorage.setItem('cursos', JSON.stringify(cursosLS) );

 }

 // vaciar totalmente local storage

 function vaciarLocalStorage(){
      localStorage.clear();
 }