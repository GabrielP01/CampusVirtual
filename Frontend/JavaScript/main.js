import rolHandler from "./handlers/rolHandler.js"
import routeHandler from "./handlers/routeHandler.js"






window.addEventListener("DOMContentLoaded", () => {
    rolHandler();
    routeHandler(location.pathname);

});





window.onpopstate = () => {
    routeHandler(location.pathname);
}












