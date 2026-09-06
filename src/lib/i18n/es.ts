import type { Catalog } from './index';
export default {
  language: 'Idioma de la interfaz',
  auto: 'Idioma del navegador',
  skip: 'Ir al contenido',
  home: 'Inicio de Typeodd',
  play: 'Jugar',
  guide: 'Cómo jugar',
  about: 'Nuestra historia',
  faq: 'Preguntas frecuentes',
  privacy: 'Datos y privacidad',
  title: 'Typeodd — Escribe más rápido. Recuerda más. Juego mental gratuito',
  description:
    'Si vas lento, el texto se desvanece. Si aceleras, una marca creciente oculta las próximas letras. Pon a prueba tu ritmo, memoria y calma en Typeodd.',
  heroLead: 'Escribe más rápido.',
  heroStrong: 'Recuerda más.',
  heroBody:
    'Despacio, las palabras se desvanecen. Deprisa, una marca las cubre. Lee por adelantado, confía en tu memoria y mantén la calma.',
  start: 'Aceptar el reto',
  how: 'Ver las reglas',
  free: 'Gratis',
  languages: 'Inglés · Coreano',
  minute: 'Completa el pasaje',
  artLabel: 'Una marca gris cubre las próximas letras y un velo blanco atenúa el texto',
  stripOne: 'La velocidad tiene un precio.',
  stripTwo: 'La memoria te hace avanzar.',
  playground: '¿Cuánto puedes recordar?',
  noSignup: 'Sin registro ni instalación.',
  featureTitle: 'Dos presiones. Un ritmo.',
  featureLead: 'Cada ventaja trae un nuevo desafío.',
  features: [
    {
      title: 'Muy lento: el texto se desvanece.',
      body: 'Por debajo del umbral, cada entrada intensifica un velo blanco. Recuperar la claridad es más lento que perderla.'
    },
    {
      title: 'Muy rápido: la marca crece.',
      body: 'Los aciertos rápidos alargan una marca casi opaca que tapa las próximas letras. Léelas antes de que pasen debajo.'
    },
    {
      title: 'Más riesgo. Más puntos.',
      body: 'Una marca más ancha da más puntos por letra correcta. Un error cuesta el 30% de tu puntuación y reinicia la anchura.'
    }
  ],
  storyTitle: 'Tus dedos escriben. Tu mente recuerda.',
  storyBody:
    'Typeodd pone a prueba la anticipación, la memoria a corto plazo y la calma. Classic conserva la tensión del original entre velocidad, visibilidad y recompensa.',
  storyLink: 'La idea de Typeodd',
  faqTitle: 'Antes de que desaparezcan las letras.',
  allQuestions: 'Todas las preguntas',
  typingLanguage: 'Idioma del pasaje',
  soundOn: 'Activar sonido',
  soundOff: 'Desactivar sonido',
  progress: 'PROGRESO',
  rhythm: 'RITMO INSTANTÁNEO',
  accuracy: 'PRECISIÓN',
  score: 'PUNTUACIÓN',
  metrics: 'Estadísticas del juego',
  sessionDone: 'PASAJE COMPLETADO',
  finished: 'Has llegado hasta el final.',
  points: 'pt',
  again: 'Reintentar',
  copy: 'Copiar resultado',
  inputLabel: 'Escribe el pasaje restante:',
  typeDirectly: 'Introduce un carácter cada vez. Corrige con Retroceso. No se permite pegar.',
  clickType: 'Pulsa el pasaje para empezar. Lee por adelantado antes de que crezca la marca.',
  readAhead: 'Lee. Recuerda. Sigue.',
  restart: 'Reiniciar',
  next: 'Otro pasaje',
  errorHint: 'Cada error cuesta el 30% de tu puntuación. Corrige con Retroceso.',
  noTimer: 'Sin cuenta atrás. Completa todo el pasaje.',
  mask: 'Marca',
  veil: 'Velo blanco',
  reward: 'Próximo acierto',
  ruleHint: 'Lento: texto tenue. Rápido: letras ocultas.',
  noJs: 'Necesitas JavaScript para jugar. La guía y la historia funcionan sin él.',
  history: 'Pasajes completados',
  localOnly: 'Guardados en este navegador',
  deleteQuestion: '¿Borrar tus registros?',
  delete: 'Borrar',
  cancel: 'Cancelar',
  clearHistory: 'Borrar registros',
  saveFailed: 'No se puede guardar en el navegador. El resultado solo permanece en esta pantalla.',
  deleteFailed: 'No se pudieron borrar los registros. Revisa el navegador.',
  copied: 'Resultado copiado.',
  faqs: [
    {
      q: '¿Qué es Typeodd?',
      a: 'Es un juego mental de mecanografía gratuito de zendoc. Escribir despacio atenúa el texto; los aciertos rápidos alargan una marca que oculta las próximas letras. Debes leer por adelantado, recordar y mantener el ritmo.'
    },
    {
      q: '¿Por qué se ocultan letras al acelerar?',
      a: 'La marca es el reto principal. Crece según el intervalo desde el acierto anterior. Los caracteres correctos desaparecen del principio, desplazando los siguientes bajo la marca. Una mayor anchura también da más puntos.'
    },
    {
      q: '¿Cómo se calculan el velo y los puntos?',
      a: 'Con anchura interna de 40 o más, cada entrada reduce el velo en 2 de 255; por debajo, lo aumenta en 3. Un acierto gana la anchura interna dividida entre 10, redondeada hacia arriba. Un error resta el 30% de la puntuación, redondeado hacia arriba, y reinicia la anchura a 1.'
    },
    {
      q: '¿Hay límite de tiempo o pausa?',
      a: 'Classic termina al completar el pasaje. No hay cuenta atrás ni pausa. La marca se reduce cada segundo incluso al cambiar de pestaña. Reiniciar vuelve al mismo pasaje; Otro pasaje abre uno diferente.'
    },
    {
      q: '¿Funciona el coreano en móviles?',
      a: 'Puedes elegir pasajes en inglés o coreano independientemente del idioma de la interfaz. El coreano se evalúa al confirmar la composición. Pulsa el pasaje para abrir el teclado. No se permite pegar ni introducir texto en bloque. Se conservan los pasajes ingleses originales; los coreanos son nuevos.'
    },
    {
      q: '¿Se comparten los resultados en línea?',
      a: 'No. Los últimos 50 resultados completos se guardan solo en este navegador, sin cuenta ni pago. Puedes copiar un resultado y compartirlo tú mismo. El chat y el multijugador aún están en fase de planificación.'
    }
  ],
  guideTitle: 'Lee antes de que se oculte.',
  guideLead: 'Equilibra el texto que se desvanece y la marca que crece.',
  guideSections: [
    {
      title: 'Empieza un pasaje',
      body: 'Elige inglés o coreano, lee por adelantado y pulsa el pasaje para escribirlo exactamente. Cada acierto elimina el primer carácter y desplaza el resto. Completa todo el texto para terminar. Reiniciar repite el mismo pasaje; Otro pasaje cambia el texto.'
    },
    {
      title: 'Dos presiones conectadas',
      body: 'Un acierto añade 600 dividido entre el intervalo en milisegundos a la anchura interna. Cada segundo se resta el 25% de la anchura, redondeado hacia arriba. Desde anchura interna 2, la anchura visible es 1,5 veces ese valor. Desde 40, cada entrada reduce el velo en 2; por debajo, lo aumenta en 3, en una escala de 0 a 255. El velo cambia al introducir texto, no con el reloj.'
    },
    {
      title: 'Recompensa y errores',
      body: 'Un acierto gana ceil(anchura / 10) puntos. Un error resta ceil(puntuación × 0,30), con un mínimo total de cero. Como en el original, el velo se ajusta antes de reiniciar la anchura a 1. Retroceso borra un carácter erróneo; esa eliminación también se evalúa como cambio incorrecto, igual que en el original.'
    },
    {
      title: 'Ritmo y registros',
      body: 'El CPM en directo usa el intervalo entre caracteres correctos confirmados, no una media. El resultado muestra WPM medio en inglés (cinco caracteres por palabra) o CPM en coreano. Los registros Classic quedan en este navegador. No hay pausa ni opción de eliminar el efecto visual durante el reto.'
    }
  ],
  aboutTitle: 'Un juego mental en tus dedos.',
  aboutLead: 'Velocidad, memoria e incertidumbre unidas por una marca.',
  aboutSections: [
    {
      title: 'La idea original',
      body: 'zendoc creó Typeodd con dos presiones opuestas: ir lento atenúa el texto y acelerar lo oculta tras un cursor creciente. La misma anchura determina la recompensa. Recordar lo leído pasa a formar parte de escribirlo.'
    },
    {
      title: 'Classic en SvelteKit',
      body: 'Esta edición conserva constantes, orden de eventos, pasajes ingleses y finalización del original. Sustituye Flutter por capas HTML y un motor independiente. La composición coreana, los límites de entrada y el reinicio limpio corrigen problemas técnicos sin quitar el desafío.'
    },
    {
      title: 'Un experimento abierto',
      body: 'Explora el código en GitHub y otros proyectos en Works of zendoc. El juego explora memoria y calma sin afirmar beneficios médicos. El chat y el multijugador son planes, no funciones disponibles.'
    }
  ],
  faqPageTitle: 'Las reglas, al detalle.',
  faqLead: 'Respuestas sobre la marca, el velo, los puntos y la entrada.',
  privacyTitle: 'Tus registros. Tu navegador.',
  privacyLead: 'Cómo se tratan los datos en el juego individual actual.',
  privacySections: [
    {
      title: 'Registros locales',
      body: 'Se guardan hasta 50 resultados: versión de reglas, título, idioma, fecha, puntos, duración, velocidad y precisión. También se guardan sonido e idioma de la interfaz. Borrar registros elimina los resultados; borrar los datos del navegador elimina además los ajustes.'
    },
    {
      title: 'Sin servidor de juego',
      body: 'No se envían textos escritos ni puntuaciones a un servidor de juego. No hay inicio de sesión ni clasificación en línea. No se importan registros de Firebase. Copiar resultado solo escribe en el portapapeles al pulsar el botón.'
    },
    {
      title: 'Alojamiento',
      body: 'Cloudflare Pages sirve el sitio y Google Fonts las fuentes. Reciben la información de red necesaria para entregar esos recursos. El juego no incluye publicidad ni scripts adicionales de analítica de visitas.'
    },
    {
      title: 'Multijugador futuro',
      body: 'El chat y el multijugador están en planificación. Antes del lanzamiento se explicarán conservación, eliminación y tratamiento de datos.'
    }
  ]
} satisfies Catalog;
