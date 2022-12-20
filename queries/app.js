const mysql = require('mysql');

const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydb',
});

conexion.connect(function (error) {
  if (error) {
    throw error;
  } else {
    console.log('Conexion exitosa');
  }
});

// 1. ¿Cuál es el nombre del aeropuerto que ha tenido mayor movimiento durante el año?
const query1 = `
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
)`;
conexion.query(query1, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log(
    '¿Cuál es el nombre del aeropuerto que ha tenido mayor movimiento durante el año?'
  );
  results.forEach((result) => {
    console.log(result);
  });
});

// 2. ¿Cuál es el nombre aerolínea que ha realizado mayor número de vuelos durante el año?
const query2 = `
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
)`;
conexion.query(query2, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log(
    '¿Cuál es el nombre aerolínea que ha realizado mayor número de vuelos durante el año?'
  );
  results.forEach((result) => {
    console.log(result);
  });
});

// 3. ¿En qué día se han tenido mayor número de vuelos?
const query3 = `
select dia, count(dia) as 'Numero de vuelos'
from vuelos
group by dia
order by 'Numero de vuelos' desc
limit 1`;
conexion.query(query3, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log('¿En qué día se han tenido mayor número de vuelos?');
  results.forEach((result) => {
    console.log(result);
  });
});

// 4. ¿Cuáles son las aerolíneas que tienen mas de 2 vuelos por día?
const query4 = `
select nombre_aerolinea, count(nombre_aerolinea) as numero_vuelos
	from vuelos as v, aerolineas as a
	where v.id_aerolinea = a.id_aerolinea
	group by v.id_aerolinea
    having numero_vuelos > 2
	order by numero_vuelos desc`;
conexion.query(query4, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log('¿Cuáles son las aerolíneas que tienen mas de 2 vuelos por día?');
  results.forEach((result) => {
    console.log(result);
  });
});

conexion.end();
