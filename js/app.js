// Consolidated Script for FilosofiaCotidiana - Public Edition

// 1. DATA
const concepts = [
    {
        title: "Dicotomía del Control",
        quote: "No podemos elegir nuestras circunstancias externas, pero siempre podemos elegir cómo responder a ellas.",
        philosopher: "Epicteto",
        application: "Ante un imprevisto, separa lo que depende de ti (tu juicio) de lo que no (el evento). Actúa solo en lo primero.",
        prompt: "¿Qué situación te preocupa hoy que está totalmente fuera de tu control? Escribe cómo podrías soltarla."
    },
    {
        title: "Ataraxia",
        quote: "El límite de la magnitud de los placeres es la eliminación de todo dolor.",
        philosopher: "Epicuro",
        application: "Busca la tranquilidad mental evitando deseos innecesarios y miedos infundados. Valora lo simple.",
        prompt: "¿Qué deseo innecesario estás persiguiendo hoy que te impide alcanzar la paz?"
    },
    {
        title: "Amor Fati",
        quote: "Mi fórmula para la grandeza humana es el Amor Fati: no querer que nada sea distinto ni en el pasado ni en el futuro.",
        philosopher: "Friedrich Nietzsche",
        application: "No solo aceptes lo que sucede; ámalo como una parte necesaria de tu historia única.",
        prompt: "Piensa en algo 'malo' que te haya pasado hoy. ¿Cómo podrías verlo como una oportunidad para crecer?"
    },
    {
        title: "Existencialismo (Esencia)",
        quote: "La existencia precede a la esencia.",
        philosopher: "Jean-Paul Sartre",
        application: "No has nacido con un destino. Eres lo que haces. Tienes la libertad total de definirte hoy.",
        prompt: "Si hoy borraras todas tus etiquetas (puesto, edad, rol), ¿quién decidirías empezar a ser mañana?"
    },
    {
        title: "La Navaja de Ockham",
        quote: "En igualdad de condiciones, la explicación más sencilla suele ser la correcta.",
        philosopher: "Guillermo de Ockham",
        application: "No sobreanalices los problemas. Busca la raíz más evidente antes de crear conspiraciones mentales.",
        prompt: "¿Qué problema estás complicando demasiado en tu cabeza? ¿Cuál es la explicación más simple?"
    },
    {
        title: "Mala Fe",
        quote: "El hombre está condenado a ser libre; porque una vez arrojado al mundo, es responsable de todo lo que hace.",
        philosopher: "Jean-Paul Sartre",
        application: "No te mientas diciendo 'no tengo opción'. Siempre hay una opción, aunque sea difícil.",
        prompt: "¿En qué área de tu vida dices 'no tengo otra opción' para evitar tu responsabilidad real?"
    },
    {
        title: "El Imperativo Categórico",
        quote: "Obra solo según aquella máxima por la cual puedas querer que al mismo tiempo se convierta en ley universal.",
        philosopher: "Immanuel Kant",
        application: "Antes de actuar, pregúntate: ¿Me gustaría que todo el mundo hiciera lo mismo en esta situación?",
        prompt: "Si tu acción más importante de hoy se convirtiera en ley para toda la humanidad, ¿sería el mundo un lugar mejor?"
    },
    {
        title: "Eudaimonía",
        quote: "La felicidad es una actividad del alma de acuerdo con la virtud.",
        philosopher: "Aristóteles",
        application: "La felicidad no es un placer fugaz, sino el florecimiento resultante de vivir con excelencia y propósito.",
        prompt: "¿Qué acción virtuosa (con coraje, justicia o sabiduría) podrías realizar hoy por alguien más?"
    },
    {
        title: "La Caverna",
        quote: "El conocimiento es la opinión verdadera acompañada de una razón.",
        philosopher: "Platón",
        application: "No te quedes con las sombras (lo que dicen otros, redes sociales). Busca la luz de la verdad cuestionando.",
        prompt: "¿Qué 'sombra' o creencia popular has aceptado hoy sin cuestionar si es realmente real?"
    },
    {
        title: "El Eterno Retorno",
        quote: "¿Qué pasaría si un demonio te dijera que esta vida la tendrás que vivir infinitas veces más?",
        philosopher: "Friedrich Nietzsche",
        application: "Vive de tal manera que desees repetir cada segundo de tu vida por toda la eternidad.",
        prompt: "Si hoy fuera el día que se va a repetir por siempre, ¿estarías feliz de revivir estas últimas horas?"
    },
    {
        title: "Meditación sobre la Muerte",
        quote: "Podrías dejar la vida ahora mismo. Deja que eso determine lo que haces, dices y piensas.",
        philosopher: "Marco Aurelio",
        application: "El Memento Mori no es para deprimirse, sino para priorizar lo que realmente importa y descartar lo trivial.",
        prompt: "Si supieras que te queda 24 horas, ¿qué conflicto o queja de hoy dejaría de tener importancia?"
    },
    {
        title: "Minimalismo Cínico",
        quote: "Busco a un hombre honesto.",
        philosopher: "Diógenes de Sinope",
        application: "Despójate de las pretensiones sociales y las posesiones que te encadenan. La virtud basta para la felicidad.",
        prompt: "¿Qué posesión o estatus social te está robando más libertad de la que te da?"
    },
    {
        title: "Saber que no sabes",
        quote: "Solo sé que no sé nada.",
        philosopher: "Sócrates",
        application: "Mantén una mente de principiante. La verdadera sabiduría empieza cuando admites tu propia ignorancia.",
        prompt: "¿Sobre qué tema has sido demasiado arrogante hoy? ¿Qué podrías aprender si admitieras que no lo sabes todo?"
    },
    {
        title: "El Absurdo",
        quote: "Debemos imaginar a Sísifo feliz.",
        philosopher: "Albert Camus",
        application: "Aunque el mundo parezca no tener sentido, nuestra rebelión consiste en crear nuestro propio significado con alegría.",
        prompt: "¿Qué tarea rutinaria y 'maldita' te toca hoy? ¿Cómo podrías hacerla con una sonrisa desafiante?"
    },
    {
        title: "Ética de la Ambigüedad",
        quote: "El hombre es una pasión inútil, pero es él quien decide su valor.",
        philosopher: "Simone de Beauvoir",
        application: "Tu libertad solo es real si también buscas la libertad de los demás.",
        prompt: "¿Cómo puedes ayudar a que alguien a tu alrededor se sienta hoy un poco más libre?"
    },
    {
        title: "Perspectivismo",
        quote: "Yo soy yo y mi circunstancia, y si no la salvo a ella no me salvo yo.",
        philosopher: "José Ortega y Gasset",
        application: "Tu verdad es solo un punto de vista. Entender tu entorno es vital para entenderte a ti mismo.",
        prompt: "Intenta ver el mayor conflicto de hoy desde la perspectiva de la otra persona. ¿Qué descubres?"
    },
    {
        title: "La Duda Metódica",
        quote: "Pienso, luego existo.",
        philosopher: "René Descartes",
        application: "No aceptes nada como verdadero sin antes haberlo verificado por ti mismo. Confía en tu propia razón.",
        prompt: "¿De qué pensamiento o prejuicio estás tan seguro que podrías estar equivocado?"
    },
    {
        title: "Sustancia y Emoción",
        quote: "No reír, no llorar, no indignarse, sino comprender.",
        philosopher: "Baruch Spinoza",
        application: "Cuando alguien te ataque, no reacciones emocionalmente. Trata de entender las causas físicas y lógicas detrás de su acto.",
        prompt: "Visualiza a alguien que te cae mal. Trata de pensar qué causas biográficas lo llevaron a ser así."
    },
    {
        title: "El Velo de la Ignorancia",
        quote: "La justicia es la primera virtud de las instituciones sociales.",
        philosopher: "John Rawls",
        application: "Si no supieras quién vas a ser en la sociedad, ¿qué leyes querrías? Busca la equidad.",
        prompt: "Si hoy se reseteara el mundo y pudieras ser cualquiera, ¿qué cambio pedirías para los más desfavorecidos?"
    },
    {
        title: "Fluidez (Panta Rhei)",
        quote: "Nadie se baña dos veces en el mismo río.",
        philosopher: "Heráclito",
        application: "Todo cambia constantemente. No te aferres a situaciones o personas; fluye con el cambio.",
        prompt: "¿A qué situación del pasado te estás aferrando que ya no existe en el presente?"
    },
    {
        title: "Apatheia",
        quote: "Libérate de las pasiones que nublan el juicio.",
        philosopher: "Zenón de Citio",
        application: "La paz mental llega cuando tus emociones no son las que conducen el carro, sino tu razón.",
        prompt: "¿Qué emoción intensa te ha dominado hoy? ¿Cómo se vería esa situación desde la calma absoluta?"
    },
    {
        title: "La Voluntad de Poder",
        quote: "Lo que no me mata, me hace más fuerte.",
        philosopher: "Friedrich Nietzsche",
        application: "Usa tus dificultades como combustible para tu desarrollo personal y superación.",
        prompt: "¿Cuál es el obstáculo más grande que enfrentas esta semana? ¿Qué habilidad estás desarrollando gracias a él?"
    },
    {
        title: "Tranquilidad de Ánimo",
        quote: "La mayor parte de nuestras preocupaciones son vanas, de modo que es mejor no prestarles atención.",
        philosopher: "Séneca",
        application: "Aprende a distinguir entre problemas reales y dramas imaginarios generados por el cansancio o el miedo.",
        prompt: "De todo lo que te ha estresado hoy, ¿cuánto seguirá importando dentro de un año?"
    },
    {
        title: "Poder y Conocimiento",
        quote: "Donde hay poder, hay resistencia.",
        philosopher: "Michel Foucault",
        application: "Sé consciente de cómo las estructuras y las normas sociales moldean tu pensamiento y comportamiento.",
        prompt: "¿Qué comportamiento tuyo hoy ha sido dictado por la 'presión social' y no por tu propia voluntad?"
    },
    {
        title: "El Otro",
        quote: "El infierno son los otros.",
        philosopher: "Jean-Paul Sartre",
        application: "A menudo nos vemos a nosotros mismos solo a través del juicio de los demás. Reclama tu propia mirada.",
        prompt: "¿Cuánto de tu felicidad de hoy ha dependido de la aprobación de otra persona?"
    },
    {
        title: "Vitalismo",
        quote: "Vivir es encontrarse en el mundo.",
        philosopher: "José Ortega y Gasset",
        application: "No pienses la vida, ¡vívela! La acción es lo que nos mantiene conectados con la realidad.",
        prompt: "Si hoy dejaras de 'planear' por un momento, ¿qué acción pura y vital te gustaría realizar?"
    },
    {
        title: "Soberanía sobre uno mismo",
        quote: "Sobre su propio cuerpo y mente, el individuo es soberano.",
        philosopher: "John Stuart Mill",
        application: "Defiende tu derecho a pensar diferente, siempre que no dañes a los demás. Tu mente es tu castillo.",
        prompt: "¿En qué idea eres hoy 'rebelde' frente a lo que opina la mayoría de tu entorno?"
    },
    {
        title: "Impermanencia",
        quote: "El cambio es la única constante.",
        philosopher: "Buda (Filosofía Oriental)",
        application: "Acepta que el dolor pasará, pero también que la alegría es efímera. Disfruta el ahora sin apego.",
        prompt: "Mira un objeto a tu alrededor. Visualiza cómo el tiempo lo transformará. ¿Cómo cambia eso tu aprecio por él?"
    },
    {
        title: "Pragmatismo",
        quote: "La verdad es lo que funciona.",
        philosopher: "William James",
        application: "No busques verdades abstractas. Busca qué creencias te hacen ser una mejor persona y vivir mejor.",
        prompt: "¿Qué creencia tienes que, aunque no pueda probarse, te ayuda a ser más feliz o productivo?"
    },
    {
        title: "Sociedad Líquida",
        quote: "Vivimos en un tiempo de incertidumbre constante.",
        philosopher: "Zygmunt Bauman",
        application: "En un mundo que cambia rápido, la adaptabilidad y los vínculos humanos sólidos son tu mejor refugio.",
        prompt: "¿A quién has dedicado tiempo de calidad hoy sin mirar ninguna pantalla?"
    },
    {
        title: "Ley Natural",
        quote: "Se debe hacer el bien y evitar el mal.",
        philosopher: "Tomás de Aquino",
        application: "Identifica los principios morales universales (justicia, verdad, vida) antes de tomar una decisión difícil.",
        prompt: "Ante un dilema ético hoy, ¿qué te dicta tu razón fundamental sobre lo que es 'inherentemente bueno'?"
    },
    {
        title: "Libre Albedrío",
        quote: "Si el hombre es un bien, y no puede obrar rectamente sino cuando quiere, debe tener libre albedrío.",
        philosopher: "Agustín de Hipona",
        application: "No culpes al destino ni a las circunstancias. Eres el dueño de tus elecciones y su carga moral.",
        prompt: "¿De qué decisión reciente te has sentido 'víctima'? ¿Cómo cambiaría si asumieras tu parte de libertad?"
    },
    {
        title: "Univocidad del Ser",
        quote: "El ser no es nada más que la ausencia de la no-existencia.",
        philosopher: "Duns Escoto",
        application: "Reconoce que compartes la misma chispa de existencia con todo lo que te rodea. Fomenta la conexión.",
        prompt: "Mira a un extraño hoy. Intenta sentir que ambos comparten la misma cualidad fundamental de existir."
    },
    {
        title: "Proporción de Creencia",
        quote: "El hombre sabio proporciona su creencia a la evidencia.",
        philosopher: "David Hume",
        application: "No te dejes llevar por rumores o dogmas. Analiza los hechos y ajusta tu opinión a la realidad demostrable.",
        prompt: "¿En qué afirmación has creído hoy con demasiada fuerza sin tener pruebas reales?"
    },
    {
        title: "El Contrato Social",
        quote: "El hombre nace libre, pero por todas partes está encadenado.",
        philosopher: "Jean-Jacques Rousseau",
        application: "Reconoce que vivir en sociedad implica responsabilidades mutuas. Actúa buscando el bien común.",
        prompt: "¿Qué pequeña norma social has roto hoy (o querido romper) y cómo afectaría si todos hicieran lo mismo?"
    },
    {
        title: "Ser-en-el-mundo",
        quote: "Ser hombre es estar en el mundo y estar preocupado por las cosas.",
        philosopher: "Martin Heidegger",
        application: "No eres un observador aislado; estás inmerso en tu realidad. Trata tu entorno con cuidado y presencia.",
        prompt: "¿Qué objeto o tarea de tu casa has ignorado hoy? Atiéndelo con total atención y cuidado."
    },
    {
        title: "Autenticidad Moderna",
        quote: "Ser uno mismo en un mundo que intenta constantemente que seas otra cosa es el mayor logro.",
        philosopher: "Ralph Waldo Emerson",
        application: "Escucha tu voz interior por encima del ruido de las expectativas ajenas. Tu verdad es tu brújula.",
        prompt: "¿En qué momento de hoy has actuado 'para la galería' en lugar de ser fiel a ti mismo?"
    },
    {
        title: "Interseccionalidad",
        quote: "Nadie es una sola cosa. Somos muchas cosas entrelazadas.",
        philosopher: "Kimberlé Crenshaw",
        application: "Evita los juicios simples sobre las personas. Cada uno carga con múltiples capas de identidad y lucha.",
        prompt: "¿A quién has encasillado hoy en una sola etiqueta? Intenta imaginar tres capas más de su identidad."
    },
    {
        title: "Wu Wei (No-Acción)",
        quote: "No luches. Fluye con el curso de las cosas.",
        philosopher: "Chuang Tse (Taoísmo)",
        application: "No fuerces los resultados. A veces, la mejor forma de resolver un problema es dejar que se asiente solo.",
        prompt: "¿Qué situación estás intentando forzar hoy sin éxito? Prueba a no hacer nada por unas horas y observa."
    },
    {
        title: "Karma (Causalidad)",
        quote: "Lo que siembres, eso cosecharás.",
        philosopher: "Tradición Hindú",
        application: "Tus pensamientos y acciones de hoy son las semillas de tu futuro. Elige con intención.",
        prompt: "¿Qué 'semilla' de amabilidad o esfuerzo has plantado hoy que florecerá más adelante?"
    },
    {
        title: "Dharma (Propósito)",
        quote: "Es mejor cumplir mal el propio deber que cumplir bien el ajeno.",
        philosopher: "Bhagavad Gita",
        application: "Encuentra tu camino único. No intentes ser la mejor versión de otra persona; mejora tu propio rol.",
        prompt: "¿A quién estás intentando imitar hoy en lugar de perfeccionar tu propia naturaleza?"
    },
    {
        title: "El Camino Medio",
        quote: "Evita los extremos del placer vulgar y el sufrimiento inútil.",
        philosopher: "Buda",
        application: "Busca el equilibrio. Ni la austeridad total ni el exceso de indulgencia te darán claridad mental.",
        prompt: "¿En qué área de tu vida te has ido a un extremo hoy (trabajo, ocio, comida)? ¿Dónde estaría el centro?"
    },
    {
        title: "Anatman (No-Yo)",
        quote: "Si te das cuenta de que todo cambia, no hay nada a lo que intentar aferrarse.",
        philosopher: "Lao Tsé / Filosofía Budista",
        application: "No te apegues a una imagen rígida de quién eres. Permítete evolucionar y dejar ir versiones pasadas.",
        prompt: "¿A qué idea de ti mismo ('soy tímido', 'soy malo en esto') te estás aferrando hoy que ya no es verdad?"
    },
    {
        title: "Principio de Razón Suficiente",
        quote: "Nada sucede sin que haya una razón por la cual deba ser así y no de otra manera.",
        philosopher: "Gottfried Leibniz",
        application: "Sé curioso. Todo lo que te pasa tiene una causa. En lugar de quejarte, investiga el porqué.",
        prompt: "¿Qué evento 'inexplicable' te ha ocurrido hoy? Busca tres posibles causas lógicas que lo expliquen."
    },
    {
        title: "Idealismo Trascendental",
        quote: "La ciencia es conocimiento organizado; la sabiduría es vida organizada.",
        philosopher: "Immanuel Kant",
        application: "Reconoce que tu mente filtra la realidad. No ves el mundo como es, sino como tú eres.",
        prompt: "¿Qué 'filtro' (de miedo, alegría o prejuicio) ha coloreado tu visión del mundo esta mañana?"
    },
    {
        title: "Grandeza del Alma",
        quote: "El hombre superior es el que es fiel a la esperanza de su juventud.",
        philosopher: "Friedrich Schiller",
        application: "Reconecta con tus ideales más nobles. No dejes que el cinismo de la edad adulta apague tu fuego interno.",
        prompt: "¿Qué ideal de cuando tenías 15 años has abandonado hoy? ¿Cómo podrías rescatar un poco de él?"
    },
    {
        title: "La Voluntad General",
        quote: "La obediencia a la ley que uno se ha prescrito es la libertad.",
        philosopher: "Jean-Jacques Rousseau",
        application: "La verdadera libertad no es hacer lo que quieras, sino seguir las reglas que tú mismo sabes que son justas.",
        prompt: "¿Qué regla personal te has puesto hoy and has cumplido con orgullo?"
    },
    {
        title: "Superhombre (Übermensch)",
        quote: "El hombre es algo que debe ser superado.",
        philosopher: "Friedrich Nietzsche",
        application: "No te conformes con lo que eres ahora. Busca constantemente romper tus propios límites y valores heredados.",
        prompt: "¿En qué aspecto has sido 'demasiado humano' hoy (perezoso, miedoso) y cómo podrías superarlo mañana?"
    },
    {
        title: "Microfísica del Poder",
        quote: "El saber es el único espacio de libertad del ser.",
        philosopher: "Michel Foucault",
        application: "Cuestiona las pequeñas verdades que te imponen. Infórmate para no ser manipulado por el discurso dominante.",
        prompt: "¿Qué noticia o dato has aceptado hoy como verdad absoluta sin investigar su origen?"
    },
    {
        title: "Diferencia Humana",
        quote: "Lo que hace al hombre es su capacidad de decir NO.",
        philosopher: "Max Scheler",
        application: "Tu dignidad reside en tu capacidad de negarte a seguir impulsos ciegos o mandatos injustos. Usa tu NO.",
        prompt: "¿A qué le has dicho SÍ hoy que realmente querías decir NO?"
    },
    {
        title: "La Realidad Radical",
        quote: "Vivir es la realidad radical; todas las demás realidades se dan dentro de ella.",
        philosopher: "José Ortega y Gasset",
        application: "No pierdas el tiempo en abstracciones si descuidas el hecho puro de estar vivo ahora mismo.",
        prompt: "Para un momento. Siente tu respiración y el peso de tu cuerpo. Esa es la única realidad que importa ahora."
    },
    {
        title: "Justicia como Imparcialidad",
        quote: "Nadie conoce su lugar en la sociedad; por eso la justicia debe ser ciega.",
        philosopher: "John Rawls",
        application: "Si vas a juzgar a alguien hoy, imagina que mañana podrías despertarte siendo esa persona. ¿Serías tan severo?",
        prompt: "¿A quién has criticado hoy? ¿Cómo cambiaría tu juicio si estuvieras en su situación exacta?"
    },
    {
        title: "Eros y Civilización",
        quote: "La cultura es el esfuerzo de los hombres por humanizar la naturaleza.",
        philosopher: "Herbert Marcuse",
        application: "Busca crear belleza y sentido en tu entorno, en lugar de solo consumir o destruir.",
        prompt: "¿Qué pequeño acto de 'humanización' o belleza has aportado hoy a tu lugar de trabajo o casa?"
    },
    {
        title: "El Compromiso",
        quote: "No se es hombre sino por el compromiso que se asume.",
        philosopher: "Jean-Paul Sartre",
        application: "Tus palabras no valen nada si no están respaldadas por una acción que te vincule a una causa.",
        prompt: "¿Con qué causa o persona te has comprometido hoy de verdad, más allá de las palabras?"
    },
    {
        title: "Fenomenología del Cuerpo",
        quote: "Yo no tengo un cuerpo, yo SOY mi cuerpo.",
        philosopher: "Maurice Merleau-Ponty",
        application: "Cuida tu salud física no como una herramienta, sino como la base misma de tu existencia y percepción.",
        prompt: "¿Qué mensaje te ha enviado tu cuerpo hoy (cansancio, hambre, tensión) que has decidido ignorar?"
    },
    {
        title: "La Sociedad del Espectáculo",
        quote: "Todo lo que antes se vivía directamente, ahora se representa.",
        philosopher: "Guy Debord",
        application: "Deja de mirar tu vida a través de una pantalla. Vive experiencias que no necesites publicar para que sean reales.",
        prompt: "¿Qué momento de hoy ha sido solo para ti, sin fotos ni testigos digitales?"
    },
    {
        title: "Ética del Cuidado",
        quote: "La responsabilidad hacia el otro es el núcleo de la moralidad.",
        philosopher: "Carol Gilligan",
        application: "No te limites a seguir reglas frías. Busca el bienestar real de las personas que dependen de ti.",
        prompt: "¿A quién has cuidado hoy con empatía real, más allá de tu 'obligación'?"
    },
    {
        title: "Deconstrucción",
        quote: "No hay nada fuera del texto.",
        philosopher: "Jacques Derrida",
        application: "Cuestiona los binarios (bueno/malo, éxito/fracaso). La verdad suele estar en los matices olvidados.",
        prompt: "¿Qué situación de hoy has visto como un 'blanco o negro' cuando en realidad es un gris complejo?"
    },
    {
        title: "Racionalismo Crítico",
        quote: "Nuestra meta debe ser el error, para detectarlo y eliminarlo.",
        philosopher: "Karl Popper",
        application: "No busques tener razón; busca estar equivocado lo antes posible para aprender la verdad.",
        prompt: "¿Qué idea tuya ha sido desafiada hoy? ¿Has defendido tu ego o has buscado la verdad?"
    },
    {
        title: "La Vida Activa",
        quote: "La pluralidad es la condición de la acción humana.",
        philosopher: "Hannah Arendt",
        application: "Participa. Habla. Actúa en el espacio público. Tu voz es necesaria para que el mundo sea humano.",
        prompt: "¿En qué conversación importante has guardado silencio hoy pudiendo haber aportado valor?"
    },
    {
        title: "Autenticidad contra la Falsedad",
        quote: "Está lleno de gente falsa... y todo lo que haces es estudiar para ser lo suficientemente listo como para poder comprarte un Cadillac algún día.",
        philosopher: "Holden Caulfield (J.D. Salinger)",
        application: "Identifica qué partes de tu rutina haces solo por estatus o 'apariencia'. Busca lo que es genuino para ti.",
        prompt: "¿Qué acción has realizado hoy solo para 'encajar' o impresionar a otros en lugar de ser fiel a ti mismo?"
    },
    {
        title: "El Guardián en el Centeno",
        quote: "Mi misión es atrapar a los niños si se acercan demasiado al precipicio.",
        philosopher: "El Guardián entre el Centeno (J.D. Salinger)",
        application: "Protege la curiosidad y la inocencia, tanto en los demás como en tu propio 'niño interior'. No dejes que el cinismo te ciegue.",
        prompt: "¿Qué pequeña alegría o curiosidad genuina has sentido hoy que un adulto 'serio' habría ignorado?"
    },
    {
        title: "Soledad Existencial",
        quote: "Me sentía tan abandonado y tan solo... Me gustaría que alguien me hablara de verdad.",
        philosopher: "Holden Caulfield (J.D. Salinger)",
        application: "Reconoce que la soledad es parte de la condición humana, pero la cura es la comunicación honesta, no la superficial.",
        prompt: "¿Con quién podrías tener hoy una conversación 'de verdad', sin máscaras ni temas triviales?"
    }
];

