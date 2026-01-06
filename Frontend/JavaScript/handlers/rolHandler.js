import routeHandler from "./routeHandler.js";

export default function rolHandler(){
   
    
    const nav=document.getElementById("nav")
    switch(localStorage.getItem("rol")){
        case "ADMINISTRADOR":
            nav.innerHTML=`<ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/profile">Perfil</a></li>
            <li><a href="/addUsers">Agregar usuarios</a></li>
            <li><a href="/deleteUsers">Eliminar usuarios</a></li>
            <li><a href="/listarUsuariosDni">Buscar usuario por dni</a></li>
            <li><a href="/logout">Salir</a></li>
        </ul>`;
            break;
        case "DIRECTOR DE ESTUDIOS":
            nav.innerHTML=`<ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/profile">Perfil</a></li>
            <li><a href="/addCareer">Agregar carrera</a></li>
            <li><a href="/editCareer">Editar carreras</a></li>
            <li><a href="/deleteCareer">Eliminar carreras</a></li>
            <li><a href="/addMaterias">Agregar materias</a></li>
            <li><a href="/editMaterias">Editar materias</a></li>
            <li><a href="/deleteMaterias">Eliminar materias</a></li>
            <li><a href="/logout">Salir</a></li>
        </ul>`;
            break;
            case "PROFESOR":
            nav.innerHTML=`<ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/profile">Perfil</a></li>
            <li><a href="/buscarMateria">Notas</a></li>
            <li><a href="/logout">Salir</a></li>
            </ul>`;
            break;
        case "PRECEPTOR":
            nav.innerHTML=`<ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/profile">Perfil</a></li>
            <li><a href="/asignarProfesor">Asignar profesor</a></li>
            <li><a href="/logout">Salir</a></li>
        </ul>`;
            break;
        case "ALUMNO":
            nav.innerHTML=`<ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/profile">Perfil</a></li>
            <li><a href="/carreraInscripcion">Carreras</a></li>
            <li><a href="/materiaInscripcion">Inscripcion a Materias</a></li>
            <li><a href="/notas">Notas</a></li>
            <li><a href="/logout">Salir</a></li>
        </ul>`;
            break;
            default:
            nav.innerHTML=`
            <ul>
                <li><a href="/">Inicio</a></li>
                <li><a href="/login">Ingresar</a></li>
            </ul>`;
            break;

    }
    const ANCHORS=document.querySelectorAll("a")
    ANCHORS.forEach((anchor)=>{
    anchor.addEventListener("click",(e)=>{
        e.preventDefault()

        const url = new URL(e.currentTarget.href);
        history.pushState({}, "", url.pathname);
        routeHandler(url.pathname);
    })
})
}