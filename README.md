# Campus Virtual - Aplicacion Web 

## Descripcion
Este proyecto consiste en un **Campus Virtual** que gestiona usuarios, roles, carreras, cursos y calificaciones, donde las operaciones disponibles dependen del rol de los usuarios.

## Tecnologias

**- Frontend:** JavaScript, HTML5, CSS

**- Backend:** C#, ASP.NET, API REST

**- Base de datos:** SQL Server

## Funcionalidades

La aplicacion cuenta con un sistema de autenticacion y autorizacion basada en roles:


**Administador**

- Gestion de usuarios

**Alumno** 

- Visualizar carreras y materias asignados
- Consultar calificaciones

**Director de estudios**

- Gestion de carreras y materias

**Preceptor**

- Gestion de cursadas

**Profesor**

- Gestion de calificaciones


## Seguridad

- Sistema de login con usuario y contraseña
- Autorizacion basada en roles
- Validacion de datos

## Instalacion y ejecucion

### Requisitos previos
Antes de instalar el **Campus Virtual**, asegurarse de tener instalado:

- Git
- Node.js
- .NET SDK
- SQL Server
- Visual Studio Code

### **Pasos de instalación**

1. **Clonar el repositorio**
   - Abrir la terminal o consola
   - Ejecutar:
     ```bash
     git clone https://github.com/GabrielP01/CampusVirtual.git
     ```

2. **Configurar la base de datos**
   - Crear una base de datos en SQL Server
   - Ejecutar el script `SQLQuery1.sql`
   - Verificar que las tablas se creen correctamente

3. **Configurar el backend**
   - Abrir el proyecto backend
   - Configurar la cadena de conexión en appsettings.json
   - Desde la carpeta backend ejecutar 
      ```bash
     dotnet restore
     ```

4. **Ejecutar el backend**
   - Desde la carpeta del backend, ejecutar:
     ```bash
     dotnet run
     ```

5. **Ejecutar el frontend**
   - Descargar Live Server de Visual Studio Code
   - Dirigirse a index.html
   - Click derecho en el editor y open with Live Server


## **Credenciales de prueba** ##
### **Usuario Administrador** ###

**Mail:** ``admin@mail.com``

**Contraseña:** ``admin``

### **Notas**
- El backend debe estar en ejecución para que el frontend funcione correctamente
- La base de datos debe estar activa antes de iniciar el sistema
