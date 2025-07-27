# 📚 Biblioteca API: Servicio de Gestión de Libros

Una robusta y escalable API RESTful diseñada para la gestión integral de recursos bibliográficos. Desarrollada con Node.js y Express, esta solución backend emplea una arquitectura en capas para garantizar la modularidad, la mantenibilidad y la eficiencia en la manipulación de datos, utilizando Supabase como su sistema de gestión de bases de datos.

## ✨ Características Principales

* **Diseño RESTful Completo:** Implementación de principios REST para operaciones CRUD sobre la entidad `Libro`, ofreciendo una interfaz de programación de aplicaciones clara y predecible.
* **Arquitectura en Capas Robusta:**
    * **Capa de Presentación (Controladores):** Responsable de la recepción de solicitudes HTTP y la orquestación de las respuestas, actuando como interfaz entre el cliente y la lógica de negocio.
    * **Capa de Lógica de Negocio (Servicios):** Encapsula todas las reglas de negocio, validaciones complejas y coordinaciones de operaciones, asegurando la integridad y consistencia de los datos.
    * **Capa de Acceso a Datos (DAL):** Integrada lógicamente dentro de la capa de servicios, gestiona la interacción directa y abstraída con la base de datos Supabase, facilitando la portabilidad del almacenamiento.
* **Persistencia de Datos con Supabase:** Aprovecha el poder de PostgreSQL a través de Supabase para un almacenamiento de datos fiable y eficiente, con características como la autenticación y suscripciones en tiempo real disponibles para futuras expansiones.
* **Validación de Datos Exhaustiva:** Implementación de validaciones a nivel de servicio para asegurar la calidad y el formato correcto de los datos de entrada, minimizando errores y mejorando la seguridad.
* **Manejo de Errores Contextual:** Estrategia de gestión de errores diferenciada que proporciona respuestas HTTP significativas (ej., `400 Bad Request`, `404 Not Found`, `500 Internal Server Error`) con mensajes descriptivos, facilitando la depuración y la experiencia del desarrollador cliente.
* **Configuración Flexible:** Uso de variables de entorno para una gestión sencilla y segura de credenciales y configuraciones sensibles.

## 🛠️ Tecnologías del Stack

* **Backend Runtime:** [Node.js](https://nodejs.org/)
* **Web Framework:** [Express.js](https://expressjs.com/)
* **Base de Datos & BaaS:** [Supabase](https://supabase.io/) (PostgreSQL)
* **Gestión de Entorno:** [Dotenv](https://github.com/motdotla/dotenv)
* **Control de Versiones:** [Git](https://git-scm.com/)

## 📂 Estructura del Proyecto

La aplicación sigue una **arquitectura en capas (Layered Architecture)** para promover la modularidad, la separación de responsabilidades y la mantenibilidad. A continuación, se detalla la organización principal de directorios y archivos:

```
.
├── src/
│   ├── config/             # Configuración de la aplicación (e.g., conexión a la base de datos)
│   │   └── db.js           # Configuración de Supabase
│   ├── controllers/        # Capa de Presentación: Maneja peticiones HTTP, delega a servicios y envía respuestas
│   │   └── booksController.js
│   ├── routes/             # Definición de las rutas de la API (mapeo de URLs a controladores)
│   │   └── booksRoutes.js
│   ├── services/           # Capa de Lógica de Negocio: Contiene la lógica central y reglas de negocio
│   │   └── bookService.js
│   └── app.js              # Archivo principal de la aplicación Express
├── .env.example            # Archivo de ejemplo para variables de entorno
├── .gitignore              # Archivos y directorios a ignorar por Git
├── package.json            # Metadatos del proyecto y scripts
├── package-lock.json       # Bloqueo de versiones de dependencias
└── README.md               # Documentación del proyecto
```

### **Descripción de Directorios Clave:**

* **`src/`**: Contiene todo el código fuente de la aplicación.
    * **`config/`**: Almacena configuraciones globales, como la inicialización de la base de datos o variables de configuración no sensibles.
    * **`controllers/`**: Implementa la lógica de los controladores, actuando como la interfaz entre las solicitudes HTTP y la lógica de negocio. Son responsables de recibir `req`, delegar operaciones a los servicios y construir `res`.
    * **`routes/`**: Define las rutas de la API y las asocia con las funciones controladoras correspondientes, organizando los endpoints de manera clara.
    * **`services/`**: Encapsula la lógica de negocio central de la aplicación. Contiene las funciones que realizan validaciones, operaciones complejas y la interacción directa con la capa de acceso a datos (en este caso, la lógica de Supabase reside aquí como parte integral del servicio para esta escala de proyecto).
    * **`app.js`**: El punto de entrada principal de la aplicación Express, donde se configuran middlewares, se montan las rutas y se inicia el servidor.

## ⚙️ Configuración del Entorno de Desarrollo

Para poner en marcha el proyecto en tu máquina local, sigue estos pasos:

1. **Clonación del Repositorio:**
   ```bash
   git clone [URL_DE_TU_REPOSITORIO]
   cd BLIBLIOTECA_API # Asegúrate de que este es el nombre de la carpeta raíz de tu proyecto
   ```

2. **Instalación de Dependencias:**
   ```bash
   npm install
   ```

3. **Configuración de Variables de Entorno:**
   * Crea un archivo `.env` en el directorio raíz del proyecto.
   * Inserta tus credenciales y configuraciones de Supabase. Estas son esenciales para la conexión a la base de datos.
     ```env
     SUPABASE_URL=tu_url_de_proyecto_supabase
     SUPABASE_ANON_KEY=tu_clave_anon_supabase
     PORT=5000 # Puerto en el que la API escuchará (puede ser cualquier puerto disponible)
     ```
   * *Nota:* Las credenciales de Supabase se obtienen del panel de control de tu proyecto en Supabase (Sección "Project Settings" -> "API").

4. **Esquema de Base de Datos (Supabase):**
   * Asegúrate de que tu proyecto Supabase contenga la tabla `libros` con el siguiente esquema. Este esquema define la estructura de datos para los libros.
     ```sql
     CREATE TABLE libros (
         id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
         titulo VARCHAR(255) NOT NULL,
         autor VARCHAR(255) NOT NULL,
         isbn VARCHAR(255) UNIQUE NOT NULL, -- ISBN debe ser único
         year INT NOT NULL,
         genero VARCHAR(100) NOT NULL,
         stock INT NOT NULL DEFAULT 0,
         created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
     );
     ```
     *Ajusta los tipos de datos y las restricciones de las columnas según las necesidades exactas de tu modelo de datos si difieren de este ejemplo.*

## ▶️ Ejecución de la Aplicación

Para iniciar el servidor de la API:

```bash
npm start
# Para desarrollo con auto-recarga (requiere 'nodemon' instalado globalmente o como dev dependency):
npm run dev
```