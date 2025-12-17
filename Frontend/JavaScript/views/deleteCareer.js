export default async function deleteCareer(CONTENT){
    CONTENT.innerHTML=`
        <form class="forms" id="form-delete-career">
            <h2>Eliminar carrera</h2>
            <select id="select-delete-career"></select>
            <button>Eliminar</button>
        </form>
        
    `


    const selectDeleteCareer=document.getElementById("select-delete-career");
        const inSelect=await fetch("http://localhost:5227/carreras")
        const res= await inSelect.json();
        res.forEach(carrera => {
            const option=document.createElement("option");
            option.value=carrera.idCarrera;
            option.innerText=carrera.nombre;
            selectDeleteCareer.appendChild(option)
        });

    const form=document.getElementById("form-delete-career");
    form.addEventListener("submit",async e=>{
        e.preventDefault();
        const careers = await fetch(`http://localhost:5227/carreras/${selectDeleteCareer.value}`,{
            method:"DELETE",
            headers:{"Content-Type":"application/json"},
        })
        if(!careers.ok){
            alert("No se pudo eliminar la carrera")
        }
        else{
            alert("Carrera eliminada con exito")
        }
    })
}