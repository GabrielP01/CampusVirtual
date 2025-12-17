export default async function profesorNota(CONTENT) {
    const getMaterias = await fetch("http://localhost:5227/materias")
    const materias = await getMaterias.json();

    materias.forEach(async mat => {

        if (mat.idMateria == idMateriaEvaluar) {
            CONTENT.innerHTML = `
        <form class="forms" id="form-agregar-nota">
            <h2>Vas a evaluar ${mat.nombre}</h2>
            <br>
            <label for="dni-evaluar">Ingresa el dni a evaluar</label>
            <input type="number" id="dni-evaluar" maxlength="20">
            <br>
            <label for="nota-evaluar">Ingresa la nota</label>
            <input type="number" id="nota-evaluar" maxlength="2">
            <br>
            <button type="submit">Enviar</button>
        </form>
        `
            const getUsuarios = await fetch("http://localhost:5227/usuarios")
            const usuarios = await getUsuarios.json()



            

            
            



            const form = document.getElementById("form-agregar-nota");
            form.addEventListener("submit", async e => {
                e.preventDefault();

                const dni = document.getElementById("dni-evaluar").value;
                const nota = document.getElementById("nota-evaluar").value;

                let idUsuario = "";
                usuarios.forEach(u => {
                    if (dni == u.dni) {
                        idUsuario = u.idUsuario
                        console.log(idUsuario)
                    }
                })
                console.log(nota)
                console.log(idMateriaEvaluar)
                console.log(idUsuario)

                const res = await fetch("http://localhost:5227/notas", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        nota,
                        idUsuario,
                        idMateria: mat.idMateria
                    })
                })
                if (!res.ok) {
                    alert("No se encontro el dni")
                }
                else {
                    alert("Nota asignada exitosamente")
                }
            })
        }
    })





}