/**
 * Traducciones de Conceptos - Español a Portugués
 * Diccionario que mapea titles en español a sus equivalentes en portugués
 */

const CONCEPT_TRANSLATIONS = {
    // ESTOICISM
    "Dicotomía del Control": "Dicotomia do Controle",
    "Ataraxia": "Ataraxia",
    "Amor Fati": "Amor Fati",
    "Memento Mori": "Memento Mori",
    "Apatheia": "Apateia",
    "Virtus como Único Bien": "Virtude como Único Bem",
    "Naturaleza Racional": "Natureza Racional",
    "Cosmopolitismo": "Cosmopolitismo",
    "Premeditatio Malorum": "Premeditatio Malorum",
    "Pasión vs. Pasividad": "Paixão vs. Passividade",

    // EXISTENTIALISM
    "Existencia precede Esencia": "Existência Precede Essência",
    "Mala Fe": "Má Fé",
    "Absurdo": "Absurdo",
    "Simone Weil y el Compromiso": "Simone Weil e o Compromisso",
    "Angustia Existencial": "Angústia Existencial",
    "Autenticidad vs. Masa": "Autenticidade vs. Massa",
    "Nada y Ser": "Nada e Ser",
    "Proyecto de Vida": "Projeto de Vida",

    // EPICUREANISM
    "Placer como Bien Supremo": "Prazer como Bem Supremo",
    "Ascetismo Refinado": "Ascetismo Refinado",
    "Amistad": "Amizade",

    // ORIENTAL PHILOSOPHY
    "Wu Wei": "Wu Wei",
    "Yin y Yang": "Yin e Yang",
    "Karma": "Karma",
    "Vacío Luminoso": "Vazio Luminoso",
    "Nirvana": "Nirvana",
    "Cuatro Nobles Verdades": "Quatro Nobres Verdades",
    "Mindfullness (Conciencia Plena)": "Atenção Plena (Mindfulness)",
    "El Tao que Puede Nombrarse": "O Tao que Pode Ser Nomeado",
    "Retorno (Recurrencia)": "Retorno (Recorrência)",

    // MEDIEVAL PHILOSOPHY
    "Tomás de Aquino: Ser y Esencia": "Tomás de Aquino: Ser e Essência",
    "Voluntad Divina vs. Libre Albedrío": "Vontade Divina vs. Livre Arbítrio",
    "Universales": "Universais",

    // MODERN PHILOSOPHY
    "Duda Metódica": "Dúvida Metódica",
    "El Empirismo de Hume": "O Empirismo de Hume",
    "Crítica de la Razón Pura": "Crítica da Razão Pura",
    "Imperativo Categórico": "Imperativo Categórico",
    "Dialéctica Hegeliana": "Dialética Hegeliana",
    "Sociedad Civil (Rousseau)": "Sociedade Civil (Rousseau)",
    "Utilitarismo": "Utilitarismo",
    "Revolución Copernicana de Kant": "Revolução Copernicana de Kant",

    // CONTEMPORARY PHILOSOPHY
    "Fetichismo de la Mercancía": "Fetichismo da Mercadoria",
    "Volunta de Poder": "Vontade de Poder",
    "Transvaloración de los Valores": "Transvalorização de Todos os Valores",
    "Superhombre (Übermensch)": "Super-Homem (Übermensch)",
    "Poder-Saber (Foucault)": "Poder-Saber (Foucault)",
    "Biopoder": "Biopoder",
    "Habermas: Acción Comunicativa": "Habermas: Ação Comunicativa",
    "Différance (Derrida)": "Différance (Derrida)",
    "Pensamiento Débil": "Pensamento Fraco",
    "Pragmatismo": "Pragmatismo",

    // EPISTEMOLOGY
    "Problema de Gettier": "Problema de Gettier",
    "Navaja de Ockham": "Navalha de Ockham",
    "Falsacionismo": "Falseacionismo",
    "Paradigmas Científicos": "Paradigmas Científicos",
    "Sofismo de la Falsa Causa": "Sofismo da Falsa Causa",

    // ETHICS
    "Ética de la Virtud": "Ética da Virtude",
};

