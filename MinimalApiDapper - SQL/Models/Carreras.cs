using System.Collections.Generic;

namespace MinimalApiDapper.Models;

public class Carreras
{
    public int IDCarrera{get;set;}
    public string Nombre { get; set; }
    public string Sigla { get; set; }
    public string AñoCursada { get; set; }
}