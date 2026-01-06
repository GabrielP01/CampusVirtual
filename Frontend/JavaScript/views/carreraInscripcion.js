
export default async function carreraInscripcion(CONTENT){
    const tengoCarrera=await fetch("http://localhost:5227/inscripcionescarreras")
    const res=await tengoCarrera.json();
    const idUser=localStorage.getItem("iduser")
    const auxArr=[]
    res.forEach(ins => {
        if(idUser==ins.idUsuario){
            auxArr.push("1")
        }
    });
    if(auxArr.length===0){
        CONTENT.innerHTML=`
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
        
        const select=document.getElementById("inscribirse-carrera");
        const getCarreras= await fetch("http://localhost:5227/carreras");
        const carreras= await getCarreras.json();
        carreras.forEach(carrera=>{
        const option=document.createElement("option");
        option.innerText=carrera.nombre;
        option.value=carrera.idCarrera;
        select.appendChild(option)
        })

        const form=document.getElementById("form-inscripcion-carrera");
        form.addEventListener("submit",async e=>{
            e.preventDefault();
            const inscribirse=await fetch("http://localhost:5227/inscripcionescarreras",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    idUsuario:idUser,
                    idCarrera:select.value
                })
            })
            if(!inscribirse.ok){
                alert("No se pudo inscribir a la carrera")
            }
            else{
                alert("Inscripcion exitosa")
                routeHandler("#/carrerainscripcion")
            }
        })
    }
    else{
        const getCarreras = await fetch("http://localhost:5227/carreras")
        const carreras = await getCarreras.json();
        res.forEach(ins=>{
            if(idUser==ins.idUsuario){
                const carreraInscripta=carreras.find(e=> e.idCarrera==ins.idCarrera)

                CONTENT.innerHTML=`
            <form class="forms" id="form-consultar-notas">
                <h2>Carreras</h2>
                <br>
                <h3>Estas inscripto a ${carreraInscripta.nombre}</h3>
                <h5>Desea consultar las notas de sus materias?</h5>
                <button type="submit">Consultar</button>
            </form>
        `
            }
        })
        
        
        const form=document.getElementById("form-consultar-notas")

        form.addEventListener("submit",async (e)=>{
            e.preventDefault();
            const consulta=await fetch(`http://localhost:5227/notas`)
            if(!consulta.ok){
                alert("No se encontraron materias")
            }
            else{
                routeHandler("#/notas")
                
            }
        })
        

    }

    
}