const CATEGORY_TRANSLATIONS = {
    "Estoicismo": "Estoicismo",
    "Epicureísmo": "Epicurismo",
    "Existencialismo": "Existencialismo",
    "Epistemología": "Epistemologia",
    "Ética": "Ética",
    "Política": "Política",
    "Oriental": "Oriental",
    "Medieval": "Medieval",
    "Racionalismo": "Racionalismo",
    "Empirismo": "Empirismo",
    "Idealismo": "Idealismo",
    "Pragmatismo": "Pragmatismo",
    "Fenomenología": "Fenomenologia",
    "Hermenéutica": "Hermenêutica",
    "Metafísica": "Metafísica"
};

const QUOTE_TRANSLATIONS = {
    // STOICISM
    "No podemos elegir nuestras circunstancias externas, pero siempre podemos elegir cómo responder a ellas.": "Não podemos escolher nossas circunstâncias externas, mas sempre podemos escolher como responder a elas.",
    "El límite de la magnitud de los placeres es la eliminación de todo dolor.": "O limite da magnitude dos prazeres é a eliminação de toda dor.",
    "Mi fórmula para la grandeza humana es el Amor Fati: no querer que nada sea distinto ni en el pasado ni en el futuro.": "Minha fórmula para a grandeza humana é o Amor Fati: não querer que nada seja diferente nem no passado nem no futuro.",
    "La muerte está aquí. Haz la paz con ella. La propia muerte entra en tu ecuación.": "A morte está aqui. Faça paz com ela. A própria morte entra em sua equação.",
    "El sabio no está libre de pasiones; las ha transcendido a través de la razón.": "O sábio não está livre de paixões; as transcendeu através da razão.",
    "La virtud es lo único que puede llamarse propiamente bien.": "A virtude é a única coisa que pode ser propriamente chamada de bem.",
    "Tu razón separada del instinto: este es tu poder único.": "Sua razão separada do instinto: este é seu poder único.",
    "Soy ciudadano del mundo, miembro de la comunidad humana universal.": "Sou cidadão do mundo, membro da comunidade humana universal.",
    "Antecipa los males para no ser sorprendido por ellos.": "Antecipe os males para não ser surpreendido por eles.",
    "La pasión es una opinión sobre lo que es bueno o malo.": "A paixão é uma opinião sobre o que é bom ou mau.",

    // EXISTENTIALISM
    "La existencia precede a la esencia.": "A existência precede a essência.",
    "El hombre está condenado a ser libre; porque una vez arrojado al mundo, es responsable de todo lo que hace.": "O homem está condenado a ser livre; porque uma vez lançado ao mundo, é responsável por tudo o que faz.",
    "Hay pero una cosa cardinal para el hombre: luchar contra lo que es absurdo.": "Há apenas uma coisa cardinal para o homem: lutar contra o que é absurdo.",
    "La única forma de ser verdadera es a través del compromiso radical.": "A única forma de ser verdadeira é através do compromisso radical.",
    "La angustia es la característica de la libertad humana.": "A angústia é a característica da liberdade humana.",
    "La masa es la negación del ser.": "A massa é a negação do ser.",
    "La nada está presente en el corazón del ser.": "O nada está presente no coração do ser.",
    "El hombre es un proyecto, está siempre proyectándose hacia adelante.": "O homem é um projeto, está sempre se projetando para frente.",

    // EPICUREANISM
    "El placer es el bien primero y natural.": "O prazer é o bem primeiro e natural.",
    "Cuando decimos que el placer es lo bueno, nos referimos a no padecer dolores corporales ni sufrimientos mentales.": "Quando dizemos que o prazer é o bem, nos referimos a não sofrer dores corporais nem sofrimentos mentais.",
    "La amistad baila por el mundo diciéndole a todo que la felicidad es posible.": "A amizade dança pelo mundo dizendo a tudo que a felicidade é possível.",

    // ORIENTAL PHILOSOPHY
    "La acción sin esfuerzo es la acción que es más efectiva.": "A ação sem esforço é a ação que é mais efetiva.",
    "En cada extremo existe la semilla de su opuesto.": "Em cada extremo existe a semente de seu oposto.",
    "Toda acción tiene consecuencias inevitables.": "Toda ação tem consequências inevitáveis.",
    "El vacío es plenitud; la plenitud es vacío.": "O vazio é plenitude; a plenitude é vazio.",
    "Nirvana es el cese del sufrimiento mediante la extinción del deseo.": "Nirvana é a cessação do sofrimento mediante a extinção do desejo.",
    "Existe el sufrimiento, su causa, su cese y el camino hacia el cese.": "Existe o sofrimento, sua causa, sua cessação e o caminho para a cessação.",
    "La plena conciencia es el camino a lo Inmortal; la negligencia es el camino a la muerte.": "A plena consciência é o caminho para o Imortal; a negligência é o caminho para a morte.",
    "El Tao que puede ser expresado no es el Tao eterno.": "O Tao que pode ser expresso não é o Tao eterno.",
    "Lo que fue será de nuevo; lo que se hizo se hará de nuevo.": "O que foi será novamente; o que foi feito será feito novamente.",

    // MEDIEVAL
    "En Dios, la esencia es la existencia.": "Em Deus, a essência é a existência.",
    "El hombre elige, pero Dios ordena.": "O homem escolhe, mas Deus ordena.",
    "¿Existen las cosas únicamente o existen también las formas generales?": "Existem apenas as coisas ou também existem as formas gerais?",

    // MODERN & CONTEMPORARY
    "Pienso, luego existo.": "Penso, logo existo.",
    "Nada está en el intelecto que no haya estado antes en los sentidos.": "Nada está no intelecto que não haja estado antes nos sentidos.",
    "Las cosas como aparecen a nosotros (fenómenos) no son las cosas en sí (noúmenos).": "As coisas como aparecem a nós (fenômenos) não são as coisas em si (noúmenos).",
    "Actúa solo según esa máxima mediante la cual puedas querer que se convierta en ley universal.": "Age apenas segundo a máxima mediante a qual você possa querer que se torne lei universal.",
    "La historia es el progreso de la conciencia de libertad.": "A história é o progresso da consciência de liberdade.",
    "El hombre nace libre, y en todas partes se halla encadenado.": "O homem nasce livre, e em toda parte se encontra acorrentado.",
    "La mayor felicidad para el mayor número.": "A maior felicidade para o maior número.",
    "No es nuestro conocimiento el que se ajusta al objeto, sino el objeto al conocimiento.": "Não é nosso conhecimento que se ajusta ao objeto, mas o objeto ao conhecimento.",
    "El producto deviene un misterio porque las características sociales del trabajo se presentan como propiedades de la mercancía.": "O produto se torna um mistério porque as características sociais do trabalho se apresentam como propriedades da mercadoria.",
    "Toda la naturaleza está llena del impulso a crear, crecer y dominar.": "Toda a natureza está cheia do impulso para criar, crescer e dominar.",
    "Necesitamos transvaluaciones de todos los valores.": "Precisamos de transvalorização de todos os valores.",
    "El hombre es una cuerda tendida entre el animal y el Superhombre: una cuerda sobre un abismo.": "O homem é uma corda estendida entre o animal e o Super-Homem: uma corda sobre um abismo.",
    "No hay relación de poder sin una correlativa constitución de un saber.": "Não há relação de poder sem uma correlativa constituição de um saber.",
    "La vida se convierte en un problema político.": "A vida se torna um problema político.",
    "La verdad emerge del diálogo racional sin coerción.": "A verdade emerge do diálogo racional sem coerção.",
    "La significación surge no de la presencia, sino de la diferencia y la ausencia.": "A significação surge não da presença, mas da diferença e da ausência.",
    "Ya no buscamos la verdad absoluta sino la verdad débil.": "Não buscamos mais a verdade absoluta, mas a verdade fraca.",
    "La verdad es lo que funciona en la práctica.": "A verdade é o que funciona na prática.",
    "¿Qué es el conocimiento si no es creencia verdadera y justificada?": "O que é o conhecimento se não é crença verdadeira e justificada?",
    "En igualdad de condiciones, la explicación más sencilla suele ser la correcta.": "Em igualdade de condições, a explicação mais simples é geralmente a correta.",
    "Una teoría es científica si puede ser refutada.": "Uma teoria é científica se pode ser refutada.",
    "La ciencia avanza por revoluciones de paradigmas, no por acumulación gradual.": "A ciência avança por revoluções de paradigmas, não por acumulação gradual.",
    "Justo después no significa porque.": "Logo depois não significa porque.",
    "La virtud es un hábito, una disposición a actuar correctamente.": "A virtude é um hábito, uma disposição para agir corretamente.",
};

