export default async function alumnoInscripcion(CONTENT){

    const getCarreras=await fetch("http://localhost:5227/carreras")

    

    CONTENT.innerHTML=`
        <form id="form-inscripcion" class="forms">
            <h2>Inscripcion a materias</h2>
            <label>Ya estas inscripto a una carrera?</label>
            <div>
                <button type="submit" id="tiene-carrera">Si</button>
                <button type="submit" id="no-tiene-carrera">No</button>
            </div>
        </form>
    `
        const tieneCarrera=document.getElementById("tiene-carrera");
        const noTieneCarrera=document.getElementById("no-tiene-carrera");

        tieneCarrera.addEventListener("click",async e=>{
            e.preventDefault();

            CONTENT.innerHTML=""
        })

    
    const form=document.getElementById("form-inscripcion")
    form.addEventListener("submit",async e=>{
        e.preventDefault();
        

        
    })


}