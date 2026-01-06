import rolHandler from "./handlers/rolHandler.js";
import routeHandler from "./handlers/routeHandler.js";


window.addEventListener("DOMContentLoaded", () => {
    rolHandler();
    routeHandler(location.hash || "#/");
});

window.addEventListener("hashchange", () => {
    routeHandler(location.hash);
});

window.addEventListener("load",()=>{ 
    routeHandler(location.hash)
});









