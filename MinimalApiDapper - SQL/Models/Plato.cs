namespace MinimalApiDapper.Models;

public class Plato
{
    public int Plato_ID { get; set; }
    public string Plato_Nombre { get; set; }
    public string Plato_Descripcion { get; set; }
    public string Plato_Foto { get; set; }
    public string Plato_Dificultad { get; set; }
    public int Plato_Precio { get; set; }
    public int Categoria_ID { get; set; }
}