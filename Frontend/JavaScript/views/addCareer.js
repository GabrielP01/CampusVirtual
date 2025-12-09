export default async function addCareer(CONTENT){
    CONTENT.innerHTML=`
    <form id="add-career-form" class="forms">
        <h2>Añadir carreras<h2>
        <br>

        <div>
        <label for="career-name">Nombre de la carrera</label>
        <input type="text" id="career-name">
        </div>
        <br>

        <div>
        <label for="career-sigla">Sigla</label>
        <input type="text" id="career-sigla">
        </div>
        <br>

        <div>
        <label for="career-año">Año de curso</label>
        <input type="text" id="career-año">
        </div>
        <br>
        <button type="submit">Crear carrera</button>

    </form>
    `

    const addCareerForm=document.getElementById("add-career-form")
    addCareerForm.addEventListener("submit", async e=>{
        e.preventDefault();
        const Nombre=document.getElementById("career-name").value;
        const Sigla=document.getElementById("career-sigla").value;
        const AñoCursada=document.getElementById("career-año").value;


        const res = await fetch("http://localhost:5227/addcareer",{
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify({
                Nombre,
                Sigla,
                AñoCursada
            })
        })
        
        if(!res.ok){
            alert("No se pudo agregar una carrera")
        }else{
            
            alert("Carrera agregada con exito")
        }

    })
    
}