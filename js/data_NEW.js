// 1. DATA
const concepts = [
    {
        title: "Dicotomía del Control",
        category: "ESTOICISMO",
        quote: "No podemos elegir nuestras circunstancias externas, pero siempre podemos elegir cómo responder a ellas.",
        philosopher: "Epicteto",
        application: "Ante un imprevisto, separa lo que depende de ti (tu juicio) de lo que no (el evento). Actúa solo en lo primero.",
        prompt: "¿Qué situación te preocupa hoy que está totalmente fuera de tu control? Escribe cómo podrías soltarla."
    },
    {
        title: "Ataraxia",
        category: "ESTOICISMO",
        quote: "El límite de la magnitud de los placeres es la eliminación de todo dolor.",
        philosopher: "Epicuro",
        application: "Busca la tranquilidad mental evitando deseos innecesarios y miedos infundados. Valora lo simple.",
        prompt: "¿Qué deseo innecesario estás persiguiendo hoy que te impide alcanzar la paz?"
    },
    {
        title: "Amor Fati",
        category: "ESTOICISMO",
        quote: "Mi fórmula para la grandeza humana es el Amor Fati: no querer que nada sea distinto ni en el pasado ni en el futuro.",
        philosopher: "Friedrich Nietzsche",
        application: "No solo aceptes lo que sucede; ámalo como una parte necesaria de tu historia única.",
        prompt: "Piensa en algo 'malo' que te haya pasado hoy. ¿Cómo podrías verlo como una oportunidad para crecer?"
    },
    {
        title: "Existencialismo (Esencia)",
        category: "EXISTENCIALISMO",
        quote: "La existencia precede a la esencia.",
        philosopher: "Jean-Paul Sartre",
        application: "No has nacido con un destino. Eres lo que haces. Tienes la libertad total de definirte hoy.",
        prompt: "Si hoy borraras todas tus etiquetas (puesto, edad, rol), ¿quién decidirías empezar a ser mañana?"
    },
    {
        title: "La Navaja de Ockham",
        category: "ETICA",
        quote: "En igualdad de condiciones, la explicación más sencilla suele ser la correcta.",
        philosopher: "Guillermo de Ockham",
        application: "No sobreanalices los problemas. Busca la raíz más evidente antes de crear conspiraciones mentales.",
        prompt: "¿Qué problema estás complicando demasiado en tu cabeza? ¿Cuál es la explicación más simple?"
    },
    {
        title: "Mala Fe",
        category: "EXISTENCIALISMO",
        quote: "El hombre está condenado a ser libre; porque una vez arrojado al mundo, es responsable de todo lo que hace.",
        philosopher: "Jean-Paul Sartre",
        application: "No te mientas diciendo 'no tengo opción'. Siempre hay una opción, aunque sea difícil.",
        prompt: "¿En qué área de tu vida dices 'no tengo otra opción' para evitar tu responsabilidad real?"
    },
    {
        title: "El Imperativo Categórico",
        category: "ETICA",
        quote: "Obra solo según aquella máxima por la cual puedas querer que al mismo tiempo se convierta en ley universal.",
        philosopher: "Immanuel Kant",
        application: "Antes de actuar, pregúntate: ¿Me gustaría que todo el mundo hiciera lo mismo en esta situación?",
        prompt: "Si tu acción más importante de hoy se convirtiera en ley para toda la humanidad, ¿sería el mundo un lugar mejor?"
    },
    {
        title: "Eudaimonía",
        category: "ETICA",
        quote: "La felicidad es una actividad del alma de acuerdo con la virtud.",
        philosopher: "Aristóteles",
        application: "La felicidad no es un placer fugaz, sino el florecimiento resultante de vivir con excelencia y propósito.",
        prompt: "¿Qué acción virtuosa (con coraje, justicia o sabiduría) podrías realizar hoy por alguien más?"
    },
    {
        title: "La Caverna",
        category: "ETICA",
        quote: "El conocimiento es la opinión verdadera acompañada de una razón.",
        philosopher: "Platón",
        application: "No te quedes con las sombras (lo que dicen otros, redes sociales). Busca la luz de la verdad cuestionando.",
        prompt: "¿Qué 'sombra' o creencia popular has aceptado hoy sin cuestionar si es realmente real?"
    },
    {
        title: "El Eterno Retorno",
        category: "EXISTENCIALISMO",
        quote: "¿Qué pasaría si un demonio te dijera que esta vida la tendrás que vivir infinitas veces más?",
        philosopher: "Friedrich Nietzsche",
        application: "Vive de tal manera que desees repetir cada segundo de tu vida por toda la eternidad.",
        prompt: "Si hoy fuera el día que se va a repetir por siempre, ¿estarías feliz de revivir estas últimas horas?"
    },
    {
        title: "Meditación sobre la Muerte",
        category: "ESTOICISMO",
        quote: "Podrías dejar la vida ahora mismo. Deja que eso determine lo que haces, dices y piensas.",
        philosopher: "Marco Aurelio",
        application: "El Memento Mori no es para deprimirse, sino para priorizar lo que realmente importa y descartar lo trivial.",
        prompt: "Si supieras que te queda 24 horas, ¿qué conflicto o queja de hoy dejaría de tener importancia?"
    },
    {
        title: "Minimalismo Cínico",
        category: "ESTOICISMO",
        quote: "Busco a un hombre honesto.",
        philosopher: "Diógenes de Sinope",
        application: "Despójate de las pretensiones sociales y las posesiones que te encadenan. La virtud basta para la felicidad.",
        prompt: "¿Qué posesión o estatus social te está robando más libertad de la que te da?"
    },
    {
        title: "Saber que no sabes",
        category: "ETICA",
        quote: "Solo sé que no sé nada.",
        philosopher: "Sócrates",
        application: "Mantén una mente de principiante. La verdadera sabiduría empieza cuando admites tu propia ignorancia.",
        prompt: "¿Sobre qué tema has sido demasiado arrogante hoy? ¿Qué podrías aprender si admitieras que no lo sabes todo?"
    },
    {
        title: "El Absurdo",
        category: "EXISTENCIALISMO",
        quote: "Debemos imaginar a Sísifo feliz.",
        philosopher: "Albert Camus",
        application: "Aunque el mundo parezca no tener sentido, nuestra rebelión consiste en crear nuestro propio significado con alegría.",
        prompt: "¿Qué tarea rutinaria y 'maldita' te toca hoy? ¿Cómo podrías hacerla con una sonrisa desafiante?"
    },
    {
        title: "Ética de la Ambigüedad",
        category: "EXISTENCIALISMO",
        quote: "El hombre es una pasión inútil, pero es él quien decide su valor.",
        philosopher: "Simone de Beauvoir",
        application: "Tu libertad solo es real si también buscas la libertad de los demás.",
        prompt: "¿Cómo puedes ayudar a que alguien a tu alrededor se sienta hoy un poco más libre?"
    },
    {
        title: "Perspectivismo",
        category: "CONTEMPORANEO",
        quote: "Yo soy yo y mi circunstancia, y si no la salvo a ella no me salvo yo.",
        philosopher: "José Ortega y Gasset",
        application: "Tu verdad es solo un punto de vista. Entender tu entorno es vital para entenderte a ti mismo.",
        prompt: "Intenta ver el mayor conflicto de hoy desde la perspectiva de la otra persona. ¿Qué descubres?"
    },
    {
        title: "La Duda Metódica",
        category: "ETICA",
        quote: "Pienso, luego existo.",
        philosopher: "René Descartes",
        application: "No aceptes nada como verdadero sin antes haberlo verificado por ti mismo. Confía en tu propia razón.",
        prompt: "¿De qué pensamiento o prejuicio estás tan seguro que podrías estar equivocado?"
    },
    {
        title: "Sustancia y Emoción",
        category: "ETICA",
        quote: "No reír, no llorar, no indignarse, sino comprender.",
        philosopher: "Baruch Spinoza",
        application: "Cuando alguien te ataque, no reacciones emocionalmente. Trata de entender las causas físicas y lógicas detrás de su acto.",
        prompt: "Visualiza a alguien que te cae mal. Trata de pensar qué causas biográficas lo llevaron a ser así."
    },
    {
        title: "El Velo de la Ignorancia",
        category: "ETICA",
        quote: "La justicia es la primera virtud de las instituciones sociales.",
        philosopher: "John Rawls",
        application: "Si no supieras quién vas a ser en la sociedad, ¿qué leyes querrías? Busca la equidad.",
        prompt: "Si hoy se reseteara el mundo y pudieras ser cualquiera, ¿qué cambio pedirías para los más desfavorecidos?"
    },
    {
        title: "Fluidez (Panta Rhei)",
        category: "ORIENTAL",
        quote: "Nadie se baña dos veces en el mismo río.",
        philosopher: "Heráclito",
        application: "Todo cambia constantemente. No te aferres a situaciones o personas; fluye con el cambio.",
        prompt: "¿A qué situación del pasado te estás aferrando que ya no existe en el presente?"
    },
    {
        title: "Apatheia",
        category: "ESTOICISMO",
        quote: "Libérate de las pasiones que nublan el juicio.",
        philosopher: "Zenón de Citio",
        application: "La paz mental llega cuando tus emociones no son las que conducen el carro, sino tu razón.",
        prompt: "¿Qué emoción intensa te ha dominado hoy? ¿Cómo se vería esa situación desde la calma absoluta?"
    },
    {
        title: "La Voluntad de Poder",
        category: "EXISTENCIALISMO",
        quote: "Lo que no me mata, me hace más fuerte.",
        philosopher: "Friedrich Nietzsche",
        application: "Usa tus dificultades como combustible para tu desarrollo personal y superación.",
        prompt: "¿Cuál es el obstáculo más grande que enfrentas esta semana? ¿Qué habilidad estás desarrollando gracias a él?"
    },
    {
        title: "Tranquilidad de Ánimo",
        category: "ESTOICISMO",
        quote: "La mayor parte de nuestras preocupaciones son vanas, de modo que es mejor no prestarles atención.",
        philosopher: "Séneca",
        application: "Aprende a distinguir entre problemas reales y dramas imaginarios generados por el cansancio o el miedo.",
        prompt: "De todo lo que te ha estresado hoy, ¿cuánto seguirá importando dentro de un año?"
    },
    {
        title: "Poder y Conocimiento",
        category: "CONTEMPORANEO",
        quote: "Donde hay poder, hay resistencia.",
        philosopher: "Michel Foucault",
        application: "Sé consciente de cómo las estructuras y las normas sociales moldean tu pensamiento y comportamiento.",
        prompt: "¿Qué comportamiento tuyo hoy ha sido dictado por la 'presión social' y no por tu propia voluntad?"
    },
    {
        title: "El Otro",
        category: "EXISTENCIALISMO",
        quote: "El infierno son los otros.",
        philosopher: "Jean-Paul Sartre",
        application: "A menudo nos vemos a nosotros mismos solo a través del juicio de los demás. Reclama tu propia mirada.",
        prompt: "¿Cuánto de tu felicidad de hoy ha dependido de la aprobación de otra persona?"
    },
    {
        title: "Vitalismo",
        category: "CONTEMPORANEO",
        quote: "Vivir es encontrarse en el mundo.",
        philosopher: "José Ortega y Gasset",
        application: "No pienses la vida, ¡vívela! La acción es lo que nos mantiene conectados con la realidad.",
        prompt: "Si hoy dejaras de 'planear' por un momento, ¿qué acción pura y vital te gustaría realizar?"
    },
    {
        title: "Soberanía sobre uno mismo",
        category: "ETICA",
        quote: "Sobre su propio cuerpo y mente, el individuo es soberano.",
        philosopher: "John Stuart Mill",
        application: "Defiende tu derecho a pensar diferente, siempre que no dañes a los demás. Tu mente es tu castillo.",
        prompt: "¿En qué idea eres hoy 'rebelde' frente a lo que opina la mayoría de tu entorno?"
    },
    {
        title: "Impermanencia",
        category: "ORIENTAL",
        quote: "El cambio es la única constante.",
        philosopher: "Buda (Filosofía Oriental)",
        application: "Acepta que el dolor pasará, pero también que la alegría es efímera. Disfruta el ahora sin apego.",
        prompt: "Mira un objeto a tu alrededor. Visualiza cómo el tiempo lo transformará. ¿Cómo cambia eso tu aprecio por él?"
    },
    {
        title: "Pragmatismo",
        category: "CONTEMPORANEO",
        quote: "La verdad es lo que funciona.",
        philosopher: "William James",
        application: "No busques verdades abstractas. Busca qué creencias te hacen ser una mejor persona y vivir mejor.",
        prompt: "¿Qué con creencia tienes que, aunque no pueda probarse, te ayuda a ser más feliz o productivo?"
    },
    {
        title: "Sociedad Líquida",
        category: "CONTEMPORANEO",
        quote: "Vivimos en un tiempo de incertidumbre constante.",
        philosopher: "Zygmunt Bauman",
        application: "En un mundo que cambia rápido, la adaptabilidad y los vínculos humanos sólidos son tu mejor refugio.",
        prompt: "¿A quién has dedicado tiempo de calidad hoy sin mirar ninguna pantalla?"
    },
    {
        title: "Ley Natural",
        category: "ETICA",
        quote: "Se debe hacer el bien y evitar el mal.",
        philosopher: "Tomás de Aquino",
        application: "Identifica los principios morales universales (justicia, verdad, vida) antes de tomar una decisión difícil.",
        prompt: "Ante un dilema ético hoy, ¿qué te dicta tu razón fundamental sobre lo que es 'inherentemente bueno'?"
    },
    {
        title: "Libre Albedrío",
        category: "ETICA",
        quote: "Si el hombre es un bien, y no puede obrar rectamente sino cuando quiere, debe tener libre albedrío.",
        philosopher: "Agustín de Hipona",
        application: "No culpes al destino ni a las circunstancias. Eres el dueño de tus elecciones y su carga moral.",
        prompt: "¿De qué decisión reciente te has sentido 'víctima'? ¿Cómo cambiaría si asumieras tu parte de libertad?"
    },
    {
        title: "Univocidad del Ser",
        category: "ETICA",
        quote: "El ser no es nada más que la ausencia de la no-existencia.",
        philosopher: "Duns Escoto",
        application: "Reconoce que compartes la misma chispa de existencia con todo lo que te rodea. Fomenta la conexión.",
        prompt: "Mira a un extraño hoy. Intenta sentir que ambos comparten la misma cualidad fundamental de existir."
    },
    {
        title: "Proporción de Creencia",
        category: "ETICA",
        quote: "El hombre sabio proporciona su creencia a la evidencia.",
        philosopher: "David Hume",
        application: "No te dejes llevar por rumores o dogmas. Analiza los hechos y ajusta tu opinión a la realidad demostrable.",
        prompt: "¿En qué afirmación has creído hoy con demasiada fuerza sin tener pruebas reales?"
    },
    {
        title: "El Contrato Social",
        category: "ETICA",
        quote: "El hombre nace libre, pero por todas partes está encadenado.",
        philosopher: "Jean-Jacques Rousseau",
        application: "Reconoce que vivir en sociedad implica responsabilidades mutuas. Actúa buscando el bien común.",
        prompt: "¿Qué pequeña norma social has roto hoy (o querido romper) y cómo afectaría si todos hicieran lo mismo?"
    },
    {
        title: "Ser-en-el-mundo",
        category: "EXISTENCIALISMO",
        quote: "Ser hombre es estar en el mundo y estar preocupado por las cosas.",
        philosopher: "Martin Heidegger",
        application: "No eres un observador aislado; estás inmerso en tu realidad. Trata tu entorno con cuidado y presencia.",
        prompt: "¿Qué objeto o tarea de tu casa has ignorado hoy? Atiéndelo con total atención y cuidado."
    },
    {
        title: "Autenticidad Moderna",
        category: "EXISTENCIALISMO",
        quote: "Ser uno mismo en un mundo que intenta constantemente que seas otra cosa es el mayor logro.",
        philosopher: "Ralph Waldo Emerson",
        application: "Escucha tu voz interior por encima del ruido de las expectativas ajenas. Tu verdad es tu brújula.",
        prompt: "¿En qué momento de hoy has actuado 'para la galería' en lugar de ser fiel a ti mismo?"
    },
    {
        title: "Interseccionalidad",
        category: "CONTEMPORANEO",
        quote: "Nadie es una sola cosa. Somos muchas cosas entrelazadas.",
        philosopher: "Kimberlé Crenshaw",
        application: "Evita los juicios simples sobre las personas. Cada uno carga con múltiples capas de identidad y lucha.",
        prompt: "¿A quién has encasillado hoy en una sola etiqueta? Intenta imaginar tres capas más de su identidad."
    },
    {
        title: "Wu Wei (No-Acción)",
        category: "ORIENTAL",
        quote: "No luches. Fluye con el curso de las cosas.",
        philosopher: "Chuang Tse (Taoísmo)",
        application: "No fuerces los resultados. A veces, la mejor forma de resolver un problema es dejar que se asiente solo.",
        prompt: "¿Qué situación estás intentando forzar hoy sin éxito? Prueba a no hacer nada por unas horas y observa."
    },
    {
        title: "Karma (Causalidad)",
        category: "ORIENTAL",
        quote: "Lo que siembres, eso cosecharás.",
        philosopher: "Tradición Hindú",
        application: "Tus pensamientos y acciones de hoy son las semillas de tu futuro. Elige con intención.",
        prompt: "¿Qué 'semilla' de amabilidad o esfuerzo has plantado hoy que florecerá más adelante?"
    },
    {
        title: "Dharma (Propósito)",
        category: "ORIENTAL",
        quote: "Es mejor cumplir mal el propio deber que cumplir bien el ajeno.",
        philosopher: "Bhagavad Gita",
        application: "Encuentra tu camino único. No intentes ser la mejor versión de otra persona; mejora tu propio rol.",
        prompt: "¿A quién estás intentando imitar hoy en lugar de perfeccionar tu propia naturaleza?"
    },
    {
        title: "El Camino Medio",
        category: "ORIENTAL",
        quote: "Evita los extremos del placer vulgar y el sufrimiento inútil.",
        philosopher: "Buda",
        application: "Busca el equilibrio. Ni la austeridad total ni el exceso de indulgencia te darán claridad mental.",
        prompt: "¿En qué área de tu vida te has ido a un extremo hoy (trabajo, ocio, comida)? ¿Dónde estaría el centro?"
    },
    {
        title: "Anatman (No-Yo)",
        category: "ORIENTAL",
        quote: "Si te das cuenta de que todo cambia, no hay nada a lo que intentar aferrarse.",
        philosopher: "Lao Tsé / Filosofía Budista",
        application: "No te apegues a una imagen rígida de quién eres. Permítete evolucionar y dejar ir versiones pasadas.",
        prompt: "¿A qué idea de ti mismo ('soy tímido', 'soy malo en esto') te estás aferrando hoy que ya no es verdad?"
    },
    {
        title: "Principio de Razón Suficiente",
        category: "ETICA",
        quote: "Nada sucede sin que haya una razón por la cual deba ser así y no de otra manera.",
        philosopher: "Gottfried Leibniz",
        application: "Sé curioso. Todo lo que te pasa tiene una causa. En lugar de quejarte, investiga el porqué.",
        prompt: "¿Qué evento 'inexplicable' te ha ocurrido hoy? Busca tres posibles causas lógicas que lo expliquen."
    },
    {
        title: "Idealismo Trascendental",
        category: "ETICA",
        quote: "La ciencia es conocimiento organizado; la sabiduría es vida organizada.",
        philosopher: "Immanuel Kant",
        application: "Reconoce que tu mente filtra la realidad. No ves el mundo como es, sino como tú eres.",
        prompt: "¿Qué 'filtro' (de miedo, alegría o prejuicio) ha coloreado tu visión del mundo esta mañana?"
    },
    {
        title: "Grandeza del Alma",
        category: "ETICA",
        quote: "El hombre superior es el que es fiel a la esperanza de su juventud.",
        philosopher: "Friedrich Schiller",
        application: "Reconecta con tus ideales más nobles. No dejes que el cinismo de la edad adulta apague tu fuego interno.",
        prompt: "¿Qué ideal de cuando tenías 15 años has abandonado hoy? ¿Cómo podrías rescatar un poco de él?"
    },
    {
        title: "La Voluntad General",
        category: "ETICA",
        quote: "La obediencia a la ley que uno se ha prescrito es la libertad.",
        philosopher: "Jean-Jacques Rousseau",
        application: "La verdadera libertad no es hacer lo que quieras, sino seguir las reglas que tú mismo sabes que son justas.",
        prompt: "¿Qué regla personal te has puesto hoy and has cumplido con orgullo?"
    },
    {
        title: "Superhombre (Übermensch)",
        category: "EXISTENCIALISMO",
        quote: "El hombre es algo que debe ser superado.",
        philosopher: "Friedrich Nietzsche",
        application: "No te conformes con lo que eres ahora. Busca constantemente romper tus propios límites y valores heredados.",
        prompt: "¿En qué aspecto has sido 'demasiado humano' hoy (perezoso, miedoso) y cómo podrías superarlo mañana?"
    },
    {
        title: "Microfísica del Poder",
        category: "CONTEMPORANEO",
        quote: "El saber es el único espacio de libertad del ser.",
        philosopher: "Michel Foucault",
        application: "Cuestiona las pequeñas verdades que te imponen. Infórmate para no ser manipulado por el discurso dominante.",
        prompt: "¿Qué noticia o dato has aceptado hoy como verdad absoluta sin investigar su origen?"
    },
    {
        title: "Diferencia Humana",
        category: "CONTEMPORANEO",
        quote: "Lo que hace al hombre es su capacidad de decir NO.",
        philosopher: "Max Scheler",
        application: "Tu dignidad reside en tu capacidad de negarte a seguir impulsos ciegos o mandatos injustos. Usa tu NO.",
        prompt: "¿A qué le has dicho SÍ hoy que realmente querías decir NO?"
    },
    {
        title: "La Realidad Radical",
        category: "EXISTENCIALISMO",
        quote: "Vivir es la realidad radical; todas las demás realidades se dan dentro de ella.",
        philosopher: "José Ortega y Gasset",
        application: "No pierdas el tiempo en abstracciones si descuidas el hecho puro de estar vivo ahora mismo.",
        prompt: "Para un momento. Siente tu respiración y el peso de tu cuerpo. Esa es la única realidad que importa ahora."
    },
    {
        title: "Justicia como Imparcialidad",
        category: "ETICA",
        quote: "Nadie conoce su lugar en la sociedad; por eso la justicia debe ser ciega.",
        philosopher: "John Rawls",
        application: "Si vas a juzgar a alguien hoy, imagina que mañana podrías despertarte siendo esa persona. ¿Serías tan severo?",
        prompt: "¿A quién has criticado hoy? ¿Cómo cambiaría tu juicio si estuvieras en su situación exacta?"
    },
    {
        title: "Eros y Civilización",
        category: "CONTEMPORANEO",
        quote: "La cultura es el esfuerzo de los hombres por humanizar la naturaleza.",
        philosopher: "Herbert Marcuse",
        application: "Busca crear belleza y sentido en tu entorno, en lugar de solo consumir o destruir.",
        prompt: "¿Qué pequeño acto de 'humanización' o belleza has aportado hoy a tu lugar de trabajo o casa?"
    },
    {
        title: "El Compromiso",
        category: "EXISTENCIALISMO",
        quote: "No se es hombre sino por el compromiso que se asume.",
        philosopher: "Jean-Paul Sartre",
        application: "Tus palabras no valen nada si no están respaldadas por una acción que te vincule a una causa.",
        prompt: "¿Con qué causa o persona te has comprometido hoy de verdad, más allá de las palabras?"
    },
    {
        title: "Fenomenología del Cuerpo",
        category: "EXISTENCIALISMO",
        quote: "Yo no tengo un cuerpo, yo SOY mi cuerpo.",
        philosopher: "Maurice Merleau-Ponty",
        application: "Cuida tu salud física no como una herramienta, sino como la base misma de tu existencia y percepción.",
        prompt: "¿Qué mensaje te ha enviado tu cuerpo hoy (cansancio, hambre, tensión) que has decidido ignorar?"
    },
    {
        title: "La Sociedad del Espectáculo",
        category: "CONTEMPORANEO",
        quote: "Todo lo que antes se vivía directamente, ahora se representa.",
        philosopher: "Guy Debord",
        application: "Deja de mirar tu vida a través de una pantalla. Vive experiencias que no necesites publicar para que sean reales.",
        prompt: "¿Qué momento de hoy ha sido solo para ti, sin fotos ni testigos digitales?"
    },
    {
        title: "Ética del Cuidado",
        category: "ETICA",
        quote: "La responsabilidad hacia el otro es el núcleo de la moralidad.",
        philosopher: "Carol Gilligan",
        application: "No te limites a seguir reglas frías. Busca el bienestar real de las personas que dependen de ti.",
        prompt: "¿A quién has cuidado hoy con empatía real, más allá de tu 'obligación'?"
    },
    {
        title: "Deconstrucción",
        category: "CONTEMPORANEO",
        quote: "No hay nada fuera del texto.",
        philosopher: "Jacques Derrida",
        application: "Cuestiona los binarios (bueno/malo, éxito/fracaso). La verdad suele estar en los matices olvidados.",
        prompt: "¿Qué situación de hoy has visto como un 'blanco o negro' cuando en realidad es un gris complejo?"
    },
    {
        title: "Racionalismo Crítico",
        category: "ETICA",
        quote: "Nuestra meta debe ser el error, para detectarlo y eliminarlo.",
        philosopher: "Karl Popper",
        application: "No busques tener razón; busca estar equivocado lo antes posible para aprender la verdad.",
        prompt: "¿Qué idea tuya ha sido desafiada hoy? ¿Has defendido tu ego o has buscado la verdad?"
    },
    {
        title: "La Vida Activa",
        category: "CONTEMPORANEO",
        quote: "La pluralidad es la condición de la acción humana.",
        philosopher: "Hannah Arendt",
        application: "Participa. Habla. Actúa en el espacio público. Tu voz es necesaria para que el mundo sea humano.",
        prompt: "¿En qué conversación importante has guardado silencio hoy pudiendo haber aportado valor?"
    },
    {
        title: "Autenticidad contra la Falsedad",
        category: "EXISTENCIALISMO",
        quote: "Está lleno de gente falsa... y todo lo que haces es estudiar para ser lo suficientemente listo como para poder comprarte un Cadillac algún día.",
        philosopher: "Holden Caulfield (J.D. Salinger)",
        application: "Identifica qué partes de tu rutina haces solo por estatus o 'apariencia'. Busca lo que es genuino para ti.",
        prompt: "¿Qué acción has realizado hoy solo para 'encajar' o impresionar a otros en lugar de ser fiel a ti mismo?"
    },
    {
        title: "El Guardián en el Centeno",
        category: "EXISTENCIALISMO",
        quote: "Mi misión es atrapar a los niños si se acercan demasiado al precipicio.",
        philosopher: "El Guardián entre el Centeno (J.D. Salinger)",
        application: "Protege la curiosidad y la inocencia, tanto en los demás como en tu propio 'niño interior'. No dejes que el cinismo te ciegue.",
        prompt: "¿Qué pequeña alegría o curiosidad genuina has sentido hoy que un adulto 'serio' habría ignorado?"
    },
    {
        title: "Soledad Existencial",
        category: "EXISTENCIALISMO",
        quote: "Me sentía tan abandonado y tan solo... Me gustaría que alguien me hablara de verdad.",
        philosopher: "Holden Caulfield (J.D. Salinger)",
        application: "Reconoce que la soledad es parte de la condición humana, pero la cura es la comunicación honesta, no la superficial.",
        prompt: "¿Con quién podrías tener hoy una conversación 'de verdad', sin máscaras ni temas triviales?"
    },
    {
        title: "Ubuntu",
        category: "ORIENTAL",
        quote: "Una persona es persona a través de otras personas.",
        philosopher: "Filosofía Africana (Proverbio Zulú)",
        application: "Tu humanidad está entrelazada con la de los demás. No existes en aislamiento; tu bienestar depende del bienestar colectivo.",
        prompt: "¿Cómo has contribuido hoy al bienestar de tu comunidad, aunque sea con un gesto pequeño?"
    },
    {
        title: "Sankofa",
        category: "ORIENTAL",
        quote: "No es tabú volver atrás por lo que olvidaste.",
        philosopher: "Filosofía Akan (Ghana)",
        application: "Aprender del pasado no es retroceder, es sabiduría. Recupera las lecciones olvidadas para avanzar mejor.",
        prompt: "¿Qué lección de tu pasado has olvidado que podría ayudarte a resolver un problema actual?"
    },
    {
        title: "Filosofía de la Liberación",
        category: "CONTEMPORANEO",
        quote: "La filosofía debe partir desde el oprimido, no desde el opresor.",
        philosopher: "Enrique Dussel",
        application: "Cuestiona las estructuras de poder. Escucha las voces marginadas antes de formar tu opinión sobre justicia.",
        prompt: "¿A qué voz silenciada o marginada podrías escuchar hoy para entender mejor una situación?"
    },
    {
        title: "Conciencia Mestiza",
        category: "CONTEMPORANEO",
        quote: "Vivir en las fronteras significa que desarrollas una tolerancia a las contradicciones.",
        philosopher: "Gloria Anzaldúa",
        application: "Si vives entre dos culturas o identidades, tu perspectiva única es una fortaleza, no una debilidad.",
        prompt: "¿Qué contradicción o dualidad en tu identidad has visto hoy como problema en lugar de como riqueza?"
    },
    {
        title: "Epistemología del Sur",
        category: "CONTEMPORANEO",
        quote: "Hay conocimientos que han sido suprimidos por el colonialismo.",
        philosopher: "Boaventura de Sousa Santos",
        application: "No todo conocimiento válido viene de Occidente. Busca sabiduría en tradiciones no europeas.",
        prompt: "¿Qué conocimiento o práctica de una cultura no occidental has descartado hoy sin investigar?"
    },
    {
        title: "Performatividad de Género",
        category: "CONTEMPORANEO",
        quote: "El género es un acto repetido, no una esencia.",
        philosopher: "Judith Butler",
        application: "No 'eres' hombre o mujer por naturaleza; lo 'actúas' mediante gestos culturales. Puedes redefinirlo.",
        prompt: "¿Qué comportamiento has realizado hoy solo porque 'se espera' de tu género?"
    },
    {
        title: "Ética del Cuidado Feminista",
        category: "CONTEMPORANEO",
        quote: "La moralidad no es solo justicia abstracta, sino cuidado concreto.",
        philosopher: "Nel Noddings",
        application: "No basta con ser 'justo'; debes cuidar activamente de quienes dependen de ti con empatía real.",
        prompt: "¿A quién has cuidado hoy más allá de tu 'deber', con genuina atención a sus necesidades?"
    },
    {
        title: "Interseccionalidad Ampliada",
        category: "CONTEMPORANEO",
        quote: "Las opresiones no son aditivas, son multiplicativas.",
        philosopher: "Kimberlé Crenshaw",
        application: "Una mujer negra no sufre racismo + sexismo, sino una opresión única. Reconoce la complejidad de las identidades.",
        prompt: "¿A quién has juzgado hoy sin considerar las múltiples capas de su experiencia?"
    },
    {
        title: "Juegos del Lenguaje",
        category: "CONTEMPORANEO",
        quote: "El significado de una palabra es su uso en el lenguaje.",
        philosopher: "Ludwig Wittgenstein",
        application: "Las palabras no tienen significados fijos. Entiende el contexto antes de juzgar lo que alguien dice.",
        prompt: "¿Qué palabra has malinterpretado hoy por no entender el 'juego de lenguaje' del otro?"
    },
    {
        title: "Descripción Definida",
        category: "CONTEMPORANEO",
        quote: "El actual rey de Francia es calvo.",
        philosopher: "Bertrand Russell",
        application: "Algunas afirmaciones son falsas no por su predicado, sino porque su sujeto no existe. Cuestiona las presuposiciones.",
        prompt: "¿Qué pregunta te han hecho hoy que asumía algo falso desde el principio?"
    },
    {
        title: "Verificacionismo",
        category: "ETICA",
        quote: "Una proposición solo tiene sentido si puede ser verificada empíricamente.",
        philosopher: "Círculo de Viena",
        application: "Si una afirmación no puede probarse ni refutarse, quizás no vale la pena discutirla.",
        prompt: "¿Sobre qué tema has debatido hoy que en realidad no puede verificarse de ninguna manera?"
    },
    {
        title: "Ecología Profunda",
        category: "CONTEMPORANEO",
        quote: "Todos los seres vivos tienen el mismo derecho a vivir y florecer.",
        philosopher: "Arne Næss",
        application: "La naturaleza no es un recurso para humanos; tiene valor intrínseco. Actúa en consecuencia.",
        prompt: "¿Qué decisión de consumo has tomado hoy sin considerar su impacto en otros seres vivos?"
    },
    {
        title: "Principio de Precaución",
        category: "ETICA",
        quote: "Ante la duda sobre el daño, mejor prevenir que lamentar.",
        philosopher: "Hans Jonas",
        application: "Si una acción podría causar daño irreversible (clima, tecnología), no esperes certeza absoluta para actuar.",
        prompt: "¿Qué riesgo has ignorado hoy porque 'no hay pruebas definitivas' de su peligro?"
    },
    {
        title: "Responsabilidad hacia el Futuro",
        category: "ETICA",
        quote: "Obra de tal modo que los efectos de tu acción sean compatibles con la permanencia de la vida humana.",
        philosopher: "Hans Jonas",
        application: "Tus decisiones de hoy afectan a generaciones futuras. Piensa a largo plazo.",
        prompt: "¿Qué acción has tomado hoy pensando solo en el presente, ignorando el futuro?"
    },
    {
        title: "Banalidad del Mal",
        category: "CONTEMPORANEO",
        quote: "Los mayores males son cometidos por gente ordinaria que solo 'cumple órdenes'.",
        philosopher: "Hannah Arendt",
        application: "No hace falta ser un monstruo para hacer daño. La obediencia ciega es peligrosa.",
        prompt: "¿Qué has hecho hoy 'porque te lo dijeron' sin cuestionar si era lo correcto?"
    },
    {
        title: "Pensamiento sin Barandillas",
        category: "CONTEMPORANEO",
        quote: "Pensar sin el apoyo de categorías tradicionales es peligroso pero necesario.",
        philosopher: "Hannah Arendt",
        application: "No te aferres a ideologías heredadas. Atrévete a pensar por ti mismo, aunque sea incómodo.",
        prompt: "¿Qué creencia política o religiosa has defendido hoy sin haberla examinado realmente?"
    },
    {
        title: "Razón Instrumental",
        category: "CONTEMPORANEO",
        quote: "La racionalidad moderna solo busca medios, no fines.",
        philosopher: "Max Horkheimer",
        application: "Ser 'eficiente' no es suficiente. Pregúntate si tus objetivos son valiosos, no solo si tus métodos funcionan.",
        prompt: "¿Qué tarea has optimizado hoy sin preguntarte si valía la pena hacerla?"
    },
    {
        title: "Industria Cultural",
        category: "CONTEMPORANEO",
        quote: "El entretenimiento masivo no libera, adormece.",
        philosopher: "Theodor Adorno",
        application: "El consumo pasivo de contenido te distrae de pensar críticamente. Elige tus estímulos con cuidado.",
        prompt: "¿Cuántas horas has pasado hoy consumiendo contenido sin reflexionar sobre él?"
    },
    {
        title: "Reconocimiento Mutuo",
        category: "CONTEMPORANEO",
        quote: "Solo soy libre si el otro también lo es.",
        philosopher: "Axel Honneth",
        application: "Tu dignidad depende de que otros te reconozcan. Devuelve ese reconocimiento a los demás.",
        prompt: "¿A quién has negado hoy reconocimiento o respeto, aunque sea sutilmente?"
    },
    {
        title: "Vulnerabilidad Compartida",
        category: "CONTEMPORANEO",
        quote: "Todos somos precarios y dependientes. Esa es nuestra condición común.",
        philosopher: "Judith Butler",
        application: "Reconocer tu fragilidad no es debilidad; es la base de la empatía y la solidaridad.",
        prompt: "¿Qué vulnerabilidad tuya has ocultado hoy por miedo a parecer débil?"
    },
    {
        title: "Necropolítica",
        category: "CONTEMPORANEO",
        quote: "El poder soberano decide quién vive y quién muere.",
        philosopher: "Achille Mbembe",
        application: "Observa cómo las estructuras políticas valoran unas vidas más que otras. Resiste esa lógica.",
        prompt: "¿Qué noticia de muerte has ignorado hoy porque la víctima no era de 'tu grupo'?"
    },
    {
        title: "Capitalismo de Vigilancia",
        category: "CONTEMPORANEO",
        quote: "Tu comportamiento es el producto que se vende.",
        philosopher: "Shoshana Zuboff",
        application: "Cada clic, like y búsqueda alimenta algoritmos que te manipulan. Sé consciente de tu huella digital.",
        prompt: "¿Qué dato personal has entregado hoy a cambio de 'conveniencia' sin pensar en las consecuencias?"
    },
    {
        title: "Aceleracionismo",
        category: "CONTEMPORANEO",
        quote: "Quizás debemos acelerar el colapso del sistema para construir algo nuevo.",
        philosopher: "Nick Land / Mark Fisher",
        application: "A veces, intentar 'arreglar' un sistema roto solo prolonga el sufrimiento. Considera alternativas radicales.",
        prompt: "¿Qué sistema o hábito en tu vida estás 'parcheando' en lugar de reemplazar completamente?"
    },
    {
        title: "Realismo Capitalista",
        category: "CONTEMPORANEO",
        quote: "Es más fácil imaginar el fin del mundo que el fin del capitalismo.",
        philosopher: "Mark Fisher",
        application: "No dejes que la falta de imaginación te impida pensar en alternativas al statu quo.",
        prompt: "¿Qué problema has aceptado hoy como 'inevitable' cuando en realidad es producto de un sistema específico?"
    },
    {
        title: "Falsacionismo",
        category: "EPISTEMOLOGIA",
        quote: "No podemos probar que una teoría sea verdadera, solo que aún no ha sido refutada.",
        philosopher: "Karl Popper",
        application: "No busques confirmar lo que ya crees. Busca activamente pruebas que te contradigan para fortalecer tu verdad.",
        prompt: "¿Qué creencia tienes que te asusta poner a prueba? Intenta refutarla hoy."
    },
    {
        title: "Cambio de Paradigma",
        category: "EPISTEMOLOGIA",
        quote: "La ciencia no avanza por acumulación, sino por revoluciones que cambian la forma de ver el mundo.",
        philosopher: "Thomas Kuhn",
        application: "A veces no necesitas más datos, sino cambiar radicalmente la forma en que interpretas los datos que ya tienes.",
        prompt: "¿Qué problema persiste en tu vida porque lo sigues atacando desde el mismo ángulo (paradigma)?"
    },
    {
        title: "Ídolos de la Tribu",
        category: "EPISTEMOLOGIA",
        quote: "El entendimiento humano no es luz seca, sino que recibe infusión de la voluntad y los afectos.",
        philosopher: "Francis Bacon",
        application: "Reconoce que tus deseos deforman tu percepción. Tiendes a ver lo que quieres ver.",
        prompt: "¿Qué verdad incómoda estás ignorando hoy porque no te 'conviene' emocionalmente?"
    },
    {
        title: "El Leviatán",
        category: "POLITICA",
        quote: "La vida del hombre en estado natural es solitaria, pobre, desagradable, brutal y corta.",
        philosopher: "Thomas Hobbes",
        application: "Valorar el orden y la seguridad social implica ceder parte de nuestra libertad absoluta. Es un contrato necesario.",
        prompt: "¿Qué norma social te molesta cumplir pero reconoces que es necesaria para la paz común?"
    },
    {
        title: "Alienación del Trabajo",
        category: "POLITICA",
        quote: "El trabajador se vuelve más pobre cuanto más riqueza produce.",
        philosopher: "Karl Marx",
        application: "Cuando trabajas sin ver el fruto final ni el propósito, te desconectas de ti mismo. Busca sentido en tu labor.",
        prompt: "¿En qué tarea te has sentido hoy como una máquina sin alma? ¿Cómo podrías reconectar con su propósito humano?"
    },
    {
        title: "Velo de Maya",
        category: "EPISTEMOLOGIA",
        quote: "El mundo tal como lo vemos es una ilusión que oculta la unidad subyacente de la realidad.",
        philosopher: "Filosofía Hindú (Advaita Vedanta)",
        application: "No te tomes las apariencias del mundo (fama, dinero, separación) demasiado en serio. Son un juego de sombras.",
        prompt: "¿Qué 'drama' superficial te ha atrapado hoy? Intenta ver más allá de la ilusión de separación."
    },
    {
        title: "La Banalidad del Mal",
        category: "POLITICA",
        quote: "El mal no necesita ser monstruoso; solo necesita que la gente normal deje de pensar.",
        philosopher: "Hannah Arendt",
        application: "El peligro político no son solo los tiranos, sino la obediencia irreflexiva de los ciudadanos comunes.",
        prompt: "¿En qué momento has seguido la corriente hoy sin cuestionar si era ético?"
    },
    {
        title: "Biopolítica",
        category: "POLITICA",
        quote: "El poder ya no decide solo la muerte, sino que administra y controla la vida misma.",
        philosopher: "Michel Foucault",
        application: "Sé consciente de cómo el Estado y las empresas gestionan tu salud, cuerpo y hábitos como recursos productivos.",
        prompt: "¿Qué decisión sobre tu salud o cuerpo has tomado hoy influenciado por campañas políticas o comerciales?"
    },
    {
        title: "Justicia Distributiva",
        category: "POLITICA",
        quote: "La injusticia en cualquier lugar es una amenaza para la justicia en todas partes.",
        philosopher: "Martin Luther King / Rawls",
        application: "La verdadera paz no es la ausencia de tensión, sino la presencia de justicia. Lucha por la equidad real.",
        prompt: "¿En qué situación has aceptado una desigualdad injusta hoy porque no te afectaba directamente?"
    },
    {
        title: "Escepticismo Radical",
        category: "EPISTEMOLOGIA",
        quote: "Acepto que no sé si estoy soñando o despierto, pero decido investigar igualmente.",
        philosopher: "Pirrón de Elis",
        application: "Suspende el juicio (Epoché). No necesitas tener una opinión firme sobre todo instantáneamente. La duda trae paz.",
        prompt: "¿Sobre qué tema has opinado hoy con certeza absoluta? ¿Podrías permitirte decir 'no lo sé'?"
    },
    {
        title: "Sympatheia",
        category: "ESTOICISMO",
        quote: "Todas las cosas están entrelazadas entre sí y su vínculo es sagrado.",
        philosopher: "Marco Aurelio",
        application: "No eres una isla. Tus acciones reverberan en el todo. Actúa sabiendo que eres parte de un organismo mayor.",
        prompt: "¿Cómo ha afectado tu estado de ánimo de hoy a las personas que te rodean?"
    },
    {
        title: "Prosoché (Atención)",
        category: "ESTOICISMO",
        quote: "La atención es la vigilia fundamental del alma.",
        philosopher: "Epicteto",
        application: "Vive en guardia constante sobre tus pensamientos. No dejes que ninguna impresión entre en tu mente sin examen.",
        prompt: "¿En qué momento de hoy has vivido en 'piloto automático' y has perdido el control de tu mente?"
    },
    {
        title: "Salto de Fe",
        category: "EXISTENCIALISMO",
        quote: "La fe comienza precisamente allí donde termina la razón.",
        philosopher: "Søren Kierkegaard",
        application: "A veces, la lógica no basta para dar sentido a la vida. Hay decisiones que requieren un salto apasionado hacia lo desconocido.",
        prompt: "¿Qué decisión irracional pero vital sientes que debes tomar, aunque no tengas garantías?"
    },
    {
        title: "La Náusea",
        category: "EXISTENCIALISMO",
        quote: "La existencia es plenitud que el hombre no puede abandonar.",
        philosopher: "Jean-Paul Sartre",
        application: "Sentir el peso absurdo de existir es el primer paso para despertar. No huyas de esa angustia; úsala para crear.",
        prompt: "¿Has sentido hoy el vacío o el absurdo de la rutina? No lo tapes con distracción; obsérvalo."
    },
    {
        title: "Hermenéutica",
        category: "EPISTEMOLOGIA",
        quote: "No hay hechos, solo interpretaciones.",
        philosopher: "Friedrich Nietzsche / Gadamer",
        application: "Todo lo que entiendes pasa por el filtro de tu historia y cultura. Sé humilde con tu 'verdad'.",
        prompt: "Revisa una discusión reciente. ¿Cuánto era 'hecho' y cuánto era tu 'interpretación' sesgada?"
    }
];

