export default async function buscarMateria(CONTENT){
    CONTENT.innerHTML=`
        <form class="forms" id="form-evaluar-alumnos">
            <h2>Evaluar a alumnos</h2>
            <br>
            <label for="select-materia">Seleccione la materia a evaluar</label>
            <select id="select-materia"></select>
            <br>
            <button type="submit">Enviar</button>
        </form>
    `

    const selectMateria=document.getElementById("select-materia")

    const profMaterias=await fetch("http://localhost:5227/asignarprofesor")
    const prof=await profMaterias.json();

    const getMaterias=await fetch("http://localhost:5227/materias");
    const materias=await getMaterias.json();


    materias.forEach(mat=>{
            prof.forEach(p=>{
                if(p.idMateria==mat.idMateria){
                    const option=document.createElement("option");
                    option.innerText=mat.nombre;
                    option.value=mat.idMateria;
                    selectMateria.appendChild(option)
                }
            })
        })

    

    const form=document.getElementById("form-evaluar-alumnos");

    form.addEventListener("submit",e=>{
        window.idMateriaEvaluar=selectMateria.value
        e.preventDefault();
        routeHandler(`/profesorNota`)
        

    })


}