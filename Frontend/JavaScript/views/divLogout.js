import goHome from "./home.js";
import rolHandler from "../handlers/rolHandler.js";



export default function divLogout(CONTENT){
    
    async function getRoles(){
        const data=await fetch(`http://localhost:5227/usuariosroles/${localStorage.getItem("iduser")}`)
        console.log(data)
        const resData=await data.json();
        console.log(resData)
 
        const select=document.getElementById("select-rol");
        select.innerHTML="";
        resData.forEach(rol => {
        select.innerHTML += `<option value="${rol.rol}">${rol.rol}</option>`;
        
    });
    };
    
    CONTENT.innerHTML=`
    <div id="div-logout" class="forms">
        <div>
            <h3>Cambiar Rol</h3>
            <select id="select-rol">
                
            </select>
        <br>
        </div>
        <button id="button-logout">Cerrar sesion</button>
    </div>
    `
    getRoles();
    

    const selectRol=document.getElementById("select-rol");
    selectRol.addEventListener("change",(e)=>{
        const selectedRol=e.target.value;
        localStorage.setItem("rol", selectedRol);
        console.log("Rol cambiado a: "+selectedRol);
        rolHandler();
    })


    

    const buttonLogout=document.getElementById("button-logout")
    buttonLogout.addEventListener("click",()=>{
        localStorage.setItem("isLogged", "false");
        alert("Logout exitoso");
        
        localStorage.setItem("rol", "GUESS");
        rolHandler();
        goHome(CONTENT)
        console.log(localStorage.getItem("rol"));

        
        history.pushState({}, "", "/home");
        
    })
    
    
}