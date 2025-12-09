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
    public List<Roles> Roles { get; set; } =new List<Roles>();
}