// 2. JOURNAL LOGIC
const STORAGE_KEY = 'philosophyJournal';

function getEntries() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

function saveEntryData(text, prompt) {
    if (!text.trim()) return { success: false, error: 'Empty content' };
    const entries = getEntries();
    const newEntry = {
        id: Date.now(),
        date: new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        prompt: prompt,
        text: text
    };
    entries.unshift(newEntry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    return { success: true, entry: newEntry };
}

function deleteEntryData(id) {
    let entries = getEntries();
    entries = entries.filter(e => e.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    return true;
}

// 3. UI LOGIC
function renderHistoryUI(entries, listContainer) {
    if (entries.length === 0) {
        listContainer.innerHTML = '<p style="text-align: center; color: #666; font-style: italic;">Aún no has escrito ninguna reflexión. Tu viaje comienza con la primera palabra.</p>';
        return;
    }

    listContainer.innerHTML = entries.map(entry => `
        <div class="journal-entry-item">
            <div class="entry-header">
                <span>${entry.date}</span>
                <div class="entry-actions">
                    <span class="action-link delete" onclick="window.confirmDelete(${entry.id})">Borrar</span>
                </div>
            </div>
            <p style="font-size: 0.85rem; color: var(--accent); margin-bottom: 0.5rem; font-style: italic;">${entry.prompt}</p>
            <p style="white-space: pre-wrap;">${entry.text}</p>
        </div>
    `).join('');
}

function notify(msg, type) {
    const toast = document.createElement('div');
    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#8b7355';
    toast.textContent = msg;
    toast.className = 'toast-notification'; // We could add this to CSS if needed
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'error' ? '#e74c3c' : accentColor};
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function toggleParadoxUI(element) {
    const explanation = element.querySelector('.paradox-explanation');
    const isVisible = explanation.style.display === 'block';

    document.querySelectorAll('.paradox-explanation').forEach(exp => {
        exp.style.display = 'none';
        exp.parentElement.style.borderColor = 'rgba(0, 0, 0, 0.1)';
    });

    if (!isVisible) {
        explanation.style.display = 'block';
        element.style.borderColor = 'var(--accent)';
    }
}

// 4. MAIN ORCHESTRATION
let currentConceptIndex = 0;

function renderConcept(index) {
    const concept = concepts[index];
    const card = document.getElementById('daily-card');
    if (!card) return;

    card.style.opacity = '0.5';

    setTimeout(() => {
        const titleEl = card.querySelector('.concept-title');
        const defEl = card.querySelector('.concept-definition');
        const detailsEl = card.querySelector('.concept-details');
        const promptEl = document.getElementById('journal-prompt');

        if (titleEl) titleEl.textContent = concept.title;
        if (defEl) defEl.textContent = `"${concept.quote}"`;
        if (detailsEl) {
            detailsEl.innerHTML = `
                <p><strong>Filósofo:</strong> ${concept.philosopher}</p>
                <p><strong>Aplicación práctica:</strong> ${concept.application}</p>
            `;
        }
        if (promptEl) promptEl.innerHTML = `Pregunta de hoy: <strong>${concept.prompt}</strong>`;

        card.style.opacity = '1';
    }, 100);
}

// Global functions for HTML
window.nextConcept = function () {
    currentConceptIndex = (currentConceptIndex + 1) % concepts.length;
    renderConcept(currentConceptIndex);
};

window.showAnswer = function (choice) {
    const answer = document.getElementById('answer');
    if (answer) {
        answer.style.display = 'block';
        answer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
};

window.toggleParadox = function (element) {
    toggleParadoxUI(element);
};

window.saveEntry = function () {
    const text = document.getElementById('journal-entry').value;
    const prompt = document.getElementById('journal-prompt').innerText;

    const result = saveEntryData(text, prompt);
    if (!result.success) {
        notify('Escribe algo profundo...', 'error');
        return;
    }

    notify('Reflexión guardada.', 'success');
    document.getElementById('journal-entry').value = '';

    const container = document.getElementById('history-container');
    if (container && container.style.display === 'block') {
        renderHistoryList();
    }
};

window.toggleHistory = function () {
    const container = document.getElementById('history-container');
    if (!container) return;
    const isVisible = container.style.display === 'block';

    container.style.display = isVisible ? 'none' : 'block';
    if (!isVisible) {
        renderHistoryList();
        container.scrollIntoView({ behavior: 'smooth' });
    }
};

window.confirmDelete = function (id) {
    if (confirm('¿Eliminar esta reflexión?')) {
        deleteEntryData(id);
        renderHistoryList();
    }
};

function renderHistoryList() {
    const list = document.getElementById('entries-list');
    if (list) {
        renderHistoryUI(getEntries(), list);
    }
}

// Bootstrap
function init() {
    const now = new Date();
    const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    currentConceptIndex = dayOfYear % concepts.length;
    renderConcept(currentConceptIndex);
}

// Multilayer initialization to ensure it runs
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
window.onload = init;
