import type { Catalog } from './index';
export default {
  language: 'Idioma de la interfaz',
  auto: 'Idioma del navegador',
  skip: 'Ir al contenido',
  home: 'Inicio de Typeodd',
  play: 'Jugar',
  guide: 'Cómo jugar',
  about: 'Sobre el juego',
  faq: 'Preguntas frecuentes',
  privacy: 'Datos y privacidad',
  title: 'Typeodd — Escribe más rápido. Recuerda más. Juego mental gratuito',
  description:
    'Si vas lento, el texto se desvanece. Si aceleras, una marca creciente oculta las próximas letras. Pon a prueba tu ritmo, memoria y calma en Typeodd.',
  start: 'Aceptar el reto',
  playground: '¿Cuánto puedes recordar?',
  noSignup: 'Sin registro ni instalación.',
  typingLanguage: 'Idioma del pasaje',
  soundOn: 'Activar sonido',
  soundOff: 'Desactivar sonido',
  progress: 'PROGRESO',
  rhythm: 'VELOCIDAD ACTUAL',
  accuracy: 'PRECISIÓN',
  score: 'PUNTUACIÓN',
  metrics: 'Estadísticas del juego',
  sessionDone: 'PASAJE COMPLETADO',
  finished: '¡Has llegado al final!',
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
  mask: 'Longitud de la barra',
  veil: 'Texto atenuado',
  reward: 'Puntos por letra',
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
      a: 'Un juego de mecanografía que te pide leer por adelantado y recordar. Al ir despacio, el texto se atenúa; al acelerar, una barra gris tapa las próximas letras. Recuerda la parte oculta y llega hasta el final.'
    },
    {
      q: '¿Por qué se tapa el texto cuando voy bien?',
      a: 'Ese es el reto: cuanto más rápido escribes, más tienes que recordar. Las letras correctas desaparecen y las siguientes avanzan bajo la barra. Leer un poco por delante ayuda. Una barra más larga también da más puntos.'
    },
    {
      q: '¿Cómo gano y pierdo puntos?',
      a: 'Una barra más larga da más puntos por acierto. Un error resta el 30% de la puntuación, redondeado hacia arriba. Con 101 puntos, pierdes 31. Las reglas originales también descuentan puntos al borrar una letra incorrecta con Retroceso.'
    },
    {
      q: '¿Hay límite de tiempo o pausa?',
      a: 'En solitario puedes terminar el pasaje sin límite de tiempo. Un duelo 1:1 dura hasta 15 minutos. No hay pausa y la barra sigue reduciéndose al cambiar de pestaña. Reiniciar vuelve al principio del mismo texto.'
    },
    {
      q: '¿Puedo escribir en coreano desde el móvil?',
      a: 'Sí. Elige coreano como idioma del pasaje y toca el texto para abrir el teclado. Las letras se comprueban al confirmar su composición. El idioma de la interfaz se elige por separado. Hay 30 pasajes nuevos en inglés y 30 en coreano, sobre la vida cotidiana y pequeñas historias.'
    },
    {
      q: '¿Dónde se guardan los resultados?',
      a: 'Los resultados individuales se guardan en este navegador.'
    }
  ],
  guideTitle: 'Cómo jugar',
  guideLead: 'Lee un poco por delante, recuerda las letras tapadas y sigue escribiendo.',
  guideSections: [
    {
      title: '1. Elige un pasaje',
      body: 'Elige inglés o coreano, pulsa el texto y escríbelo tal como aparece. Las letras correctas desaparecen y el resto avanza. Al llegar al final, completas la ronda. Reiniciar repite el mismo texto; Otro pasaje cambia a uno distinto.'
    },
    {
      title: '2. Lee un poco por delante',
      body: 'Al escribir despacio, las letras se atenúan. Si escribes rápido y sin errores, vuelven a verse mejor, pero una barra gris crece y tapa las próximas letras. Intenta recordarlas antes de que queden ocultas. Parar acorta la barra, aunque el texto puede atenuarse más al volver a escribir.'
    },
    {
      title: '3. Suma puntos y corrige errores',
      body: 'Una barra más larga da más puntos por letra correcta. Un error resta el 30% de tu puntuación y acorta la barra. La cantidad que pierdes se redondea hacia arriba: con 101 puntos, pierdes 31. Puedes borrar el error con Retroceso, pero las reglas originales también descuentan puntos al borrarlo.'
    },
    {
      title: '4. Juega solo o compite',
      body: 'En solitario no hay límite de tiempo. En un duelo 1:1, ambos escribís el mismo pasaje en el mismo idioma. Gana quien termine primero. Salir cuenta como abandono y cada duelo dura como máximo 15 minutos. La velocidad en pantalla refleja tus últimas entradas; el resultado individual muestra la media de la ronda.'
    }
  ],
  aboutTitle: '¿Qué es Typeodd?',
  aboutLead: 'Un juego de mecanografía en el que también cuenta recordar lo que viene.',
  aboutSections: [
    {
      title: 'Más velocidad, otro desafío',
      body: 'Si vas despacio, las letras se atenúan. Si aceleras, una barra gris las va tapando. Cuanto más rápido escribes, más necesitas recordar. Superar una frase oculta o recuperar el ritmo tras un error forma parte de la diversión.'
    },
    {
      title: 'Historias cercanas',
      body: 'Una parada que te saltas, un mensaje que corriges antes de enviarlo, canciones elegidas con amigos. Los textos parten de pequeños momentos cotidianos, a veces con un giro inesperado. Hemos escrito 30 pasajes en inglés y 30 en coreano para Typeodd. Puedes jugar solo o competir con el mismo texto.'
    },
    {
      title: 'Creado por zendoc',
      body: 'Typeodd nació de una pregunta: ¿y si escribir pusiera a trabajar la memoria además de las manos? Esta versión mantiene las reglas originales de ocultación y pérdida de claridad, con una pantalla y unos textos renovados. Los enlaces de abajo llevan al código y a otros proyectos.'
    }
  ],
  faqPageTitle: 'Preguntas frecuentes',
  faqLead: 'Unas respuestas útiles antes de empezar.',
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
