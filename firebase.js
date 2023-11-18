// Importar las funciones necesarias de los SDK que necesitas
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { 
    getFirestore, 
    collection, 
    addDoc,
    getDocs,
    onSnapshot,
    doc,
    deleteDoc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

// Configuración de tu aplicación Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB_kw_5xUspEGbNMiankV47xb8zYibcUr8",
    authDomain: "todolist-4e930.firebaseapp.com",
    projectId: "todolist-4e930",
    storageBucket: "todolist-4e930.appspot.com",
    messagingSenderId: "542324701195",
    appId: "1:542324701195:web:25749737808eeb34126f0e"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Obtener la instancia de Firestore
const db = getFirestore();

// Función para guardar una tarea en la base de datos
export const saveTask = (title, description) =>
    addDoc(collection(db, "tasks"), { title, description });

// Función para obtener todas las tareas de la base de datos
export const getTasks = () => getDocs(collection(db, 'tasks'));

// Función para escuchar cambios en las tareas y ejecutar un callback
export const onGetTasks = (callback) => onSnapshot(collection(db, 'tasks'), callback);

// Función para eliminar una tarea por su ID
export const deleteTask = async (taskId) => {
    try {
        const taskRef = doc(db, "tasks", taskId);
        await deleteDoc(taskRef);
        console.log(`Tarea con ID ${taskId} eliminada correctamente`);
    } catch (error) {
        console.error("Error al intentar eliminar la tarea:", error);
    }
};

// Función para obtener una tarea por su ID
export const getTask = id => getDoc(doc(db, "tasks", id));

// Función para actualizar una tarea por su ID con nuevos campos
export const updateTask = (id, newFields) => 
    updateDoc(doc(db, 'tasks', id), newFields);