const APPLICATION_TRANSLATIONS = {
    // STOICISM
    "Ante un imprevisto, separa lo que depende de ti (tu juicio) de lo que no (el evento). Actúa solo en lo primero.": "Diante de um imprevisto, separe o que depende de você (seu julgamento) do que não (o evento). Aja apenas no primeiro.",
    "Busca la tranquilidad mental evitando deseos innecesarios y miedos infundados. Valora lo simple.": "Busque a tranquilidade mental evitando desejos desnecessários e medos infundados. Valorize o simples.",
    "No solo aceptes lo que sucede; ámalo como una parte necesaria de tu historia única.": "Não apenas aceite o que acontece; ame como parte necessária de sua história única.",
    "Recuerda tu mortalidad para priorizar lo que realmente importa. La finitud crea propósito.": "Lembre-se de sua mortalidade para priorizar o que realmente importa. A finitude cria propósito.",
    "Cultiva la impasibilidad ante lo externo. No significa insensibilidad, sino dominio emocional.": "Cultive a impassibilidade diante do externo. Não significa insensibilidade, mas domínio emocional.",
    "La única posesión que nadie puede quitarte es tu carácter. Cultívalo por encima de todo.": "A única posição que ninguém pode tirar de você é seu caráter. Cultive acima de tudo.",
    "Cultiva tu capacidad racional. Es lo que te distingue y lo que te libera.": "Cultive sua capacidade racional. É o que o distingue e o que o liberta.",
    "Ves a toda la humanidad como tu hermano. Las divisiones son ilusiones.": "Veja toda a humanidade como seu irmão. As divisões são ilusões.",
    "Visualiza escenarios negativos para prepararte mentalmente. Reduce la sorpresa y el pánico.": "Visualize cenários negativos para se preparar mentalmente. Reduza a surpresa e o pânico.",
    "Tus emociones surgen de tus juicios. Cambia tus juicios y cambiarás tus emociones.": "Suas emoções surgem de seus julgamentos. Mude seus julgamentos e mudará suas emoções.",

    // EXISTENTIALISM
    "No has nacido con un destino predeterminado. Eres lo que haces. Tienes libertad y responsabilidad total.": "Você não nasceu com um destino predeterminado. Você é o que faz. Tem liberdade e responsabilidade total.",
    "No te mientas diciendo 'no tengo opción'. Siempre hay una opción, aunque sea difícil.": "Não minta para si mesmo dizendo 'não tenho opção'. Sempre há uma opção, embora seja difícil.",
    "La vida no tiene significado inherente. Tú creas el tuyo. El desafío es vivir sin ilusiones falsas.": "A vida não tem significado inerente. Você cria o seu. O desafio é viver sem falsas ilusões.",
    "La verdad personal surge del compromiso total con tus valores, no de la contemplación pasiva.": "A verdade pessoal surge do compromisso total com seus valores, não da contemplação passiva.",
    "Tu ansiedad refleja tu libertad y responsabilidad. Es incómoda pero genuina.": "Sua ansiedade reflete sua liberdade e responsabilidade. É desconfortável mas genuína.",
    "Vivir auténticamente significa no conformarse con las opiniones de la masa.": "Viver autenticamente significa não se conformar com as opiniões da massa.",
    "La conciencia de tu propia mortalidad y finitud es lo que te hace genuinamente humano.": "A consciência de sua própria mortalidade e finitude é o que o torna genuinamente humano.",
    "Tu vida es un proyecto en construcción. No es un destino, es una creación continua.": "Sua vida é um projeto em construção. Não é um destino, é uma criação contínua.",

    // EPICUREANISM
    "El placer no es hedonismo desenfrenado; es la eliminación del dolor y el miedo.": "O prazer não é hedonismo desenfrenado; é a eliminação da dor e do medo.",
    "El verdadero epicureísmo es ascético: agua, pan y conversación con amigos.": "O verdadeiro epicureísmo é ascético: água, pão e conversa com amigos.",
    "La amistad es el mayor placer. Cultívala por encima de la riqueza y el poder.": "A amizade é o maior prazer. Cultive acima da riqueza e do poder.",

    // ORIENTAL
    "Actúa con el flujo natural de las cosas, no contra él. Menos resistencia, más armonía.": "Aja com o fluxo natural das coisas, não contra. Menos resistência, mais harmonia.",
    "La realidad es dualidad complementaria. Hombre y mujer, luz y sombra, son interdependientes.": "A realidade é dualidade complementar. Homem e mulher, luz e sombra, são interdependentes.",
    "Tu presente es el resultado de tus acciones pasadas. Tu futuro es el resultado de hoy.": "Seu presente é o resultado de suas ações passadas. Seu futuro é o resultado de hoje.",
    "La realidad no es sustancia, sino relación. No eres una cosa sino un proceso.": "A realidade não é substância, mas relação. Você não é uma coisa, mas um processo.",
    "La felicidad no está en obtener lo que quieres, sino en querer lo que ya tienes.": "A felicidade não está em obter o que você quer, mas em querer o que já tem.",
    "Todo sufrimiento tiene causa (deseo). Si eliminas la causa, eliminas el sufrimiento.": "Todo sofrimento tem causa (desejo). Se você eliminar a causa, eliminará o sofrimento.",
    "Observa tus pensamientos sin identificarte con ellos. Eres el testigo, no la mente.": "Observe seus pensamentos sem se identificar com eles. Você é a testemunha, não a mente.",
    "La realidad última está más allá del lenguaje. A veces es mejor estar en silencio que hablar.": "A realidade última está além da linguagem. Às vezes é melhor estar em silêncio do que falar.",
    "Los ciclos son naturales. Después del invierno viene la primavera. Tu sufrimiento también pasará.": "Os ciclos são naturais. Depois do inverno vem a primavera. Seu sofrimento também passará.",

    // MEDIEVAL
    "Aunque no creas en Dios, la idea es que el ser puro carece de limitaciones. Tú tienes limitaciones.": "Embora você não acredite em Deus, a ideia é que o ser puro não tem limitações. Você tem limitações.",
    "Incluso si crees que el destino existe, actúa como si tu elección importara.": "Mesmo que você acredite que o destino existe, aja como se sua escolha importasse.",
    "¿Existe la 'belleza' o solo objetos bellos? La respuesta cambia tu metafísica.": "Existe a 'beleza' ou apenas objetos belos? A resposta muda sua metafísica.",

    // MODERN & CONTEMPORARY
    "Duda de todo lo que puedas para encontrar lo que es cierto e indudable.": "Duvide de tudo o que puder para encontrar o que é certo e indubitável.",
    "Tu conocimiento viene de la experiencia, no de la pura razón. Desconfía de la abstracción.": "Seu conhecimento vem da experiência, não da pura razão. Desconfie da abstração.",
    "Tu percepción de la realidad está filtrada por tu mente. Nunca ves 'la realidad' directamente.": "Sua percepção da realidade é filtrada por sua mente. Você nunca vê 'a realidade' diretamente.",
    "Pregúntate: ¿Querrías que todos en el mundo hicieran lo que estás a punto de hacer?": "Pergunte-se: Gostaria que todos no mundo fizessem o que você está prestes a fazer?",
    "Toda verdad surge de la síntesis de contrarios. Conflicto y resolución son el motor de la historia.": "Toda verdade surge da síntese de contrários. Conflito e resolução são o motor da história.",
    "Tu libertad individual fue sacrificada por la seguridad social. El pacto social es este trade-off.": "Sua liberdade individual foi sacrificada pela segurança social. O pacto social é este trade-off.",
    "Las acciones son correctas si maximizan la felicidad total. Individuo vs. colectivo.": "As ações são corretas se maximizam a felicidade total. Indivíduo vs. coletivo.",
    "Tu mente no refleja la realidad pasivamente. La construye activamente.": "Sua mente não reflete a realidade passivamente. A constrói ativamente.",
    "Crees que necesitas un producto cuando realmente necesitas lo que representa. Marketing es fetichismo.": "Você acredita que precisa de um produto quando realmente precisa do que ele representa. Marketing é fetichismo.",
    "Más que la supervivencia, tu impulso es crear y expandir tu poder. Esto no es malo, es natural.": "Mais do que a sobrevivência, seu impulso é criar e expandir seu poder. Isso não é ruim, é natural.",
    "Los valores que heredaste pueden no ser verdaderos para ti. Tienes el derecho de cuestionarlos todos.": "Os valores que você herdou podem não ser verdadeiros para você. Você tem o direito de questioná-los.",
    "Tu potencial es crear tu propia moral y valores. No seguir los del rebaño.": "Seu potencial é criar sua própria moral e valores. Não seguir os do rebanho.",
    "El poder no solo controla tu cuerpo; controla tu concepto de 'normalidad' y 'salud'.": "O poder não apenas controla seu corpo; controla seu conceito de 'normalidade' e 'saúde'.",
    "La verdad no es declarada por una autoridad sino construida por conversación genuina.": "A verdade não é declarada por uma autoridade, mas construída por conversa genuína.",
    "El significado no es fijo; es relacional y cambia con el contexto. Las palabras nunca tocan la realidad directamente.": "O significado não é fixo; é relacional e muda com o contexto. As palavras nunca tocam a realidade diretamente.",
    "Abandona la obsesión por la certeza absoluta. Vive con probabilidades e incertidumbre.": "Abandone a obsessão pela certeza absoluta. Viva com probabilidades e incerteza.",
    "No preguntarás si algo es 'verdadero en abstracto' sino si 'funciona en mi vida'.": "Você não perguntará se algo é 'verdadeiro em abstrato', mas se 'funciona em minha vida'.",
    "Puedes estar justificado y ser correcto sin realmente 'saber'. La suerte epistemológica existe.": "Você pode estar justificado e estar correto sem realmente 'saber'. A sorte epistemológica existe.",
    "No multipliques hipótesis sin necesidad. La solución más simple es generalmente la correcta.": "Não multiplique hipóteses sem necessidade. A solução mais simples é geralmente a correta.",
    "No busques pruebas de tu creencia; busca refutaciones. La ciencia progresa eliminando lo falso.": "Não procure provas de sua crença; procure refutações. A ciência progride eliminando o falso.",
    "Cuando cambia el paradigma, todo lo que 'sabía' se reorganiza. Cambios revolucionarios de perspectiva son posibles.": "Quando o paradigma muda, tudo o que você 'sabia' se reorganiza. Mudanças revolucionárias de perspectiva são possíveis.",
    "Correlación no es causalidad. Solo porque dos cosas suceden juntas no significa que una causó la otra.": "Correlação não é causalidade. Só porque duas coisas acontecem juntas não significa que uma causou a outra.",
    "No preguntes 'qué debo hacer' sino 'qué tipo de persona quiero ser'. Las acciones correctas fluyen del carácter.": "Não pergunte 'o que devo fazer', mas 'que tipo de pessoa quero ser'. As ações corretas fluem do caráter.",
};

// Función auxiliar para traducir un concepto completo
function translateConcept(concept, targetLang) {
    if (targetLang === 'es') return concept;

    const translated = { ...concept };
    translated.title = CONCEPT_TRANSLATIONS[concept.title] || concept.title;
    translated.category = CATEGORY_TRANSLATIONS[concept.category] || concept.category;
    translated.quote = QUOTE_TRANSLATIONS[concept.quote] || concept.quote;
    translated.application = APPLICATION_TRANSLATIONS[concept.application] || concept.application;

    return translated;
}
