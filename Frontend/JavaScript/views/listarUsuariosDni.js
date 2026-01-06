export default async function listarUsuariosDni(CONTENT){

    CONTENT.innerHTML=`
        <form class="forms" id="form-get-user">
            <h2>Solicitar usuario por dni</h2>
            <br>
            <label for="dni-user">Ingresa el dni a solicitar</label>
            <input type="number" id="dni-user" required>
            <br>
            <button type="submit">Solicitar</button>
        </form>
    `

    const form=document.getElementById("form-get-user");
    form.addEventListener("submit",async e=>{
        e.preventDefault();
        const dni= document.getElementById("dni-user").value
        const getUser=await fetch(`http://localhost:5227/usuariosdni/${dni}`)
        const user=await getUser.json();

        if(!getUser.ok){
            alert("No existe ese dni")
        }
        else{
            CONTENT.innerHTML=`
                <form class="forms" id="form-mostrar-user">
                    <h2>Perfil de: <>${user.nombre}</h2>
                    <br>
                    <p><strong>Numero de documento: </strong>${user.dni}</p>
                    <br>
                    <p><strong>Mail: </strong> ${user.mail}</p>
                    <br>
                    <p><strong>Telefono: </strong>${user.telefono}</p>
                    <br>
                    <p><strong> Direccion: </strong>${user.direccion}</p>
                    <br>
                    <button type="submit">Volver</button>
                </form>
            `

            const formUser=document.getElementById("form-mostrar-user");
            formUser.addEventListener("submit",async e=>{
                e.preventDefault();
                routeHandler("#/")
            })
        }

    })

    


}