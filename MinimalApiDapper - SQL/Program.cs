using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Dapper;
using Microsoft.Data.SqlClient;
using MinimalApiDapper.Models;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity.Data;
using LoginRequest = MinimalApiDapper.Models.LoginRequest;
using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using System.Data;

namespace MinimalApiDapper;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);


        builder.Services.AddAuthorization();


        builder.Services.AddCors(options =>
 {
     options.AddPolicy("AllowFront",
         policy => policy
             .WithOrigins("http://127.0.0.1:5500")
             .AllowAnyHeader()
             .AllowAnyMethod()
             .AllowCredentials()
             .SetIsOriginAllowed(_ => true)
     );
 });
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var app = builder.Build();


        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        // app.UseHttpsRedirection();


        app.UseCors("AllowFront");

        app.UseAuthorization();




        string connectionString = "Server=DESKTOP-QZLN37\\SQLEXPRESS;Database=DBWebEscuelaFinal;User Id=UserWebEscuela;Password=DBLogin123;TrustServerCertificate=true";
        

        app.MapPost("/login", async (LoginRequest req) =>
        {
            using var connection = new SqlConnection(connectionString);
            var user = await connection.QueryFirstOrDefaultAsync<Usuarios>(
                "Usuarios_Login",
                new { Mail = req.Mail, Password = req.Password },
                commandType: System.Data.CommandType.StoredProcedure
            );
            return user is not null ? Results.Ok(user) : Results.Unauthorized();
        });

        app.MapGet("/usuarios/{id}", async (int id) =>
        {
            using var connection = new SqlConnection(connectionString);
            var user = await connection.QueryFirstOrDefaultAsync<Usuarios>(
                "Usuarios_Find",
                new { IDUsuario = id },
                commandType: System.Data.CommandType.StoredProcedure
            );
            return user is not null ? Results.Ok(user) : Results.NotFound();
        });

        app.MapGet("/usuarios", async () =>
        {
            var connection = new SqlConnection(connectionString);

            using var multi = await connection.QueryMultipleAsync(
            "Usuarios_List",
            commandType: System.Data.CommandType.StoredProcedure
            );

            var usuarios = (await multi.ReadAsync<Usuarios>()).ToList();

            var roles = (await multi.ReadAsync<Roles>()).ToList();

            foreach (var user in usuarios)
            {
                user.Roles = roles.Where(r => r.IDUsuario == user.IDUsuario).ToList();
            }

            return Results.Ok(usuarios);
        });



        app.MapPost("/usuarios", async (Usuarios usuario) =>
        {

            using var connection = new SqlConnection(connectionString);
            int ID = await connection.ExecuteScalarAsync<int>(
                "Usuarios_Insert",
                new { usuario.Nombre, usuario.Dni, usuario.Mail, usuario.Telefono, usuario.Direccion, usuario.Password },
                commandType: System.Data.CommandType.StoredProcedure
            );
            usuario.IDUsuario = ID;

            if (usuario.Roles != null)
            {
                foreach (var rol in usuario.Roles)
                {
                    await connection.ExecuteAsync(
                        "UsuarioRoles_Insert",
                        new { IDUsuario = usuario.IDUsuario, Rol = rol.Rol },
                        commandType: System.Data.CommandType.StoredProcedure
                    );
                }
            }
            return Results.Created($"/usuario/{usuario.IDUsuario}", usuario);
        });

        app.MapDelete("/deleteusers{dni}",async (int dni) =>
        {
            using var connection=new SqlConnection(connectionString);
            int user= await connection.ExecuteAsync(
                "Usuarios_Delete",
                new{Dni=dni},
                commandType:System.Data.CommandType.StoredProcedure
            );
            return user > 0 ? Results.NoContent() : Results.NotFound();  
            
        });

        app.MapGet("/usuariosroles", async () =>
        {
            using var connection = new SqlConnection(connectionString);

            var roles = await connection.QueryAsync<Roles>(
                "Roles_List",
                commandType: System.Data.CommandType.StoredProcedure
            );


            return roles is not null ? Results.Ok(roles) : Results.NotFound();
        });

        app.MapGet("/usuariosroles/{id}", async (int id) =>
        {
            using var connection = new SqlConnection(connectionString);
            var roles = await connection.QueryAsync<Roles>(
                "UsuariosRoles_ByUser",
                new { IDUsuario = id },
                commandType: System.Data.CommandType.StoredProcedure
            );

            return roles is not null ? Results.Ok(roles) : Results.NotFound();
        });

        app.MapPut("/usuariosedit/{id}", async (int id, Usuarios usuario)=>{
            using var connection=new SqlConnection(connectionString);
            var edit=await connection.ExecuteAsync(
                "Usuarios_Update",
                new{usuario.Nombre,usuario.Dni,usuario.Mail,usuario.Telefono,usuario.Direccion, usuario.Password,IDUsuario=id},
                commandType:System.Data.CommandType.StoredProcedure
            );
            return edit > 0 ? Results.Ok() : Results.NotFound();
            
        });

        app.MapPost("/addcareer",async (Carreras carrera) =>
        {
            using var connection=new SqlConnection(connectionString);
            int ID = await connection.ExecuteScalarAsync<int>(
                "Carreras_Insert",
                new{carrera.Nombre,carrera.Sigla,carrera.AñoCursada},
                commandType:System.Data.CommandType.StoredProcedure
            );
            carrera.IDCarrera=ID;
            return Results.Created($"/carreras/{carrera.IDCarrera}", carrera);
        });

        app.MapGet("/carreras",async () =>
        {
            using var connection=new SqlConnection(connectionString);
            var carreras = await connection.QueryAsync<Carreras>(
                "Carreras_List",
                commandType:System.Data.CommandType.StoredProcedure
            );

            return carreras is not null ? Results.Ok(carreras) : Results.NotFound();
        
        });

        app.MapGet("/carrera/{id}",async (int id) =>
        {
            using var connection=new SqlConnection(connectionString);
            var carreras=await connection.QueryAsync<Carreras>(
                "Carreras_ListById",
                new{IDCarrera=id},
                commandType:System.Data.CommandType.StoredProcedure
            );

            return carreras is not null ? Results.Ok(carreras) : Results.NotFound();
        });

        app.MapPut("/carrerasedit/{id}",async (int id, Carreras carrera) =>
        {
            using var connection=new SqlConnection(connectionString);
            var edit=await connection.ExecuteAsync(
                "Carreras_Update",
                new{carrera.Nombre,carrera.Sigla,carrera.AñoCursada, IDCarrera=id},
                commandType:System.Data.CommandType.StoredProcedure
            );
            return edit > 0 ? Results.Ok() : Results.NotFound();
        });

        app.MapDelete("/carreras/{id}",async (int id) =>
        {
           using var connection=new SqlConnection(connectionString);
           var career=await connection.ExecuteAsync(
            "Carreras_Delete",
            new{IDCarrera=id},
            commandType:System.Data.CommandType.StoredProcedure
           );
           return career > 0 ? Results.NoContent() : Results.NotFound();
        });

        app.MapPost("/materias",async (Materias materia) =>
        {
            using var connection=new SqlConnection(connectionString);
            var id=await connection.ExecuteScalarAsync<int>(
                "Materias_Insert",
                new {materia.IDCarrera, materia.Nombre,materia.Descripcion,materia.Duracion},
                commandType:System.Data.CommandType.StoredProcedure
            );
            materia.IDMateria=id;
            return Results.Created($"/materias/{materia.IDMateria}", materia);
        });

        app.MapGet("/materias", async () =>
        {
            using var connection=new SqlConnection(connectionString);
            var materias=await connection.QueryAsync<Materias>(
                "Materias_List",
                commandType:System.Data.CommandType.StoredProcedure
            );
            return materias is not null ? Results.Ok(materias) : Results.NotFound();
        });

        app.MapGet("/materias/{id}",async (int id)=>{
            using var connection=new SqlConnection(connectionString);
            var materia=await connection.QueryAsync<Materias>(
                "Materias_ListById",
                new{IDMateria=id},
                commandType:System.Data.CommandType.StoredProcedure
            );
            return materia is not null ? Results.Ok(materia) : Results.NotFound();
        });

        app.MapPut("/materias/{id}",async (int id,Materias materia) =>
        {
           using var connection=new SqlConnection(connectionString);
           var edit= await connection.ExecuteAsync(
            "Materias_Update",
            new{materia.Nombre,materia.Descripcion,materia.Duracion,materia.IDCarrera, IDMateria=id},
            commandType:System.Data.CommandType.StoredProcedure
           );
            return edit > 0 ? Results.Ok() : Results.NotFound();
       });

       app.MapDelete("/materias/{id}",async (int id) =>
       {
           using var connection=new SqlConnection(connectionString);
           var delete=await connection.ExecuteAsync(
            "Materias_Delete",
            new{IDMateria=id},
            commandType:System.Data.CommandType.StoredProcedure
           );
           return delete > 0 ? Results.NoContent() : Results.NotFound();
       });

       app.MapPost("/inscripcionesmaterias",async (InscripcionesMaterias inscripcion) =>
       {
          using var connection=new SqlConnection(connectionString);
          var id=await connection.ExecuteScalarAsync<int>(
            "InscripcionesMaterias_Insert",
            new{inscripcion.IDUsuario,inscripcion.IDMateria},
            commandType:System.Data.CommandType.StoredProcedure
          ) ;
          inscripcion.IDInscripcion=id;
          return Results.Created($"/inscripcionesmaterias/{inscripcion.IDInscripcion}", inscripcion);
       });

       app.MapGet("/inscripcionesmaterias", async () =>
        {
            using var connection=new SqlConnection(connectionString);
            var inscripcion=await connection.QueryAsync<InscripcionesMaterias>(
                "InscripcionesMaterias_List",
                commandType:System.Data.CommandType.StoredProcedure
            );
            return inscripcion is not null ? Results.Ok(inscripcion) : Results.NotFound();
        });

        app.MapGet("/inscripcionesmaterias/{id}",async (int id)=>{
            using var connection=new SqlConnection(connectionString);
            var inscripcion=await connection.QueryAsync<InscripcionesMaterias>(
                "InscripcionesMaterias_ListById",
                new{IDInscripcion=id},
                commandType:System.Data.CommandType.StoredProcedure
            );
            return inscripcion is not null ? Results.Ok(inscripcion) : Results.NotFound();
        });

        app.MapPost("/inscripcionescarreras",async (InscripcionesCarreras inscripcion) =>
       {
          using var connection=new SqlConnection(connectionString);
          var id=await connection.ExecuteScalarAsync<int>(
            "InscripcionesCarreras_Insert",
            new{inscripcion.IDUsuario,inscripcion.IDCarrera},
            commandType:System.Data.CommandType.StoredProcedure
          ) ;
          inscripcion.IDInscripcion=id;
          return Results.Created($"/inscripcionescarreras/{inscripcion.IDInscripcion}", inscripcion);
       });

       app.MapGet("/inscripcionescarreras", async () =>
        {
            using var connection=new SqlConnection(connectionString);
            var inscripcion=await connection.QueryAsync<InscripcionesCarreras>(
                "InscripcionesCarreras_List",
                commandType:System.Data.CommandType.StoredProcedure
            );
            return inscripcion is not null ? Results.Ok(inscripcion) : Results.NotFound();
        });

        app.MapGet("/inscripcionescarreras/{id}",async (int id)=>{
            using var connection=new SqlConnection(connectionString);
            var inscripcion=await connection.QueryAsync<InscripcionesCarreras>(
                "InscripcionesCarreras_ListById",
                new{IDInscripcion=id},
                commandType:System.Data.CommandType.StoredProcedure
            );
            return inscripcion is not null ? Results.Ok(inscripcion) : Results.NotFound();
        });
        
        app.MapPost("/notas",async (Notas notas) =>
       {
          using var connection=new SqlConnection(connectionString);
          var id=await connection.ExecuteScalarAsync<int>(
            "Notas_Insert",
            new{notas.Nota,notas.IDUsuario,notas.IDMateria},
            commandType:System.Data.CommandType.StoredProcedure
          ) ;
          notas.IDNota=id;
          return Results.Created($"/notas/{notas.IDNota}", notas);
       });
        
        app.MapGet("/notas", async () =>
        {
            using var connection=new SqlConnection(connectionString);
            var notas=await connection.QueryAsync<Notas>(
                "Notas_List",
                commandType:System.Data.CommandType.StoredProcedure
            );
            return notas is not null ? Results.Ok(notas) : Results.NotFound();
        });

        app.MapGet("/notas/{id}",async (int id)=>{
            using var connection=new SqlConnection(connectionString);
            var notas=await connection.QueryAsync<Notas>(
                "Notas_ListById",
                new{IDNotas=id},
                commandType:System.Data.CommandType.StoredProcedure
            );
            return notas is not null ? Results.Ok(notas) : Results.NotFound();
        });

        app.MapPost("/asignarprofesor",async (AsignarProfesor asignacion) =>
       {
          using var connection=new SqlConnection(connectionString);
          var id=await connection.ExecuteScalarAsync<int>(
            "AsignarProfesor_Insert",
            new{asignacion.IDUsuario,asignacion.IDMateria},
            commandType:System.Data.CommandType.StoredProcedure
          ) ;
          asignacion.IDAsignacion=id;
          return Results.Created($"/asignarProfesor/{asignacion.IDAsignacion}", asignacion);
       });

       app.MapGet("/asignarprofesor", async () =>
        {
            using var connection=new SqlConnection(connectionString);
            var asignacion=await connection.QueryAsync<AsignarProfesor>(
                "AsignarProfesor_List",
                commandType:System.Data.CommandType.StoredProcedure
            );
            return asignacion is not null ? Results.Ok(asignacion) : Results.NotFound();
        });

        app.MapGet("/asignarprofesor/{id}",async (int id)=>{
            using var connection=new SqlConnection(connectionString);
            var asignacion=await connection.QueryAsync<AsignarProfesor>(
                "AsignarProfesor_ListById",
                new{IDAsignar=id},
                commandType:System.Data.CommandType.StoredProcedure
            );
            return asignacion is not null ? Results.Ok(asignacion) : Results.NotFound();
        });

        app.Run();
    }
}
