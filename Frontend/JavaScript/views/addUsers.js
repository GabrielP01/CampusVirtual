
export default function addUsers(CONTENT){
    

    CONTENT.innerHTML=`
    <form id="form-addusers" class="forms" >
        <h2>Agregar Usuario</h2>
        <br>
        <label for="input-nombre">Nombre:</label>
        <input type="text" id="input-nombre" placeholder="Nombre" maxlength="50" required>
        <br>
        <label for="input-mail">Mail:</label>
        <input type="email" id="input-mail" placeholder="Mail" required>
        <br>
        <label for="input-dni">Numero de Documento:</label>
        <input type="number" id="input-dni" placeholder="Numero de documento" required>
        <br>
        <label for="input-telefono">Telefono:</label>
        <input type="number" id="input-telefono" placeholder="Telefono" required maxlength="20">
        <br>
        <label for="input-direccion">Direccion:</label>
        <input type="text" id="input-direccion" placeholder="Direccion" required maxlength="100">
        <br>

        <label for="select-roles">Agregar roles</label>
        <br>
        <div class="div-roles">
            <button id="button-addrol">Agregar rol</button>
            <select id="select-roles">
            </select>
        </div>
        <br>

        <label for="select-addedroles">Eliminar roles</label>
        <br>
        <div class="div-roles">
            <button id="button-deleterol">Eliminar rol</button>
            <select id="select-addedroles" required>

            </select>
        </div>
        <br>
        <button type="submit" id="button-adduser">Agregar Usuario</button>
    </form>
    `

        async function getRoles(){
            const res =await fetch("http://localhost:5227/roles")
            const roles=await res.json();
            const select=document.getElementById("select-roles");
            roles.forEach(r=>{
                const option=document.createElement("option");
                option.innerText=r.rol;
                option.value=r.rol;
                select.appendChild(option);
            })
        }
        getRoles();



        
        const buttonAddRol=document.getElementById("button-addrol")
        buttonAddRol.addEventListener("click",(e)=>{
            
            e.preventDefault()
            const selectRoles=document.getElementById("select-roles").value
            const selectAddedRoles=document.getElementById("select-addedroles")
            if(selectRoles){
                selectAddedRoles.innerHTML += `<option value="${selectRoles}">${selectRoles}</option>`;
                document.querySelector(`#select-roles option[value="${selectRoles}"]`).remove();
                
            }
            
            
        })

        const buttonDeleteRol=document.getElementById("button-deleterol")
        buttonDeleteRol.addEventListener("click",(e)=>{
            e.preventDefault()
            const selectAddedRoles=document.getElementById("select-addedroles")
            const selectedRol=selectAddedRoles.value;
            if(selectedRol){
                selectAddedRoles.querySelector(`option[value="${selectedRol}"]`).remove();
                const selectRoles=document.getElementById("select-roles")
                selectRoles.innerHTML += `<option value="${selectedRol}">${selectedRol}</option>`;
            }
        })

        const form=document.getElementById("form-addusers")
        form.addEventListener("submit",async(e)=>{
            e.preventDefault()
            const nombre=document.getElementById("input-nombre").value
            const mail=document.getElementById("input-mail").value
            const dni=document.getElementById("input-dni").value
            const telefono=document.getElementById("input-telefono").value
            const direccion=document.getElementById("input-direccion").value
            const password=dni;
            const rolesSelect=document.getElementById("select-addedroles")
            const roles=[]
            for(let i=0; i<rolesSelect.options.length; i++){
                roles.push({ Rol: rolesSelect.options[i].value });
            }
            
            

            const res=await fetch("http://localhost:5227/usuarios",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
            },
            body:JSON.stringify({
                nombre,
                mail,
                dni,
                telefono,
                direccion,
                password,
                roles
                
            })
            
        })
        if(res.ok){
            alert("Usuario agregado con exito")
            
            form.reset()
        }else{
            alert("Error al agregar usuario")
        }
    })
}