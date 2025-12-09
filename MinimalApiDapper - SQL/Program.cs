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

        app.MapGet("/ping", () => "pong");


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
                user.Roles = roles.Where(r => r.IdUsuario == user.IDUsuario).ToList();
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


        app.MapPost("/menu", async (Menu menu) =>
        {
            using var connection = new SqlConnection(connectionString);
            int ID = await connection.ExecuteScalarAsync<int>(
                "insert_menu",
                new { menu.Menu_Nombre, menu.Menu_Descripcion },
                commandType: System.Data.CommandType.StoredProcedure
            );
            menu.Menu_ID = ID;
            return Results.Created($"/menu/{menu.Menu_ID}", menu);
        });

        app.MapDelete("/menu/{id}", async (int id) =>
        {
            using var connection = new SqlConnection(connectionString);
            var result = await connection.ExecuteAsync(
                "Menu_Delete",
                new { Menu_ID = id },
                commandType: System.Data.CommandType.StoredProcedure
            );
            return result > 0 ? Results.NoContent() : Results.NotFound();
        });

        app.MapPut("/menu/{id}", async (int id, Menu menu) =>
        {
            using var connection = new SqlConnection(connectionString);
            var result = await connection.ExecuteAsync(
                "Menu_Update",
                new { menu.Menu_Nombre, menu.Menu_Descripcion, Menu_ID = id },
                commandType: System.Data.CommandType.StoredProcedure
            );
            return result > 0 ? Results.Ok() : Results.NotFound();
        });








        app.Run();
    }
}