const experiments = [
    {
        title: "El Barco de Teseo",
        question: "Si reemplazas cada pieza de un barco, una por una, hasta que no quede ninguna pieza original... ¿sigue siendo el mismo barco?",
        options: [
            { text: "Sí, sigue siendo la misma esencia", type: "essence" },
            { text: "No, es un objeto físicamente distinto", type: "matter" },
            { text: "Depende de la perspectiva", type: "both" }
        ],
        reflection: "Este dilema cuestiona la identidad. ¿Qué nos hace ser quiénes somos? ¿Nuestra esencia o nuestra materia?",
        application: "Tus células se renuevan constantemente. ¿Eres la misma persona que hace 10 años?"
    },
    {
        title: "El Dilema del Tranvía",
        question: "Un tranvía va sin frenos hacia cinco personas. Puedes accionar una palanca para desviarlo a otra vía donde solo hay una persona. ¿Qué haces?",
        options: [
            { text: "Accionar la palanca (Utilitarismo)", type: "util" },
            { text: "No hacer nada (Deontología)", type: "deon" },
            { text: "Buscar una tercera opción", type: "other" }
        ],
        reflection: "Contrapone el 'mayor bien para el mayor número' contra el deber moral de no causar daño directo.",
        application: "En tu vida, ¿justificas a veces pequeñas mentiras o daños si el resultado final parece 'mejor'?"
    },
    {
        title: "La Máquina de Experiencias",
        question: "Una máquina puede darte cualquier experiencia placentera que desees, indistinguible de la realidad. ¿Te conectarías para siempre?",
        options: [
            { text: "Sí, la felicidad es lo único que importa", type: "hedon" },
            { text: "No, prefiero la realidad cruda", type: "real" },
            { text: "Solo por periodos cortos", type: "mixed" }
        ],
        reflection: "¿Es la felicidad subjetiva suficiente, o hay un valor intrínseco en lo que es 'real' aunque duela?",
        application: "¿Cuánto de tu tiempo pasas en 'simulaciones' (redes sociales, series) buscando placer vacío?"
    },
    {
        title: "El Cuarto de María",
        question: "María sabe todo sobre la física del color pero vive en una habitación blanco y negro. Si sale y ve un rojo por primera vez, ¿aprende algo nuevo?",
        options: [
            { text: "Sí, aprende la experiencia subjetiva", type: "qualia" },
            { text: "No, ya sabía toda la teoría", type: "phys" },
            { text: "Lo que aprende no es 'conocimiento'", type: "info" }
        ],
        reflection: "Explora si la consciencia y los sentimientos pueden explicarse solo con ciencia física.",
        application: "¿Te detienes a 'sentir' tus vivencias o solo recolectas información sobre lo que te pasa?"
    },
    {
        title: "El Gato de Schrödinger",
        question: "En una caja cerrada, un proceso cuántico determina si un gato vive o muere. Hasta que abres la caja, ¿está el gato 'vivo y muerto' a la vez?",
        options: [
            { text: "Sí, en superposición cuántica", type: "quant" },
            { text: "No, el gato sabe si está vivo", type: "classic" },
            { text: "Es una metáfora absurda", type: "logical" }
        ],
        reflection: "Cuestiona cómo nuestra observación afecta la realidad que intentamos medir.",
        application: "¿Cuántas oportunidades 'mueren' en tu vida simplemente porque tienes miedo de '開 abrir la caja' y mirar?"
    },
    {
        title: "Cerebros en cubetas",
        question: "Si fueras un cerebro en una cubeta conectado a una simulación perfecta... ¿cómo podrías demostrar que tu mundo es real?",
        options: [
            { text: "No hay forma de saberlo", type: "skeptic" },
            { text: "La lógica interna basta como realidad", type: "logic" },
            { text: "Siento, luego existo", type: "body" }
        ],
        reflection: "Pone en duda la fiabilidad de nuestros sentidos y la base de todo nuestro conocimiento.",
        application: "¿Confías ciegamente en tus percepciones o cuestionas de vez en cuando tus propios prejuicios?"
    },
    {
        title: "El Monstruo de la Utilidad",
        question: "Si existiera un ser que siente un placer mil veces mayor que el nuestro, ¿deberíamos darle todo a él aunque nosotros suframos?",
        options: [
            { text: "Sí, maximiza la felicidad total", type: "pureutil" },
            { text: "No, la igualdad es superior", type: "egal" },
            { text: "Depende de quién sea el ser", type: "bias" }
        ],
        reflection: "Es una crítica al utilitarismo extremo: ¿vale más la suma total de placer que la justicia individual?",
        application: "¿A quién le estás dando 'toda tu energía' hoy? ¿Es justo para ti ese reparto?"
    },
    {
        title: "El Pantano (Swampman)",
        question: "Un rayo te desintegra y otro crea un duplicado idéntico de ti en un pantano. ¿Ese duplicado ES tú?",
        options: [
            { text: "Sí, si tiene mis recuerdos", type: "func" },
            { text: "No, le falta mi historia causal", type: "hist" },
            { text: "Solo es una copia perfecta", type: "copy" }
        ],
        reflection: "¿Somos el resultado de nuestra estructura actual o de nuestra historia y origen?",
        application: "¿Te define lo que eres hoy o la carga de todo tu pasado?"
    },
    {
        title: "El Velo de la Ignorancia",
        question: "¿Qué reglas pondrías en una sociedad si no supieras si te va a tocar ser rico, pobre, sano o enfermo?",
        options: [
            { text: "Máxima protección para el débil", type: "rawls" },
            { text: "Libertad total de competencia", type: "lib" },
            { text: "Una mezcla equilibrada", type: "cent" }
        ],
        reflection: "La verdadera justicia nace cuando eliminamos nuestro propio interés del juicio.",
        application: "Cuando juzgas a alguien, ¿lo haces con tu 'velo' puesto o desde tu posición de privilegio?"
    },
    {
        title: "La Apuesta de Pascal",
        question: "Si no puedes saber si Dios existe, es más racional creer: si ganas, ganas el cielo; si pierdes, no pierdes nada.",
        options: [
            { text: "Es un cálculo inteligente", type: "game" },
            { text: "Dios sabría que es por interés", type: "insin" },
            { text: "No se puede forzar la creencia", type: "authen" }
        ],
        reflection: "¿Es la fe algo que se puede elegir por conveniencia o debe ser un sentimiento genuino?",
        application: "¿Qué cosas haces 'por si acaso' aunque no creas en ellas de corazón?"
    }
];

