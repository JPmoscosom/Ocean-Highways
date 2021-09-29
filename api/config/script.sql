CREATE TABLE public.reservas (
	id int4 NULL,
	idusuario int4 NULL,
	idlugar int4 NULL,
	fecha date NULL
);

CREATE TABLE public.lugares (
	id int4 NULL,
	nombre varchar NULL,
	pais varchar NULL,
	ciudad varchar NULL,
	direccion varchar NULL
);

CREATE TABLE public.usuarios (
	nombre varchar NULL,
	id int4 NULL,
	apellidos varchar NULL,
	rol varchar NULL,
	clave varchar NULL
);
