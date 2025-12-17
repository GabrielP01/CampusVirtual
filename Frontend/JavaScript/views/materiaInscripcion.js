export default async function materiaInscripcion(CONTENT) {
    const inscripto = await fetch("http://localhost:5227/inscripcionescarreras")
    const res = await inscripto.json();
    const idUser = localStorage.getItem("iduser")
    const auxArr = []
    res.forEach(ins => {
        if (idUser == ins.idUsuario) {
            auxArr.push("1")
        }
    })
    if (auxArr.length == 0) {
        CONTENT.innerHTML = `
        <form id="form-inscripcion-carrera" class="forms">
            <h2>Inscripcion a Carrera</h2>
            <br>
            <h3>No estas inscripto en ninguna carrera</h3>
            <br>
            <label for="inscribirse-carrera">Inscribite ahora</label>
            <select id="inscribirse-carrera"></select>
            <br>
            <button type="submit">Inscribirse</button>
        </form>
        `

        

    } else {
        CONTENT.innerHTML = `
        <form class="forms" id="form-inscribirse-materia">
            <h2>Inscripcion a materias</h2>
            <br>
            <label for="inscribirse-materia">Selecciona las materias que desea cursar</label>
            <select id="inscribirse-materia"></select>
            <br>
            <button type="submit">Inscribirse</button>
        </form>
        `

        const select = document.getElementById("inscribirse-materia");

        const getMaterias = await fetch("http://localhost:5227/materias");
        const materias = await getMaterias.json();
        const inscripcionUsuario = res.find(ins => ins.idUsuario == idUser);

        materias.forEach(materia => {
            if (materia.idCarrera == inscripcionUsuario.idCarrera) {
                const option=document.createElement("option");
                option.innerText=materia.nombre;
                option.value=materia.idMateria;
                select.appendChild(option)
            }
        });

        const form=document.getElementById("form-inscribirse-materia");
        form.addEventListener("submit",async e=>{
            e.preventDefault();

            const inscribirse=await fetch("http://localhost:5227/inscripcionesmaterias",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    IDMateria:select.value,
                    idUsuario:idUser
                })
            });
            if(!inscribirse.ok){
                alert("No se pudo inscribir")
            }
            else{
                alert("Inscripcion exitosa")
            }

        })
    }



}