const paradoxes = [
    {
        title: "El Barbero de Russell",
        preview: "¿Quién afeita al hombre que solo afeita a los que no se afeitan a sí mismos?",
        explanation: "Si el barbero se afeita a sí mismo, rompe su regla de solo afeitar a los que no lo hacen. Si no se afeita, la regla le obliga a afeitarse. Es una contradicción lógica pura.",
        reflection: "Esta paradoja destruyó la teoría de conjuntos clásica y nos obliga a cuestionar cómo definimos las categorías y las reglas en un sistema.",
        application: "Cuidado con las reglas absolutas. A veces, el sistema que creamos para organizar la realidad es el que genera el caos."
    },
    {
        title: "Aquiles y la Tortuga",
        preview: "El corredor más rápido del mundo nunca alcanzará a una tortuga lenta.",
        explanation: "Para alcanzarla, Aquiles debe llegar a donde estaba la tortuga, pero para entonces ella se habrá movido un poco más. Este ciclo de distancias infinitesimales sugiere que el movimiento es imposible.",
        reflection: "Nos enfrenta al concepto del infinito y a la división del espacio-tiempo. ¿Es la realidad continua o discreta?",
        application: "A veces, obsesionarse con los pasos intermedios te impide ver que ya has llegado a tu meta. No dejes que el análisis infinito te detenga."
    },
    {
        title: "La Paradoja de Sorites",
        preview: "¿Cuántos granos de arena hacen falta para formar un 'montón'?",
        explanation: "Un grano no es un montón. Añadir uno más tampoco lo convierte en montón. Si sigues así, un millón de granos no serían un montón, lo cual es absurdo.",
        reflection: "Muestra la vaguedad del lenguaje. No existen fronteras nítidas en conceptos como 'rico', 'calvo' o 'justo'.",
        application: "¿Cuándo un pequeño hábito se convierte en 'quién eres'? Los cambios son invisibles grano a grano, pero definitivos en conjunto."
    },
    {
        title: "La Paradoja de Epicuro",
        preview: "Si Dios es todo bondad y todo poder, ¿por qué existe el mal?",
        explanation: "Si quiere evitar el mal pero no puede, es impotente. Si puede pero no quiere, es malévolo. Si sabe, quiere y puede, ¿de dónde sale el mal?",
        reflection: "Es el dilema central de la fe y la ética. Cuestiona la naturaleza del sufrimiento y la libertad humana.",
        application: "No busques culpables externos para el 'mal' de tu vida; entiende que el caos y la libertad son dos caras de la misma moneda."
    },
    {
        title: "El Barco de Teseo",
        preview: "Si cambias todas las piezas de un barco... ¿sigue siendo el mismo?",
        explanation: "Cada tabla se pudre y se cambia. Al final, no queda nada original. ¿Es la identidad la materia o la forma?",
        reflection: "Nuestras células cambian cada 7 años. No eres la misma materia que ayer, pero quizás sí el mismo 'proceso'.",
        application: "Puedes reinventarte completamente. No eres tus piezas del pasado, eres la dirección en la que navegas hoy."
    },
    {
        title: "El Examen Sorpresa",
        preview: "Un examen que ocurrirá la próxima semana pero no sabrás qué día hasta que llegue.",
        explanation: "Si no ha ocurrido el jueves, sabes que será el viernes (ya no es sorpresa). Si descartas el viernes, haces lo mismo con el jueves... la lógica dice que es imposible, pero el miércoles llega y te sorprende.",
        reflection: "Muestra los límites de la predicción lógica frente a la incertidumbre de la realidad vivida.",
        application: "Aceptar que no puedes predecir todo por pura lógica te permite estar más preparado para lo inesperado."
    },
    {
        title: "El Asno de Buridán",
        preview: "Un asno muere de hambre entre dos montones de heno idénticos.",
        explanation: "Al no tener una razón racional para elegir uno sobre el otro, el asno se queda paralizado hasta morir.",
        reflection: "La racionalidad perfecta puede llevar a la parálisis. A veces elegir 'al azar' es más racional que no elegir.",
        application: "Si tienes dos opciones igual de buenas, deja de analizar. ¡Lanza una moneda y muévete!"
    },
    {
        title: "El Hotel de Hilbert",
        preview: "Un hotel infinito lleno que siempre puede alojar a un huésped más.",
        explanation: "Si llega alguien nuevo, todos se mueven una habitación (n+1) y la primera queda libre. El infinito no se comporta como los números normales.",
        reflection: "Desafía nuestra intuición sobre el espacio y la abundancia. Siempre hay sitio para uno más en un corazón infinito.",
        application: "Tu capacidad de aprender y amar no tiene límites físicos. Nunca estás 'lleno' de conocimiento o afecto."
    },
    {
        title: "La Paradoja de Fermi",
        preview: "¿Dónde está todo el mundo? Si el universo es tan grande, ¿por qué hay silencio?",
        explanation: "Hay miles de millones de estrellas parecidas al Sol. Estadísticamente debería haber vida por todas partes, pero no vemos nada.",
        reflection: "Nos obliga a valorar nuestra propia existencia como algo increíblemente raro o peligrosamente ignorante.",
        application: "Valora tu voz. En el silencio del universo, lo que digas y hagas hoy es lo único que resuena."
    },
    {
        title: "La Paradoja de Diderot",
        preview: "La paradoja de la comedia: para ser un gran actor, no debes sentir lo que actúas.",
        explanation: "Diderot argumentaba que si un actor sintiera realmente la emoción, no podría controlarla noche tras noche. La verdad escénica nace de la falta de sensibilidad real.",
        reflection: "Nos hace pensar en la autenticidad. ¿Es más real el que siente o el que domina la expresión de lo que siente?",
        application: "A veces, para comunicar bien tus emociones o liderar, debes tomar distancia de ellas, no ahogarte en ellas."
    }
];
