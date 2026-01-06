export default async function editMaterias(CONTENT){
    CONTENT.innerHTML=`
    <form id="confirm-form-edit-materia" class="forms">
        <h2>Editar materias</h2>
        <br>
        <label for="select-materia">Seleccione materia a editar</label>
        <select id="select-materia">
        </select>
        <br>
        <button>Editar</button>
    </form>
    `

    const select=document.getElementById("select-materia");
    const res=await fetch("http://localhost:5227/materias");
    const materias= await res.json();
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
        if(!edit.ok){
            alert("No existe esa materia")
        }
        else{
            const mat=await edit.json();
            console.log(mat)
            alert(`Vas a editar la materia: ${mat[0].nombre}`)
            CONTENT.innerHTML=`
                <form class="forms" id="form-edit-materia">
                    <h2>Estas editando ${mat[0].nombre}</h2>
                    <br>
                    <label for="edit-materia-nombre">Nombre</label>
                    <input id="edit-materia-nombre" type="text" maxlength="50">
                    <br>
                    <label for="edit-materia-descripcion">Descripcion</label>
                    <input id="edit-materia-descripcion" maxlength="100">
                    <br>
                    <label for="edit-materia-duracion">Duracion</label>
                    <input id="edit-materia-duracion" maxlength="20">
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

                console.log(mat[0].idMateria)
                const query=await fetch(`http://localhost:5227/materias/${mat[0].idMateria}`,{
                    method:"PUT",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify({
                        nombre,
                        descripcion,
                        duracion,
                        idCarrera:mat[0].idCarrera
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