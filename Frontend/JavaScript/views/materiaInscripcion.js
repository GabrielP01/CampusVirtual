export default async function materiaInscripcion(CONTENT){
    const inscripto=await fetch("http://localhost:5227/inscripcionescarreras")
    const res=await inscripto.json();
    const idUser=localStorage.getItem("iduser")
    const auxArr=[]
    
    res.forEach(ins=>{
        if(idUser==ins.idUsuario){
            auxArr.push()
        }
    })

    CONTENT.innerHTML=`

    `

}