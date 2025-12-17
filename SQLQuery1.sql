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
	IDUsuario int foreign key references Usuarios(IDUsuario) on delete cascade not null,
	Rol varchar(20) foreign key references Roles(Rol) not null,
	constraint PKUR unique (IDUsuario,Rol), 
)
go

create table Materias(
	IDMateria int identity(1,1) primary key,
	Nombre varchar(50) not null,
	Descripcion varchar(100) not null,
	Duracion varchar(20) not null,
	IDCarrera int,
	foreign key(IDCarrera) references Carreras(IDCarrera)
)
go


create table InscripcionesMaterias(
	IDInscripcion int identity(1,1) primary key,
	IDUsuario int,
	IDMateria int,
	foreign key(IDUsuario) references Usuarios(IDUsuario),
	foreign key(IDMateria) references Materias(IDMateria),
	constraint Unique_Inscripcion unique (IDUsuario,IDMateria)
)
go

create table InscripcionesCarreras(
    IDInscripcion int identity(1,1) primary key,
    IDUsuario int,
    IDCarrera int,
    foreign key(IDUsuario) references Usuarios(IDUsuario),
    foreign key(IDCarrera) references Carreras(IDCarrera),
    constraint Unique_Inscripcion_Carrera unique (IDUsuario, IDCarrera)
)
go

create table notas(
	IDNota int identity(1,1) primary key,
	Nota int,
	IDUsuario int,
	IDMateria int,
	foreign key(IDUsuario) references Usuarios(IDUsuario),
	foreign key(IDMateria) references Materias(IDMateria),
	constraint Unique_Notas_Materias unique (IDUsuario,IDMateria)
)
go

create table asignarProfesor(
	IDAsignacion int identity(1,1) primary key,
	IDUsuario int,
	IDMateria int,
	foreign key(IDUsuario) references Usuarios(IDUsuario),
	foreign key(IDMateria) references Materias(IDMateria),
	constraint Unique_Asignar_Profesor unique (IDUsuario,IDMateria)
)
go


/*procedures*/


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
select * from UsuariosRoles
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


create procedure Materias_Insert(
	@IDCarrera int,
	@Nombre varchar(50),
	@Descripcion varchar(100),
	@Duracion varchar(20)
)
as
begin
insert Materias (IDCarrera,Nombre,Descripcion,Duracion) values (@IDCarrera,@Nombre,@Descripcion,@Duracion)
end
go

create procedure Materias_List
as
select * from Materias
go


create procedure Materias_ListById(
@IDMateria int
)
as
select * from Materias
where @IDMateria=Materias.IDMateria
go

create procedure Materias_Update(
@IDMateria int,
@Nombre varchar(50),
@Descripcion varchar(100),
@Duracion varchar (20),
@IDCarrera int
)
as
begin
update Materias set
Nombre=@Nombre,
Descripcion=@Descripcion,
Duracion=@Duracion,
IDCarrera=@IDCarrera
where @IDMateria=IDMateria
end
go

create procedure Materias_Delete(
@IDMateria int
)
as
delete Materias 
where @IDMateria=IDMateria
go

create procedure InscripcionesMaterias_Insert(
@IDUsuario int,
@IDMateria int
)
as
begin
insert InscripcionesMaterias (IDUsuario,IDMateria) values (@IDUsuario,@IDMateria)
end
go


create procedure InscripcionesMaterias_List
as
select * from InscripcionesMaterias
go




create procedure InscripcionesCarreras_Insert(
@IDUsuario int,
@IDCarrera int
)
as
begin
insert InscripcionesCarreras (IDUsuario,IDCarrera) values (@IDUsuario,@IDCarrera)
end
go




create procedure InscripcionesCarreras_List
as
select * from InscripcionesCarreras
go


create procedure Notas_Insert(
@Nota int,
@IDUsuario int,
@IDMateria int
)
as
begin
insert Notas (Nota,IDUsuario,IDMateria) values(@Nota,@IDUsuario,@IDMateria)
end
go

create procedure Notas_List
as
select * from Notas
go

create procedure Notas_ListById(
	@IDNota int
)
as
select * from Notas
where @IDNota=Notas.IDNota
go


create procedure AsignarProfesor_Insert(
	@IDUsuario int,
	@IDMateria int
)
as
begin
insert asignarProfesor (IDUsuario,IDMateria) values (@IDUsuario,@IDMateria)
end
go

create procedure AsignarProfesor_List
as
select * from asignarProfesor
go

create procedure AsignarProfesor_ListById(
	@IDAsignacion int
)
as
select * from asignarProfesor
where @IDAsignacion=asignarProfesor.IDAsignacion
go

exec AsignarProfesor_List


exec usuarios_insert 'admin',1,'admin@mail.com','11111111','avenida 1234','admin'





insert Roles (Rol) values ('ADMINISTRADOR')
insert Roles (Rol) values ('DIRECTOR DE ESTUDIOS')
insert Roles (Rol) values ('PROFESOR')
insert Roles (Rol) values ('PRECEPTOR')
insert Roles (Rol) values ('ALUMNO')
insert Roles (Rol) values ('EXCLUIDO')


insert UsuariosRoles (IDUsuario,Rol) values (1,'ADMINISTRADOR')
insert UsuariosRoles (IDUsuario,Rol) values (1,'DIRECTOR DE ESTUDIOS')
insert UsuariosRoles (IDUsuario,Rol) values (1,'PROFESOR')
insert UsuariosRoles (IDUsuario,Rol) values (1,'PRECEPTOR')
insert UsuariosRoles (IDUsuario,Rol) values (1,'ALUMNO')


