import divLogout from "./divLogout.js"
import rolHandler from "../handlers/rolHandler.js";
import home from "./home.js";


export default function formLogin(CONTENT){
    

    CONTENT.innerHTML=`
    <form id="login-form"class="forms">
        <label for="mail">mail</label>
        <input type="email" id="mail" name="mail" required >
        <br>
        <label for="password">Contraseña</label>
        <input type="password" id="password" name="password" required maxlength="40">
        <br>
        <button id="button-login" type="submit">Ingresar</button>
    </form>
    `
    const form=document.getElementById("login-form")
    form.addEventListener("submit",async (e)=>{
        e.preventDefault()
        const mail=document.getElementById("mail").value
        const password=document.getElementById("password").value

        const response=await fetch("http://localhost:5227/login",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                mail,
                password
            })
        })

        if (!response.ok) {
            localStorage.setItem("isLogged", "false");
            alert("Mail o contraseña incorrectos");
            return;

            }else{
                
                const data= await response.json();
                const rolResponse = await fetch(`http://localhost:5227/usuariosroles/${data.idUsuario}`);
                const roles = await rolResponse.json();


                alert("Login exitoso");
                localStorage.setItem("isLogged", "true");
                localStorage.setItem("roles", JSON.stringify(roles));
                localStorage.setItem("rol",roles[0].rol)
                localStorage.setItem("iduser", data.idUsuario);
                rolHandler();
                home(CONTENT);
                
                
            }

            
        });

    
    history.pushState({}, "", "/login")
}
