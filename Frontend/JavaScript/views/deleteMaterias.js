export default async function deleteMaterias(CONTENT){
    CONTENT.innerHTML=`
        <form id="form-delete-materia" class="forms">
            <h2>Eliminar Materias</h2>
            <br>
            <label for="select-delete-materia">Seleccione la materia a eliminar</label>
            <select id="select-delete-materia"></select>
            <br>
            <button class="button-delete">Eliminar</button>
        </form>
    `

    const select=document.getElementById("select-delete-materia");
    const res=await fetch("http://localhost:5227/materias");
    const materias= await res.json();
    materias.forEach(materia=>{
        const option=document.createElement("option");
        option.innerText=materia.nombre;
        option.value=materia.idMateria;
        select.appendChild(option);
    })

    const form=document.getElementById("form-delete-materia");
    form.addEventListener("submit",async e=>{
        e.preventDefault();
        const deleteMateria=await fetch(`http://localhost:5227/materias/${select.value}`,{
            method:"DELETE",
            headers:{"Content-Type":"application/json"}
        })
        if(!deleteMateria.ok){
            alert("No se ha podido eliminar la materia")
        }
        else{
            alert("Materia eliminada exitosamente")
        }
    })
}