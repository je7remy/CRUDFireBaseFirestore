import { saveTask, getTasks, onGetTasks, deleteTask, getTask, updateTask } from './firebase.js';

const taskForm = document.getElementById('task-form');
const modalTitle = document.getElementById('addTaskModalLabel');
const addTaskModal = new bootstrap.Modal(document.getElementById('addTaskModal'));

let editStatus = false;
let id = '';

// Evento que se ejecuta cuando el contenido HTML y los recursos asociados se han cargado
window.addEventListener('DOMContentLoaded', async () => {
    // Escuchar cambios en las tareas y actualizar la lista
    onGetTasks((querySnapshot) => {
        displayTasks(querySnapshot);
    });
});

// Función para mostrar las tareas en la tabla
function displayTasks(querySnapshot) {
    const tableBody = document.getElementById('task-table-body');
    // Limpiar el cuerpo de la tabla antes de agregar tareas
    tableBody.innerHTML = "";

    // Iterar sobre cada documento en el resultado de la consulta
    querySnapshot.forEach((doc) => {
        const task = doc.data();

        // Crear una fila para cada tarea
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.title}</td>
            <td>${task.description}</td>
            <td>
                <button class="btn-delete btn btn-danger" data-id="${doc.id}" data-bs-toggle="modal" data-bs-target="#confirmDeleteModal" >     <i class="bi bi-trash3-fill"></i>  Eliminar</button>
                <button class="btn-edit btn btn-success" data-id="${doc.id}" data-bs-toggle="modal" data-bs-target="#addTaskModal" >     <i class="bi bi-pencil-square"></i>  Editar</button>
            </td>
        `;

        // Agregar fila al cuerpo de la tabla
        tableBody.appendChild(row);

// Agregar eventos a los botones de eliminar y editar
const btnDelete = row.querySelector('.btn-delete');
btnDelete.addEventListener('click', async () => {
    const taskId = btnDelete.dataset.id;

    // Configurar el evento de confirmación de eliminación
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    confirmDeleteBtn.onclick = async () => {
        await deleteTask(taskId);
        confirmDeleteModal.hide(); 
      
    };

    // Mostrar el modal de confirmación
    confirmDeleteModal.show();
});


        const btnEdit = row.querySelector('.btn-edit');
        btnEdit.addEventListener('click', async () => {
            const taskDoc = await getTask(btnEdit.dataset.id);
            const taskData = taskDoc.data();

            // Completar el formulario con los datos de la tarea seleccionada
            taskForm['task-title'].value = taskData.title;
            taskForm['task-description'].value = taskData.description;

            // Configurar el estado de edición
            editStatus = true;
            id = taskDoc.id;

            // Cambiar el texto del botón
            taskForm['btn-task-save'].innerHTML = '<i class="bi bi-upload"> </i> Actualizar';
         
            taskForm['btn-task-save'].style.backgroundColor = '#28a745';
            // Cambiar el título del modal
            modalTitle.innerText = 'Editar';
            
        });
    });
}

// Agregar evento de envío para el formulario de tareas
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = taskForm['task-title'].value;
    const description = taskForm['task-description'].value;

    if (!editStatus) {
        // Guardar nueva tarea
        await saveTask(title, description);
    } else {
        // Actualizar tarea existente
        await updateTask(id, { title, description });

        // Restablecer el estado de edición
        editStatus = false;
        id = '';

        // Restaurar el texto del botón
        taskForm['btn-task-save'].innerHTML = '<i class="bi bi-floppy"> </i> Guardar';

        // Cambiar el título del modal de nuevo a "Add Task"
        modalTitle.innerText = 'Añadir';
    }

    // Limpiar formulario después de guardar o actualizar
    taskForm.reset();

    // Cerrar el modal
    addTaskModal.hide();
});

// Evento que se ejecuta antes de que se abra el modal
addTaskModal._element.addEventListener('show.bs.modal', function (event) {
    // Restablecer el estado de edición al abrir el modal
    editStatus = false;
    id = '';

    // Cambiar el texto del botón al abrir el modal
    taskForm['btn-task-save'].innerHTML = '<i class="bi bi-floppy"> </i> Guardar';
    taskForm['btn-task-save'].style.backgroundColor = '';
    // Cambiar el título del modal al abrirlo
    modalTitle.innerText = 'Añadir';
});

// Evento que se ejecuta después de que se cierra el modal
addTaskModal._element.addEventListener('hidden.bs.modal', function (event) {
    // Limpiar las cajas de texto al cerrar el modal
    taskForm.reset();
});
