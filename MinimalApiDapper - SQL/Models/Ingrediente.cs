using System;

namespace MinimalApiDapper.Models;

public class Ingrediente
{
    public int Ingrediente_ID { get; set; }
    public string Ingrediente_Nombre { get; set; }
    public string Ingrediente_Unidad_Medida { get; set; }
    public int Ingrediente_Cantidad { get; set; }
}