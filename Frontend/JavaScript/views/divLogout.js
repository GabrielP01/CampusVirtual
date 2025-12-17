import goHome from "./home.js";
import rolHandler from "../handlers/rolHandler.js";



export default function divLogout(CONTENT){
    
    async function getRoles(){
        const data=await fetch(`http://localhost:5227/usuariosroles/${localStorage.getItem("iduser")}`)
        const resData=await data.json();
        const select=document.getElementById("select-rol");
        select.innerHTML="";
        resData.forEach(rol => {
        select.innerHTML += `<option value="${rol.rol}">${rol.rol}</option>`;
        
    });
    };
    CONTENT.innerHTML=`
    <form id="div-logout" class="forms">
        <div>
            <h2>Cambiar Rol</h2>
            
            <select id="select-rol">
                
            </select>
        <br>
        </div>
        <img id="userDefaultImg" src="./imagenes/userDefault.png">
        <button id="button-logout">Cerrar sesion</button>
    </form>
    `
    getRoles();
    

    const selectRol=document.getElementById("select-rol");
    selectRol.addEventListener("change",(e)=>{
        const selectedRol=e.target.value;
        localStorage.setItem("rol", selectedRol);
        rolHandler();
    })


    

    const buttonLogout=document.getElementById("button-logout")
    buttonLogout.addEventListener("click",()=>{
        localStorage.setItem("isLogged", "false");
        alert("Logout exitoso");
        
        localStorage.setItem("rol", "GUESS");
        rolHandler();
        goHome(CONTENT)

        
        history.pushState({}, "", "/home");
        
    })
    
    
}