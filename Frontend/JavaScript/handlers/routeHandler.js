import home from "../views/home.js"
import profile from "../views/profile.js"
import functions from "../views/functions.js"
import formLogin from "../views/formLogin.js"
import divLogout from "../views/divLogout.js"
import addUsers from "../views/addUsers.js"
import addCareer from "../views/addCareer.js"
import deleteUsers from "../views/deleteUsers.js"
import editCareer from "../views/editCareer.js"
import deleteCareer from "../views/deleteCareer.js"
import addMaterias from "../views/addMaterias.js"
import editMaterias from "../views/editMaterias.js"
import deleteMaterias from "../views/deleteMaterias.js"
import carreraInscripcion from "../views/carreraInscripcion.js"

export default function routeHandler(route){
    const CONTENT = document.getElementById("content")
    switch(route){
            case "/":
            home(CONTENT);
            break;
            case "/profile":
            profile(CONTENT);
            break;
            case "/functions":
            functions(CONTENT);
            break;
            case "/login":
            formLogin(CONTENT);
            break;
            case "/logout":
            divLogout(CONTENT);
            break;
            case "/addUsers":
            addUsers(CONTENT);
            break;
            case "/deleteUsers":
            deleteUsers(CONTENT);
            break;
            case "/addCareer":
            addCareer(CONTENT);
            break;
            case "/editCareer":
            editCareer(CONTENT);
            break;
            case "/deleteCareer":
            deleteCareer(CONTENT)
            break;
            case "/addMaterias":
            addMaterias(CONTENT);
            break;
            case "/editMaterias":
            editMaterias(CONTENT);
            break;
            case "/deleteMaterias":
            deleteMaterias(CONTENT);
            break;
            case "/carreraInscripcion":
            carreraInscripcion(CONTENT);
            break;
            default:
                home(CONTENT);
            break;
        }
}
