
export default async function notas(CONTENT) {
    const reqNotas = await fetch("http://localhost:5227/notas")
    const notas = await reqNotas.json();

    const reqMaterias = await fetch("http://localhost:5227/materias")
    const materias = await reqMaterias.json();

    const insMateria = await fetch("http://localhost:5227/inscripcionesmaterias")
    const ins = await insMateria.json();


    const idUser = localStorage.getItem("iduser")


    CONTENT.innerHTML = `
        <form class="forms" id="form-consultar-notas">
            <h2>Notas de tus materias</h2>
            <br>
            <div id="notas-materias"></div>
            <button>Volver</button>
        </form>
    `

    const div = document.getElementById("notas-materias");

    const inscripcionesUsuario = ins.filter(i => i.idUsuario == idUser);

    inscripcionesUsuario.forEach(inscripcion => {


        const materia = materias.find(
            m => m.idMateria == inscripcion.idMateria
        );


        const nota = notas.find(
            n => n.idMateria == inscripcion.idMateria && n.idUsuario == idUser
        );

        const divMateria = document.createElement("div");
        divMateria.classList.add("materia");

        divMateria.innerHTML = `
            <h3>${materia.nombre}</h3>
            <p>${nota ? nota.nota : "No se agregaron notas"}</p>
        `;

        div.appendChild(divMateria);
    });
    

    const form=document.getElementById("form-consultar-notas");
    form.addEventListener("submit",async e=>{
        e.preventDefault();

        routeHandler("/")
    })
}


