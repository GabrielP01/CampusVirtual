
export default async function addMaterias(CONTENT){
    CONTENT.innerHTML=`
        <form id="form-add-materia" class="forms">
            <h2>Agregar materias</h2>
            <br>
            <label>Elige la carrera a la que desees agregar materias</label>
            <select id="select-carreras"></select>
            <br>
            <label for="name-materia">Nombre</label>
            <input type="text" id="name-materia" maxlength="50" required>
            <br>
            <label for="descripcion-materia">Descripcion</label>
            <input type="text" id="descripcion-materia" maxlength="100" required>
            <br>
            <label for="duracion-materia">Duracion</label>
            <input type="text" id="duracion-materia" maxlength="20" required>
            <button>Agregar</button>
        </form>
    
    `

    const selectCarrera=document.getElementById("select-carreras");
    const select=await fetch("http://localhost:5227/carreras")
    const resSelect=await select.json();
    resSelect.forEach(carrera => {
        console.log(carrera)
        const option=document.createElement("option");
        option.value=carrera.idCarrera;
        option.innerText=carrera.nombre;
        selectCarrera.appendChild(option)
    });

    const formAddMateria=document.getElementById("form-add-materia");
    formAddMateria.addEventListener("submit",async e=>{
        e.preventDefault();
        


        const nombre=document.getElementById("name-materia").value;
        const descripcion=document.getElementById("descripcion-materia").value;
        const duracion=document.getElementById("duracion-materia").value;
        const idCarrera=selectCarrera.value
        console.log(idCarrera, nombre, descripcion, duracion)


        const res=await fetch("http://localhost:5227/materias",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                idCarrera,
                nombre,
                descripcion,
                duracion
            })
        })
        if(!res.ok){
            alert("No se pudo agregar materia");
        }
        else{
            alert("Materia agregada con exito")
        }

    })
}