export default function home(CONTENT){
    
    CONTENT.innerHTML=`
    <img id="school-img" src="./Imagenes/school.jpg"/>
    `

    history.pushState({}, "", "/")
}