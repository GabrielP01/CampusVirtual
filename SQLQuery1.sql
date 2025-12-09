use master
go

IF EXISTS (SELECT * FROM sys.databases WHERE name = 'DBWebEscuelaFinal')
BEGIN
    ALTER DATABASE DBWebEscuelaFinal SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE DBWebEscuelaFinal;
END
GO

create database DBWebEscuelaFinal
go

IF EXISTS (SELECT * FROM sys.server_principals WHERE name = 'UserWebEscuela')
    DROP LOGIN UserWebEscuela;
GO

create login UserWebEscuela with password='DBLogin123'
go

use DBWebEscuelaFinal
go

create user Usuario for login UserWebEscuela
go

grant exec to Usuario
go


create table Usuarios(
	IDUsuario int identity(1,1) primary key,
	Nombre varchar(50) not null,
	Dni int not null unique,
	Mail varchar (80) not null unique,
	Telefono varchar (20) default '',
	Direccion varchar (100) default '',
	Password varchar(40) not null
)
go

create table Roles(
	Rol varchar(20) primary key
)
go

create table Carreras(
	IDCarrera int identity(1,1) primary key,
	Nombre varchar(50) unique not null,
	Sigla varchar(10) not null,
	AñoCursada int not null
)


create table UsuariosRoles(
	IDUsuario int foreign key references Usuarios(IDUsuario) on delete cascade not null, --foreing key de Usuarios, el on cascade es una condicion, es cuando yo lo borre borre el registro si borro el usuario
	Rol varchar(20) foreign key references Roles(Rol) not null, --foreing key de Roles
	constraint PKUR unique (IDUsuario,Rol), --esa diciendo que pkur(primary key usurios roles) 
)
go




create procedure Usuarios_Login(
@Mail varchar(80),
@Password varchar(40)
)
as
select * from Usuarios
where Mail=@Mail and Password=@Password
go

create procedure Usuarios_Insert(
@nombre varchar (50),
@Dni int,
@mail varchar (80),
@telefono varchar(15),
@direccion varchar(40),
@password varchar(40)
)
as begin
insert usuarios (nombre,dni,mail,telefono,direccion,password) values (@nombre,@dni,@mail,@telefono,@direccion,@password)
select @@IDENTITY
end
go

create procedure Usuarios_List
as
select * from Usuarios
select * from UsuariosRoles
go



create procedure Usuarios_Find(
@IDUsuario int)
as
select * from Usuarios where IDUsuario=@IDUsuario
go

create procedure Roles_List
as
select Rol from Roles
go


create procedure UsuarioRoles_Insert(
@IDUsuario int, @Rol varchar(20)
)
as
begin
insert UsuariosRoles(IDUsuario,Rol) values(@IDUsuario,@Rol)
end
go


create procedure UsuariosRoles_ByUser(
    @IDUsuario int
)
as
select * from UsuariosRoles
where UsuariosRoles.IDUsuario = @IDUsuario
go

create procedure Usuarios_Update(
@IDUsuario int,
@Nombre varchar(50),
@Dni int,
@Direccion varchar (50),
@Mail varchar (80),
@Telefono varchar (20),
@Password varchar (40)
)
as
if (@Password<>'')begin
Update Usuarios set
Nombre=@Nombre,
Dni=@Dni,
Direccion=@Direccion,
Mail=@Mail,
Telefono=@Telefono,
Password=@Password
where
IDUsuario=@IDUsuario
end
go


create procedure Usuarios_Delete(
@Dni int)
as
Delete Usuarios where Dni=@Dni
go




create procedure Carreras_Insert(
@Nombre varchar(50),
@Sigla varchar(10),
@AñoCursada int
)
as
begin
insert Carreras(Nombre,Sigla,AñoCursada) values (@Nombre,@Sigla,@AñoCursada)
end
go

create procedure Carreras_Update(
@IDCarrera int,
@Nombre varchar(50) ,
@Sigla varchar (10) ,
@AñoCursada int 
)
as
Update Carreras set
Nombre=@Nombre,
Sigla=@Sigla,
AñoCursada=@AñoCursada
where IDCarrera=@IDCarrera
go

create procedure Carreras_Delete(
@IDCarrera int
)
as
delete Carreras where @IDCarrera=IDCarrera
go


create procedure Carreras_List
as
select * from Carreras
go


create procedure Carreras_ListById(
@IDCarrera int
)
as
begin
select * from carreras
where Carreras.IDCarrera=@IDCarrera
end
go

exec Carreras_ListById 1




exec usuarios_insert 'admin',1,'admin@mail.com','11111111','avenida 1234','admin'





insert Roles (Rol) values ('ADMINISTRADOR')
insert Roles (Rol) values ('DIRECTOR DE ESTUDIOS')
insert Roles (Rol) values ('PROFESOR')
insert Roles (Rol) values ('PRECEPTOR')
insert Roles (Rol) values ('ALUMNO')
insert Roles (Rol) values ('EXCLUIDO')

exec Roles_List

insert UsuariosRoles (IDUsuario,Rol) values (1,'ADMINISTRADOR')
insert UsuariosRoles (IDUsuario,Rol) values (1,'DIRECTOR DE ESTUDIOS')
insert UsuariosRoles (IDUsuario,Rol) values (1,'PROFESOR')
insert UsuariosRoles (IDUsuario,Rol) values (1,'PRECEPTOR')
insert UsuariosRoles (IDUsuario,Rol) values (1,'ALUMNO')

select * from UsuariosRoles


EXEC Usuarios_List
