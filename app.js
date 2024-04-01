let inpTextTarea = document.getElementById("inpTextTarea");
let ul = document.querySelector("ul");
let arrayTareas = JSON.parse(localStorage.getItem("Tareas")) || [];

function agregarTarea(tarea) {
  /* --------------- li --------------- */
  let li = document.createElement("li");
  li.textContent = tarea;
  ul.appendChild(li); // Al final

  /* ---------- Boton Editar ---------- */
  let botonEditar = document.createElement("button");
  botonEditar.textContent = "Editar";
  botonEditar.className = "btnEditar";

  botonEditar.onclick = function () {
    let nuevaTarea = prompt("Edita tu tarea", tarea);
    if (nuevaTarea !== null && nuevaTarea.trim() !== "") {
      let indice = arrayTareas.indexOf(tarea);
      if (indice !== -1) {
        arrayTareas[indice] = nuevaTarea;
        localStorage.setItem("Tareas", JSON.stringify(arrayTareas));
        li.textContent = nuevaTarea;
        li.appendChild(botonEditar); // Al final
        li.appendChild(botonEliminar); // Al final
        window.location.reload();
      }
    }
  };
  li.appendChild(botonEditar); // Al final

  /* --------- Boton Eliminar --------- */
  let botonEliminar = document.createElement("button");
  botonEliminar.textContent = "Eliminar";
  botonEliminar.className = "btnEliminar";
  botonEliminar.onclick = function () {
    let resultado = confirm("¿Estás seguro de querer borrar esta tarea?");
    if (resultado) {
      // Encuentra el índice de la tarea en el array
      let indice = arrayTareas.indexOf(tarea);

      // Si la tarea existe en el array, elimínala
      if (indice !== -1) {
        arrayTareas.splice(indice, 1);
      }

      // Actualiza el localStorage
      localStorage.setItem("Tareas", JSON.stringify(arrayTareas));

      // Elimina la tarea de la lista en el DOM
      ul.removeChild(li);
    } else {
      return;
    }
  };
  li.appendChild(botonEliminar); // Al final
}

inpTextTarea.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && inpTextTarea.value.trim() !== "") {
    agregarTarea(inpTextTarea.value); // li.textContent = inpTextTarea.value;
    arrayTareas.push(inpTextTarea.value);
    localStorage.setItem("Tareas", JSON.stringify(arrayTareas));
    inpTextTarea.value = ""; /*Dejar al final*/
  }
});

window.onload = function () {
  arrayTareas.forEach(agregarTarea);
};
