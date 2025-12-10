export default async function editMaterias(CONTENT){
    CONTENT.innerHTML=`
    <form id="confirm-form-edit-materia" class="forms">
        <h2>Editar materias</h2>
        <br>
        <label for="select-materia">Seleccione materia a editar</label>
        <select id="select-materia">
        </select>
        <button>Editar</button>
    </form>
    `

    const select=document.getElementById("select-materia");
    const res=await fetch("http://localhost:5227/materias");
    const materias= await res.json();
    console.log(materias)
    materias.forEach(materia=>{
        const option=document.createElement("option");
        option.innerText=materia.nombre;
        option.value=materia.idMateria;
        select.appendChild(option);
    })

    const form=document.getElementById("confirm-form-edit-materia");
    form.addEventListener("submit",async e=>{
        e.preventDefault();
        const edit=await fetch(`http://localhost:5227/materias/${select.value}`)
        console.log(select.value)

        if(!edit.ok){
            alert("No existe esa materia")
        }
        else{
            alert(`Vas a editar la materia: ${select.value}`)
            CONTENT.innerHTML=`
                <form class="forms" id="form-edit-materia">
                    <h2>Estas editando ${select.innerText}</h2>
                    <br>
                    <label for="edit-materia-nombre">Nombre</label>
                    <input id="edit-materia-nombre" type="text">
                    <br>
                    <label for="edit-materia-descripcion">Descripcion</label>
                    <input id="edit-materia-descripcion">
                    <br>
                    <label for="edit-materia-duracion">Duracion</label>
                    <input id="edit-materia-duracion">
                    <br>
                    <label for="select-edit-carrera">Carrera</label>
                    <select id="select-edit-carrera"></select>
                    <br>
                    <button>Editar</button>
                </form>
            `

            const selectCarrera=document.getElementById("select-edit-carrera");
            const getCarreras=await fetch("http://localhost:5227/carreras");
            const carreras=await getCarreras.json();
            carreras.forEach(carrera=>{
                const option=document.createElement("option");
                option.innerText=carrera.nombre;
                option.value=carrera.idCarrera;
                selectCarrera.appendChild(option)
            })

            const formEditMateria=document.getElementById("form-edit-materia")
            formEditMateria.addEventListener("submit",async e=>{
                e.preventDefault();

                const nombre=document.getElementById("edit-materia-nombre").value;
                const descripcion=document.getElementById("edit-materia-descripcion").value;
                const duracion=document.getElementById("edit-materia-duracion").value;
                

                const query=await fetch(`http://localhost:5227/materias/${selectCarrera.value}`,{
                    method:"PUT",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify({
                        nombre,
                        descripcion,
                        duracion,
                        idCarrera:selectCarrera.value
                    })
                })
                if(!query.ok){
                    alert("No se pudo modificar la materia");
                }
                else{
                    alert("Materia modificada exitosamente")
                }
            })
        }


    }

)
}