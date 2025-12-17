using System.Collections.Generic;

namespace MinimalApiDapper.Models;

public class Usuarios
{
    public int IDUsuario { get; set; }
    public string Nombre { get; set; }
    public int Dni { get; set; }
    public string Mail { get; set; }
    public string Telefono { get; set; }
    public string Direccion { get; set; }
    public string Password { get; set; }
    public List<UsuariosRoles> UsuariosRoles { get; set; } =new List<UsuariosRoles>();
}