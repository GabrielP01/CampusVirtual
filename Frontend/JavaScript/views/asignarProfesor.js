export default async function asignarProfesor(CONTENT){
    CONTENT.innerHTML=`
        <form class="forms" id="form-asign-profesor">
            <h2>Asignar profesor a materia</h2>
            <br>
            <label for="asign-profesor">Selecciona el profesor</label>
            <select id="asign-profesor"></select>
            <br>
            <label for="asign-materia">Selecciona la materia</label>
            <select id="asign-materia"></select>
            <button type="submit">Asignar</button>
        </form>
    `

    const selectProfesor=document.getElementById("asign-profesor");
    const selectMateria=document.getElementById("asign-materia");

    const getUsuariosRoles=await fetch("http://localhost:5227/usuariosroles");
    const usuariosRoles= await getUsuariosRoles.json();

    const getMaterias=await fetch("http://localhost:5227/materias")
    const materias=await getMaterias.json();

    const getUsuarios=await fetch("http://localhost:5227/usuarios");
    const usuarios=await getUsuarios.json();

    usuariosRoles.forEach(prof=>{
        console.log(prof)
        if(prof.rol=="PROFESOR"){
            usuarios.forEach(user=>{
                if(prof.idUsuario==user.idUsuario){
                const option=document.createElement("option");
                option.innerText=user.nombre;
                option.value=prof.idUsuario;
                selectProfesor.appendChild(option);
        }})}
    })

    materias.forEach(mat=>{
        const option=document.createElement("option");
        option.innerText=mat.nombre;
        option.value=mat.idMateria;
        selectMateria.appendChild(option)
    })

    const form=document.getElementById("form-asign-profesor");
    form.addEventListener("submit",async e=>{
        e.preventDefault();
        const asignar=await fetch("http://localhost:5227/asignarprofesor",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                IDUsuario:selectProfesor.value,
                IDMateria:selectMateria.value
            })
        })
        if(!asignar.ok){
            alert("No se pudo asignar el profesor a esa materia")
        }
        else{
            alert("Profesor asignado exitosamente")
        }

    })
}