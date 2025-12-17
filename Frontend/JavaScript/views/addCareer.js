export default async function addCareer(CONTENT){
    CONTENT.innerHTML=`
    <form id="add-career-form" class="forms">
        <h2>Añadir carreras<h2>
        <br>

        <div>
        <label for="career-name">Nombre de la carrera</label>
        <input type="text" id="career-name" maxlength="50">
        </div>
        <br>

        <div>
        <label for="career-sigla">Sigla</label>
        <input type="text" id="career-sigla" maxlength="10">
        </div>
        <br>

        <div>
        <label for="career-año">Duracion (en años)</label>
        <input type="text" id="career-año"  maxlength="2">
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