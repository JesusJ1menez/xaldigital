API =
  'https://api.stackexchange.com/2.2/search?order=desc&sort=activity&intitle=perl&site=stackoverflow';

const answerCount = (items) => {
  // Retorna un obj con la suma de respuestas contestas y no contestadas
  const totalResponses = items.reduce(
    (total, item) => {
      if (item.is_answered) {
        total.is_answered += 1;
      } else {
        total.isnt_answered += 1;
      }
      return total;
    },
    { is_answered: 0, isnt_answered: 0 }
  );
  // Insertar respuestas en el dom
  const respuesta = document.querySelector('.flip-card-back .title');
  const respuestaText = `
  Respuestas contestadas: ${totalResponses.is_answered} \n
  Respuestas no contestadas: ${totalResponses.isnt_answered}`;
  respuesta.innerText = respuestaText;
  console.log(respuestaText);
};

const maxReputation = (items) => {
  // Genera un array con la reputacion de cada owner, desestructura con spread operation para encontrar la reputacion maxima
  const max = Math.max(...items.map(({ owner }) => owner.reputation));
  // Encontrar el obj con la reputacion maxima
  const maxReputation = items.find(({ owner }) => owner.reputation === max);
  // Insertar respuestas en el dom
  const respuesta = document.querySelector('.flip-card-back-2 .title');
  const respuestaText = `
  El owner con mas reputacion es: \n ${maxReputation.owner.display_name}
  con ${maxReputation.owner.reputation} puntos de reputacion`;
  respuesta.innerText = respuestaText;
  console.log(respuestaText);
  console.log(maxReputation);
};

const minViews = (items) => {
  // Genera un array con el contador de vistas, desestructura con spread operation para encontrar la catidad minima de vistas
  const minView = Math.min(...items.map((item) => item.view_count));
  // Encontrar el obj con la cantidad minima de vistas
  const objMinView = items.find((item) => item.view_count === minView);
  // Insertar respuestas en el dom
  const respuesta = document.querySelector('.flip-card-back-3 .title');
  const respuestaText = `
  Owner con menor numero de vistas es: \n
  ${objMinView.owner.display_name} con ${objMinView.view_count} vistas`;
  respuesta.innerText = respuestaText;
  console.log(respuestaText);
  console.log(objMinView);
};

const oldestNewest = (items) => {
  // Ordenar las fechas de mas antigua a mas reciente
  const orderDates = items.sort(
    (item, item2) => item.creation_date - item2.creation_date
  );
  // Insertar respuestas en el dom
  const respuesta = document.querySelector('.flip-card-back-4 .title');
  const fechaVieja = new Date(orderDates[0].creation_date);
  const fechaReciente = new Date(
    orderDates[orderDates.length - 1].creation_date
  );
  const respuestaText = `
  Mas antiegua es:
  ${orderDates[0].owner.display_name}
  ${fechaVieja}
  Mas reciente es:
  ${orderDates[orderDates.length - 1].owner.display_name}
  ${fechaReciente}`;
  respuesta.innerText = respuestaText;
  console.log(respuestaText);
  console.log(orderDates[0], orderDates[orderDates.length - 1]);
};

// Cargar data de la api y llamar funciones
const loadData = async () => {
  try {
    const response = await fetch(API);
    const { items } = await response.json();
    answerCount(items);
    maxReputation(items);
    minViews(items);
    oldestNewest(items);
  } catch (error) {
    console.log(error);
  }
};

loadData();
