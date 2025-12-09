export default async function profile(CONTENT){
    fetch(`http://localhost:5227/usuarios/${localStorage.getItem("iduser")}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        CONTENT.innerHTML=`
            <form class="forms" id="form-profile">
                <h1>Perfil de ${data.nombre}</h1>

                <div>
                <label for="profile-nombre">Nombre completo</label>
                <input type="text" id="profile-nombre" value="${data.nombre}" >
                </div>
                <br>
                
                <div>
                <label for="profile-dni">Numero de documento</label>
                <input type="text" id="profile-dni" value="${data.dni}">
                </div>
                <br>
                
                <div>
                <label for="profile-mail">Mail</label>
                <input type="text" id="profile-mail" value="${data.mail}">
                </div>
                <br>

                <div>
                <label for="profile-telefono">Telefono</label>
                <input type="text" id="profile-telefono" value="${data.telefono}">
                </div>
                <br>
                
                <div>
                <label for="profile-direccion">Direccion</label>
                <input type="text" id="profile-direccion" value="${data.direccion}">
                </div>
                <br>
                
                <div>
                <label for="profile-password">Contraseña</label>
                <input type="password" id="profile-password" value="*******">
                </div>
                <button type="submit" id="button-edit-profile">Editar Perfil</button>
            </form>
    `

        const formProfile=document.getElementById("form-profile")
        formProfile.addEventListener("submit",async e=>{
            e.preventDefault();
            const nombre=document.getElementById("profile-nombre").value
            const dni=document.getElementById("profile-dni").value
            const mail=document.getElementById("profile-mail").value
            const telefono=document.getElementById("profile-telefono").value
            const direccion=document.getElementById("profile-direccion").value
            const password=document.getElementById("profile-password").value

            const res=await fetch(`http://localhost:5227/usuariosedit/${localStorage.getItem("iduser")}`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    nombre,
                    dni,
                    mail,
                    telefono,
                    direccion,
                    password,
                })
            })
            if(!res.ok){
                alert("No se pudo modificar el usuario")
            }
            else{
                alert("Usuario modificado con exito")
            }
        })
    });
    history.pushState({}, "", "/profile")
}