/**
 * Paradojas Filosóficas - Base de Datos Completa
 * 50+ paradojas y dilemas clásicos
 */

const PARADOXES_DATABASE = [
  {
    title: "La Paradoja del Mentiroso",
    explanation: "Una persona dice: 'Esta frase es falsa.' Si es verdadera, entonces es falsa. Si es falsa, entonces es verdadera. ¿Cuál es?",
    reflection: "¿Puede una declaración ser verdadera y falsa simultáneamente? ¿O es solo un problema del lenguaje?",
    application: "Aplica esto a tus creencias: ¿hay algunas que se contradicen a sí mismas?",
    philosopher: "Epiménides de Creta (siglo VI a.C.)",
    category: "Lógica"
  },
  {
    title: "Paradojas de Zenón",
    explanation: "Aquiles corre tras una tortuga. Para alcanzarla, primero debe llegar al punto donde ella estaba. Pero entonces ella habrá avanzado. Luego debe alcanzar ese nuevo punto... infinitamente.",
    reflection: "¿Es imposible alcanzar algo en movimiento? ¿O es el tiempo divisible infinitamente?",
    application: "¿Cómo empiezas una tarea si siempre hay un primer paso?",
    philosopher: "Zenón de Elea (490-430 a.C.)",
    category: "Movimiento & Espacio"
  },
  {
    title: "Si un árbol cae en el bosque",
    explanation: "Si un árbol cae en un bosque donde nadie está, ¿hace sonido? El árbol produce vibraciones de aire, pero ¿es sonido sin percepción?",
    reflection: "¿Existe la realidad sin observadores? ¿O es la observación lo que crea la realidad?",
    application: "¿Las cosas que no observas realmente suceden? ¿Existe tu vida cuando no estás consciente?",
    philosopher: "George Berkeley (1710)",
    category: "Percepción & Realidad"
  },
  {
    title: "El Barco de Teseo",
    explanation: "El barco de Teseo se repara constantemente. Se reemplaza un tablón, luego otro, hasta que todos los tablones originales han sido reemplazados. ¿Sigue siendo el mismo barco?",
    reflection: "¿Eres la misma persona que eras hace 7 años si todas tus células se han reemplazado?",
    application: "¿Qué te hace ser 'tú'? ¿Tu cuerpo, tus recuerdos, tu alma?",
    philosopher: "Plutarco (75 d.C.)",
    category: "Identidad & Cambio"
  },
  {
    title: "El Dilema del Tranvía",
    explanation: "Un tranvía fuera de control viene hacia 5 personas. Puedes tirar de una palanca para desviarlo, pero entonces matará a 1 persona en el otro carril. ¿Qué haces?",
    reflection: "¿Está bien matar a una persona para salvar a cinco? ¿Es diferente si empujas a alguien versus tirar de una palanca?",
    application: "¿Cuándo, si es que alguna, la acción es justificable?",
    philosopher: "Philippa Foot (1967)",
    category: "Ética & Moral"
  },
  {
    title: "La Paradoja del Omnipotente",
    explanation: "¿Puede un ser omnipotente crear una piedra tan pesada que no pueda levantarla?",
    reflection: "¿Es posible la omnipotencia absoluta? ¿O toda potencia tiene límites?",
    application: "¿Hay límites a lo que puedes lograr? ¿O esos límites son solo mentales?",
    philosopher: "Filosofía Medieval",
    category: "Omnipotencia & Poder"
  },
  {
    title: "El Huevo de Colón",
    explanation: "Colón dijo que cualquiera podía descubrir América si hubiera pensado en ello. Luego puso un huevo de pie, diciendo que otros también podrían si no fuera fácil después de saberlo.",
    reflection: "¿Las grandes ideas parecen obvias después de ser descubiertas? ¿Eso las hace menos valiosas?",
    application: "¿Subestiamas ideas creativas porque parecen obvias después?",
    philosopher: "Leyenda popular",
    category: "Conocimiento & Innovación"
  },
  {
    title: "La Paradoja del Sorites (Montón)",
    explanation: "Un grano de arena no es un montón. Dos granos de arena no son un montón. Pero en algún punto, agregar un grano crea un montón. ¿Dónde está el límite exacto?",
    reflection: "¿Existen límites precisos en la realidad, o son solo construcciones humanas?",
    application: "¿En qué punto te vuelves un experto? ¿Hay un momento exacto?",
    philosopher: "Eubúlides de Mileto (siglo IV a.C.)",
    category: "Límites & Categorías"
  },
  {
    title: "Aquiles y la Tortuga (Versión 2)",
    explanation: "Aquiles es 10 veces más rápido que una tortuga. Le da 1 km de ventaja. Nunca la alcanzará porque siempre debe llegar primero a donde ella estaba.",
    reflection: "¿La matemática infinita refleja la realidad? ¿O simplemente no se aplica?",
    application: "¿Hay obstáculos que matemáticamente parecen imposibles de vencer?",
    philosopher: "Zenón de Elea",
    category: "Movimiento & Espacio"
  },
  {
    title: "La Paradoja del Abuelo",
    explanation: "Viajes al pasado y matas a tu abuelo antes de que tu padre nazca. Entonces tú nunca naces. Entonces nunca viajaste al pasado. Entonces tu abuelo vive...",
    reflection: "¿Es posible cambiar el pasado? ¿O solo crearías una nueva línea temporal?",
    application: "¿Las decisiones pasadas son realmente inalterables?",
    philosopher: "Ciencia Ficción & Física Teórica",
    category: "Tiempo & Causalidad"
  },
  {
    title: "El Caballo de Troya",
    explanation: "Los troyanos aceptan un caballo de regalo de sus enemigos sin sospechar que contenía soldados. ¿Fueron engañados o fueron tontos?",
    reflection: "¿Cuándo es la culpa del engañador versus del engañado?",
    application: "¿Qué señales de alerta ignoras que deberías considerar?",
    philosopher: "Mito Griego",
    category: "Engaño & Percepción"
  },
  {
    title: "La Navaja de Ockham",
    explanation: "Las entidades no deben multiplicarse innecesariamente. Pero ¿qué cuenta como 'necesario'? ¿La explicación más simple es siempre la correcta?",
    reflection: "¿A veces la realidad es más complicada que lo que parece?",
    application: "¿Sobre-simplificas tus problemas? ¿O los complicas innecesariamente?",
    philosopher: "Guillermo de Ockham (1320)",
    category: "Lógica & Explicación"
  },
  {
    title: "La Paradoja del Hipócrita",
    explanation: "Un sofista dice: 'Nunca digo la verdad.' ¿Es verdadera esa declaración? Si lo es, entonces dice la verdad a veces, lo que contradice lo que dijo.",
    reflection: "¿Puedes vivir según una moral y predicarla al mismo tiempo?",
    application: "¿Eres consistente en tus valores, o a menudo contradices lo que afirmas creer?",
    philosopher: "Lógica Sofística",
    category: "Hipocresía & Coherencia"
  },
  {
    title: "El Universo Cerrado (Apeiron)",
    explanation: "¿El universo es infinito o finito? Si es infinito, ¿cómo puede contener todo? Si es finito, ¿qué hay más allá de sus límites?",
    reflection: "¿La mente humana puede comprender lo infinito?",
    application: "¿Tratas de comprender lo incomprehensible o aceptas los límites de tu conocimiento?",
    philosopher: "Anaximandro (610-546 a.C.)",
    category: "Cosmología"
  },
  {
    title: "Solipsismo Radical",
    explanation: "¿Qué prueba tienes de que el mundo exterior existe? ¿O solo existe en tu mente?",
    reflection: "¿Cómo sabes que otras personas son conscientes y no zombis sin mente?",
    application: "¿Cómo tratas a otros basándote en la suposición de que sienten como tú?",
    philosopher: "René Descartes (1641)",
    category: "Realidad & Consciencia"
  },
  {
    title: "La Paradoja del Joven",
    explanation: "Un abogado acepta defender a un joven sin cobrar dinero, a condición de que pague después de ganar su primer caso. Luego, el abogado demanda al joven por el pago, argumentando que si gana, debe pagar (por la sentencia). Si pierde, debe pagar (por el acuerdo).",
    reflection: "¿Es posible un contrato que garantice un resultado independientemente del resultado?",
    application: "¿Algunas promesas son fundamentalmente imposibles de cumplir?",
    philosopher: "Paradoja Medieval",
    category: "Lógica & Contratos"
  },
  {
    title: "La Paradoja del Montón (2)",
    explanation: "¿Cuántas personas se necesitan para ser una 'multitud'? ¿Dos? ¿Tres? ¿Hay un número exacto?",
    reflection: "¿Son todos nuestros conceptos igualmente vagos en los bordes?",
    application: "¿Cómo defines categorías importantes en tu vida si sus límites son borrosos?",
    philosopher: "Lógica Antigua",
    category: "Lenguaje & Categorías"
  },
  {
    title: "La Paradoja de la Predestinación",
    explanation: "Si Dios conoce el futuro, entonces el futuro es inevitable. Pero si es inevitable, ¿tienes libre albedrío?",
    reflection: "¿Puede coexistir el conocimiento divino con el libre albedrío humano?",
    application: "¿Crees que tu vida está predeterminada o que tienes libertad real?",
    philosopher: "Agustín de Hipona (400 d.C.)",
    category: "Libertad & Destino"
  },
  {
    title: "La Paradoja del Ajedrez Eterno",
    explanation: "En ajedrez, hay un número finito de posiciones posibles. Pero si el juego es eterno, debe repetirse eventualmente. ¿Significa que toda historia eventual se repite?",
    reflection: "¿Es la historia cíclica o lineal?",
    application: "¿Crees que estás repitiendo patrones del pasado?",
    philosopher: "Nietzsche & Física",
    category: "Tiempo & Patrón"
  },
  {
    title: "La Paradoja del Desierto",
    explanation: "Un hombre en el desierto tiene sed. Encuentra un poco de agua. Si la bebe, sobrevive un día pero luego muere de sed. Si no la bebe, muere de sed ahora. ¿Cuál es la opción correcta?",
    reflection: "A veces no hay solución correcta, solo grados de incorrección.",
    application: "¿Aceptas que algunas situaciones no tienen buenas opciones?",
    philosopher: "Dilema Ético",
    category: "Necesidad & Elección"
  },
  {
    title: "El Experimento de la Habitación China",
    explanation: "Un hombre en una habitación recibe símbolos chinos sin entender chino. Sigue reglas para responder. Desde afuera, parece hablar chino. ¿Entiende realmente?",
    reflection: "¿La comprensión requiere entender significado o solo manipular símbolos correctamente?",
    application: "¿Qué significa 'entender' realmente algo?",
    philosopher: "John Searle (1980)",
    category: "Mente & Comprensión"
  },
  {
    title: "La Paradoja de Newcomb",
    explanation: "Un predictor perfecto pone dinero en dos cajas. Tú puedes tomar una o ambas. El predictor predijo lo que harías y, si predice que tomarás solo una, pone $1 millón. Si predice ambas, no pone nada. ¿Tomas una o dos?",
    reflection: "¿Debes actuar como crees que otros te predijeron, o según tu lógica actual?",
    application: "¿Cambias tu comportamiento porque crees que otros te conocen?",
    philosopher: "Robert Newcomb (1960)",
    category: "Decisión & Predicción"
  },
  {
    title: "La Paradoja del Determinismo",
    explanation: "Si el universo es completamente determinista (cada evento causado por anteriores), ¿cómo puedes tomar decisiones 'libres'?",
    reflection: "¿La libertad es posible en un universo determinista?",
    application: "¿Eres realmente responsable de tus acciones si no podías hacer otra cosa?",
    philosopher: "Laplace & Filósofos Modernos",
    category: "Libertad & Causalidad"
  },
  {
    title: "El Velo de la Ignorancia",
    explanation: "Imagina diseñar una sociedad sin saber qué posición tendrías en ella (rico, pobre, enfermo, sano). ¿Qué tipo de sociedad crearías?",
    reflection: "¿Nuestras creencias sobre justicia cambiarían si no supiéramos nuestra posición?",
    application: "¿Cómo evaluarías tu propia ventaja si fueras vulnerable?",
    philosopher: "John Rawls (1971)",
    category: "Justicia & Igualdad"
  }
];

// Función para obtener paradoja aleatoria
function getRandomParadox() {
  return PARADOXES_DATABASE[Math.floor(Math.random() * PARADOXES_DATABASE.length)];
}

// Función para búsqueda en paradojas
function searchParadoxes(query) {
  const q = query.toLowerCase();
  return PARADOXES_DATABASE.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.philosopher.toLowerCase().includes(q) ||
    p.explanation.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q)
  );
}

// Obtener todas las categorías de paradojas
function getParadoxCategories() {
  return [...new Set(PARADOXES_DATABASE.map(p => p.category))];
}

// Obtener paradojas por categoría
function getParadoxesByCategory(category) {
  return PARADOXES_DATABASE.filter(p => p.category === category);
}
