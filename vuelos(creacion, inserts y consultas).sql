create database mydb;
USE mydb;

CREATE TABLE aerolineas (
  `id_aerolinea` INT NOT NULL,
  `nombre_aerolinea` VARCHAR(45) NULL,
  PRIMARY KEY (`id_aerolinea`));

CREATE TABLE aeropuertos (
  `id_aeropuertos` INT NOT NULL,
  `nombre_aerolinea` VARCHAR(45) NULL,
  PRIMARY KEY (`id_aeropuertos`));

CREATE TABLE movimientos (
  `id_movimientos` INT NOT NULL,
  `descripcion` VARCHAR(45) NULL,
  PRIMARY KEY (`id_movimientos`));

CREATE TABLE vuelos (
  `id_aerolinea` INT NOT NULL,
  `id_aeropuertos` INT NOT NULL,
  `id_movimientos` INT NOT NULL,
  `dia` DATE NULL,
    FOREIGN KEY (`id_movimientos`)
    REFERENCES `movimientos` (`id_movimientos`),
    FOREIGN KEY (`id_aeropuertos`)
    REFERENCES `aeropuertos` (`id_aeropuertos`),
    FOREIGN KEY (`id_aerolinea`)
    REFERENCES `aerolineas` (`id_aerolinea`)
);

insert into aerolineas values (1, 'Volaris');
insert into aerolineas values (2, 'Aeromar');
insert into aerolineas values (3, 'Interjet');
insert into aerolineas values (4, 'AeroMexico');

insert into aeropuertos values (1,'Bentio Juarez');
insert into aeropuertos values (2,'Guanajuato');
insert into aeropuertos values (3,'La paz');
insert into aeropuertos values (4,'Oaxaca');

insert into movimientos values (1,'Salida');
insert into movimientos values (2,'Llegada');

insert into vuelos values (1,1,1,'2021-05-02');
insert into vuelos values (2,1,1,'2021-05-02');
insert into vuelos values (3,2,2,'2021-05-02');
insert into vuelos values (4,3,2,'2021-05-02');
insert into vuelos values (1,3,2,'2021-05-02');
insert into vuelos values (2,1,1,'2021-05-02');
insert into vuelos values (2,3,1,'2021-05-04');
insert into vuelos values (3,4,1,'2021-05-04');
insert into vuelos values (3,4,1,'2021-05-04');

-- 1. ¿Cuál es el nombre del aeropuerto que ha tenido mayor movimiento durante el año?
select a.nombre_aerolinea as aeropuerto, count(v.id_movimientos) as movimientos_en_aeropuerto
from vuelos as v, aeropuertos as a
where v.id_aeropuertos = a.id_aeropuertos
group by v.id_aeropuertos
having movimientos_en_aeropuerto = (
	select max(movimientos_en_aeropuerto)
	from (
		select count(id_movimientos) as movimientos_en_aeropuerto
		from vuelos
		group by id_aeropuertos) as numero_vuelos
);

-- 2. ¿Cuál es el nombre aerolínea que ha realizado mayor número de vuelos durante el año?
select nombre_aerolinea, count(nombre_aerolinea) as numero_vuelos
from vuelos as v, aerolineas as a
where v.id_aerolinea = a.id_aerolinea
group by nombre_aerolinea
having numero_vuelos = (
	select max(numero_de_vuelos)
    from (
		select count(id_movimientos) as numero_de_vuelos
		from vuelos
		group by id_aerolinea) as cantidad_vuelos
);

-- 3. ¿En qué día se han tenido mayor número de vuelos?
select dia, count(dia) as 'Numero de vuelos'
from vuelos
group by dia
order by 'Numero de vuelos' desc
limit 1;

-- 4. ¿Cuáles son las aerolíneas que tienen mas de 2 vuelos por día?
select nombre_aerolinea, count(nombre_aerolinea) as numero_vuelos
	from vuelos as v, aerolineas as a
	where v.id_aerolinea = a.id_aerolinea
	group by v.id_aerolinea
    having numero_vuelos > 2
	order by numero_vuelos desc;