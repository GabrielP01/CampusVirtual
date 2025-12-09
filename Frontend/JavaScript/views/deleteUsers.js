export default async function deleteUsers(CONTENT){
    CONTENT.innerHTML=`
        <form id="form-delete-users" class="forms">
            <label for="form-dni-delete">Selecciona el dni del usuario a eliminar</label>
            <input type="number" id="form-dni-delete">
            <br>
            <button>Eliminar usuario</button>
        </form>
    `

    
    
    const formDeleteUser=document.getElementById("form-delete-users")

    formDeleteUser.addEventListener("submit",async e=>{
        e.preventDefault();
        const dniDelete =document.getElementById("form-dni-delete").value;

        const res= await fetch(`http://localhost:5227/deleteusers${dniDelete}`,{
            method:"DELETE",
            headers:{"Content-Type":"application/json"},
        })
        if(!res.ok){
            ("Dni incorrecto")
        }
        else{
            alert("Usuario eliminado con exito")
        
        }
    })
}