export default async function editCareer(CONTENT) {
    CONTENT.innerHTML = `
        <form id="form-edit-career" class="forms">
            <h2>Editar carreras</h2>
            <label>Seleccione una carrera a editar</label>
            <select id="select-career">
                
            </select>
            <button type="submit">Editar</button>
        </form>
    `

    const selectCareer = document.getElementById("select-career");
    const careers = await fetch("http://localhost:5227/carreras")
    const rescareers = await careers.json();
    rescareers.forEach(career => {
        console.log(career)
        const option=document.createElement("option");
        option.value=career.idCarrera;
        option.innerText=career.nombre;
        selectCareer.appendChild(option)
    })



    const formEditCareer = document.getElementById("form-edit-career");
    formEditCareer.addEventListener("submit", async e => {
        e.preventDefault();

        const res=await fetch(`http://localhost:5227/carrera/${selectCareer.value}`,{
        })
        if(!res.ok){
            alert("a")
        }
        else{
            console.log(careers)
            alert("Vas a editar la carrera "+selectCareer.innerText)
            CONTENT.innerHTML=`
            <form id="edit-career" class="forms">
                <h2>Estas editando la carrera ${selectCareer.innerText}</h2>
                <label for="edit-career-name">Nuevo nombre</label>
                <input type="text" id="edit-career-name">
                <br>
                <label for="edit-career-sigla">Nueva sigla</label>
                <input type="text" id="edit-career-sigla">
                <br>
                <label for="edit-career-año">Nuevo año de cursada</label>
                <input type="number" id="edit-career-año">
                <br>
                <button>Editar</button>
            </form>
            `
        }

        const editCareer=document.getElementById("edit-career");
        

        editCareer.addEventListener("submit",async e=>{
            e.preventDefault();
            const nombre=document.getElementById("edit-career-name").value;
            const sigla=document.getElementById("edit-career-sigla").value;
            const añoCursada=document.getElementById("edit-career-año").value;
            const res=await fetch(`http://localhost:5227/carrerasedit/${selectCareer.value}`,
                {
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    nombre,
                    sigla,
                    añoCursada
                })
                }
            )
            if(!res.ok){
                alert("No se pudo modificar la carrera")
            }
            else{
                alert("Carrera modificada con exito")
            }
            home()
        })
        


    })
}