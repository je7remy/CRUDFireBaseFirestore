# Firebase CRUD (Firestore)

CRUD minimalista de tareas usando **JavaScript (ES Modules)**, **Bootstrap 5** y **Firebase Firestore**.  
Permite **crear, listar en tiempo real, editar y eliminar** registros.

> Demo local con cualquier servidor estático (Live Server, http-server, etc.).  
> Sin backend: todo corre en el navegador con Firestore.

---

## ✨ Características

- ➕ Crear tareas (título y descripción)
- 🔁 Listado **en tiempo real** (onSnapshot)
- ✏️ Editar tareas en modal
- 🗑️ Eliminar con confirmación
- 📅 Orden por fecha de creación (serverTimestamp)
- 🎨 UI con Bootstrap 5 + Bootstrap Icons

---

## 🧱 Tecnologías

- JavaScript (ESM)
- Firebase v10 (App, Firestore)
- Bootstrap 5

---

## 📂 Estructura

```
/
├── index.html
├── index.js
├── firebase.js
└── README.md
```

---

## 🚀 Puesta en marcha

1. **Clonar**
   ```bash
   git clone https://github.com/<tu-usuario>/CRUDFirebaseFirestore.git
   cd CRUDFirebaseFirestore
   ```

2. **Configurar Firebase**

   - Crea un proyecto en [Firebase Console](https://console.firebase.google.com/).
   - Habilita **Cloud Firestore** (modo de prueba solo para desarrollo).
   - Copia las credenciales del SDK web en `firebase.js` (objeto `firebaseConfig`).

3. **Reglas de seguridad**

   > Para producción, restringe escritura a usuarios autenticados.

   ```javascript
   // Firestore rules
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /tasks/{taskId} {
         allow read: if true;                  // lectura pública opcional
         allow write: if request.auth != null; // escribir solo autenticados
       }
     }
   }
   ```

4. **Servir en local** (necesario para imports tipo `module`)

   - Con VS Code: extensión **Live Server** → "Go Live"
   - O con Node:
     ```bash
     npx http-server -p 8080
     ```
   - Abre `http://localhost:8080`

---

## 📝 Uso

- Clic en **"Nuevo"** → completa el formulario → **Guardar**.
- Para **editar**, clic en **Editar** de una fila.
- Para **eliminar**, clic en **Eliminar** y confirma en el modal.

---

## 🔒 Notas de seguridad

- Las claves del SDK **no son secretas**, pero **las reglas de Firestore sí** protegen tus datos.
- Para producción:
  - Añade **Autenticación** (Google Sign-In / Email&Password).
  - Endurece las **reglas** según tu caso.
  - Considera validar longitud y contenido de campos.

---

## 🧰 Troubleshooting

- **No carga módulos / errores de CORS**: asegúrate de servir el sitio por HTTP, no abrir `file:///`.
- **Nada se muestra al crear**: revisa que Firestore esté habilitado y sin errores en consola.
- **Orden incorrecto**: verifica que `createdAt: serverTimestamp()` esté en `saveTask` y que el `query(orderBy("createdAt","desc"))` se use en el `onSnapshot`.

---

## 🗺️ Roadmap (opcional)

- Autenticación Firebase
- Paginación / búsqueda
- Validación de formularios
- Tests E2E (Playwright)
