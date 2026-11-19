/**
 * Paradojas y dilemas clásicos.
 *
 * Cada entrada indica su fuente. Cuando la atribución popular no coincide con la
 * histórica se aclara en `note`. Solo se incluyen paradojas reales (no ejemplos
 * inventados): se eliminaron las entradas sin fuente de la versión anterior.
 *
 * X(id, tema, fuente, autorId, es, pt, nota?)
 *   es/pt: [título, planteamiento, pregunta, aplicación]
 */

const PARADOX_TOPICS = [
    { id: 'logica', name: { es: 'Lógica y lenguaje', pt: 'Lógica e linguagem' } },
    { id: 'metafisica', name: { es: 'Identidad, tiempo y movimiento', pt: 'Identidade, tempo e movimento' } },
    { id: 'conocimiento', name: { es: 'Conocimiento y mente', pt: 'Conhecimento e mente' } },
    { id: 'etica', name: { es: 'Ética y decisión', pt: 'Ética e decisão' } },
    { id: 'politica', name: { es: 'Política y sociedad', pt: 'Política e sociedade' } },
    { id: 'religion', name: { es: 'Filosofía de la religión', pt: 'Filosofia da religião' } }
];

const PARADOXES = [];

function X(id, topic, source, authorId, es, pt, note = null) {
    const text = a => ({ title: a[0], explanation: a[1], reflection: a[2], application: a[3] });
    PARADOXES.push({
        id, topic, source, authorId,
        note: note ? { es: note[0], pt: note[1] } : null,
        es: text(es), pt: text(pt)
    });
}

X('mentiroso', 'logica', 'Atribuida a Eubúlides de Mileto (s. IV a.C.); variante de Epiménides', null,
  ['La paradoja del mentiroso', 'Considera la frase: «Esta frase es falsa». Si es verdadera, entonces es falsa; si es falsa, entonces es verdadera.',
   '¿Qué falla: la frase, la lógica o nuestra idea de verdad? Tarski y Kripke propusieron distinguir niveles de lenguaje.',
   'Sospecha de los argumentos que se refieren a sí mismos para justificarse a sí mismos.'],
  ['O paradoxo do mentiroso', 'Considere a frase: «Esta frase é falsa». Se é verdadeira, então é falsa; se é falsa, então é verdadeira.',
   'O que falha: a frase, a lógica ou nossa ideia de verdade? Tarski e Kripke propuseram distinguir níveis de linguagem.',
   'Desconfie dos argumentos que se referem a si mesmos para justificar a si mesmos.'],
  ['La versión de Epiménides («todos los cretenses son mentirosos», dicho por un cretense) no es una paradoja estricta; la forma pura se atribuye a Eubúlides.',
   'A versão de Epimênides («todos os cretenses são mentirosos», dito por um cretense) não é um paradoxo estrito; a forma pura é atribuída a Eubúlides.']);

X('aquiles-tortuga', 'metafisica', 'Zenón de Elea (s. V a.C.), transmitida por Aristóteles, Física VI.9, 239b', 'zenon-de-elea',
  ['Aquiles y la tortuga', 'Aquiles corre diez veces más rápido que una tortuga que le lleva ventaja. Para alcanzarla debe llegar donde ella estaba, pero entonces ella habrá avanzado un poco más; y así indefinidamente: parece que nunca la alcanzará.',
   '¿Cómo puede una suma infinita de tramos ser finita? La matemática de las series convergentes lo resuelve, pero la discusión sobre el infinito real continúa.',
   'Empezar una tarea parece imposible si piensas en todos los pasos a la vez. Concéntrate en el primero.'],
  ['Aquiles e a tartaruga', 'Aquiles corre dez vezes mais rápido do que uma tartaruga que lhe leva vantagem. Para alcançá-la deve chegar aonde ela estava, mas então ela terá avançado um pouco mais; e assim indefinidamente: parece que nunca a alcançará.',
   'Como pode uma soma infinita de trechos ser finita? A matemática das séries convergentes o resolve, mas a discussão sobre o infinito real continua.',
   'Começar uma tarefa parece impossível se você pensa em todos os passos ao mesmo tempo. Concentre-se no primeiro.']);

X('flecha', 'metafisica', 'Zenón de Elea (s. V a.C.), transmitida por Aristóteles, Física VI.9, 239b', 'zenon-de-elea',
  ['La flecha de Zenón', 'En cada instante, una flecha en vuelo ocupa un espacio igual a sí misma y por tanto está en reposo. Si en todos los instantes está quieta, ¿cuándo se mueve?',
   '¿Es el movimiento una suma de posiciones instantáneas o algo que no puede reducirse a ellas?',
   'Una vida que parece detenida en cada foto instantánea sigue siendo un proceso: no te juzgues por un solo momento.'],
  ['A flecha de Zenão', 'Em cada instante, uma flecha em voo ocupa um espaço igual a si mesma e, portanto, está em repouso. Se em todos os instantes está parada, quando se move?',
   'O movimento é uma soma de posições instantâneas ou algo que não pode ser reduzido a elas?',
   'Uma vida que parece parada em cada foto instantânea continua sendo um processo: não se julgue por um único momento.']);

X('teseo', 'metafisica', 'Plutarco, Vida de Teseo 23; variante de Hobbes en Sobre el cuerpo (1655)', null,
  ['El barco de Teseo', 'Los atenienses conservaron el barco de Teseo reemplazando poco a poco las tablas viejas. Cuando se han cambiado todas, ¿sigue siendo el mismo barco? Y si con las tablas viejas se construyera otro barco, ¿cuál sería el original?',
   '¿Qué hace que algo siga siendo lo mismo: la materia, la forma o la continuidad?',
   'Si tus células, ideas y hábitos cambian, ¿qué permanece de ti? Pensar en identidad como continuidad ayuda a aceptar el cambio.'],
  ['O navio de Teseu', 'Os atenienses conservaram o navio de Teseu substituindo aos poucos as tábuas velhas. Quando todas foram trocadas, continua sendo o mesmo navio? E se com as tábuas velhas se construísse outro navio, qual seria o original?',
   'O que faz algo continuar sendo o mesmo: a matéria, a forma ou a continuidade?',
   'Se suas células, ideias e hábitos mudam, o que permanece de você? Pensar a identidade como continuidade ajuda a aceitar a mudança.'],
  ['La versión con el segundo barco hecho de las tablas viejas la añade Hobbes. Se suele decir que «las células se renuevan cada 7 años», pero es un mito: no todas se renuevan.',
   'A versão com o segundo navio feito das tábuas velhas é acrescentada por Hobbes. Costuma-se dizer que «as células se renovam a cada 7 anos», mas é um mito: nem todas se renovam.']);

X('sorites', 'logica', 'Atribuida a Eubúlides de Mileto (s. IV a.C.)', null,
  ['La paradoja del montón (sorites)', 'Un grano de arena no es un montón. Si añadir un grano a algo que no es un montón no lo convierte en un montón, mil millones de granos tampoco lo serían. Pero es evidente que sí lo son.',
   '¿Dónde está el límite? ¿Son vagos nuestros conceptos o no existen fronteras exactas?',
   'Muchas categorías importantes (adulto, rico, experto) tienen bordes difusos. No ignores un caso solo porque la frontera es borrosa.'],
  ['O paradoxo do monte (sorites)', 'Um grão de areia não é um monte. Se acrescentar um grão a algo que não é um monte não o transforma em monte, mil milhões de grãos tampouco o seriam. Mas é evidente que o são.',
   'Onde está o limite? Nossos conceitos são vagos ou não existem fronteiras exatas?',
   'Muitas categorias importantes (adulto, rico, especialista) têm bordas difusas. Não ignore um caso só porque a fronteira é borrosa.']);

X('litigante', 'logica', 'Aulo Gelio, Noches áticas V, 10 (Protágoras y Evatlo)', null,
  ['La paradoja del litigante', 'Protágoras enseña derecho a Evatlo, que pagará la mitad al terminar y la otra mitad al ganar su primer pleito. Evatlo no ejerce, y Protágoras lo demanda. Si gana Protágoras, debe cobrar por la sentencia; si pierde, por el contrato. Evatlo razona al revés.',
   '¿Qué regla debe prevalecer, la sentencia o el contrato? Los casos con reglas que se contradicen muestran los límites de la legalidad.',
   'Antes de firmar un acuerdo, comprueba si sus condiciones pueden contradecirse.'],
  ['O paradoxo do litigante', 'Protágoras ensina direito a Evatlo, que pagará metade ao terminar e a outra metade ao ganhar seu primeiro processo. Evatlo não advoga, e Protágoras o processa. Se Protágoras ganhar, deve receber pela sentença; se perder, pelo contrato. Evatlo raciocina ao contrário.',
   'Que regra deve prevalecer, a sentença ou o contrato? Casos com regras que se contradizem mostram os limites da legalidade.',
   'Antes de assinar um acordo, verifique se suas condições podem se contradizer.']);

X('menon', 'conocimiento', 'Platón, Menón 80d–e', 'platon',
  ['La paradoja de Menón', '¿Cómo vas a buscar algo si no sabes qué es? Y si lo encontraras, ¿cómo sabrías que es lo que buscabas? Parece que no se puede investigar ni lo que se sabe (no hace falta) ni lo que no se sabe (no se reconocería).',
   '¿Cómo es posible aprender algo realmente nuevo? Platón responde con la reminiscencia: aprender es recordar.',
   'Aprender requiere un punto de partida: una intuición, una pregunta mal formulada. Empieza por ahí.'],
  ['O paradoxo de Mênon', 'Como você vai buscar algo se não sabe o que é? E se o encontrasse, como saberia que é o que buscava? Parece que não se pode investigar nem o que se sabe (não é preciso) nem o que não se sabe (não se reconheceria).',
   'Como é possível aprender algo realmente novo? Platão responde com a reminiscência: aprender é recordar.',
   'Aprender requer um ponto de partida: uma intuição, uma pergunta mal formulada. Comece por aí.']);

X('tranvia', 'etica', 'Philippa Foot (1967); variante de Judith Jarvis Thomson (1976)', 'foot',
  ['El dilema del tranvía', 'Un tranvía sin frenos va hacia cinco personas. Puedes desviarlo con una palanca hacia una vía donde hay una persona. ¿Lo haces? Y si para detenerlo tuvieras que empujar a un hombre desde un puente, ¿también?',
   '¿Por qué muchos aceptan la palanca pero rechazan el empujón, si el resultado es el mismo? ¿Cuenta la diferencia entre dañar y dejar morir?',
   'Muestra que nuestras intuiciones morales no siempre siguen el cálculo de consecuencias: revisa cuándo cedes a una y cuándo a la otra.'],
  ['O dilema do bonde', 'Um bonde sem freios vai em direção a cinco pessoas. Você pode desviá-lo com uma alavanca para uma via onde há uma pessoa. Você o faz? E se para detê-lo tivesse de empurrar um homem de uma ponte, também?',
   'Por que muitos aceitam a alavanca mas rejeitam o empurrão, se o resultado é o mesmo? Importa a diferença entre causar dano e deixar morrer?',
   'Mostra que nossas intuições morais nem sempre seguem o cálculo de consequências: revise quando cede a uma e quando à outra.'],
  ['Foot formuló el problema del tranvía en 1967 en un artículo sobre el aborto; el «empujón desde el puente» es de Thomson. Es un experimento mental, no una guía para decisiones reales.',
   'Foot formulou o problema do bonde em 1967 em um artigo sobre o aborto; o «empurrão da ponte» é de Thomson. É um experimento mental, não um guia para decisões reais.']);

X('newcomb', 'etica', 'Problema ideado por William Newcomb (c. 1960); publicado por Robert Nozick (1969)', 'nozick',
  ['El problema de Newcomb', 'Un predictor casi infalible ha puesto 1.000 € en una caja visible y 1.000.000 € en otra opaca solo si predijo que tomarías únicamente la opaca. Ya ha decidido. ¿Tomas solo la opaca o las dos?',
   'La teoría de la decisión da dos respuestas opuestas igual de razonables: el predictor ya actuó (tomar ambas) o quien toma una gana más (tomar una).',
   'Ayuda a pensar cuánto importa lo que tu elección dice de ti, y no solo lo que causa.'],
  ['O problema de Newcomb', 'Um preditor quase infalível colocou 1.000 € numa caixa visível e 1.000.000 € em outra opaca somente se previu que você pegaria apenas a opaca. Ele já decidiu. Você pega só a opaca ou as duas?',
   'A teoria da decisão dá duas respostas opostas igualmente razoáveis: o preditor já agiu (pegar ambas) ou quem pega uma ganha mais (pegar uma).',
   'Ajuda a pensar quanto importa o que sua escolha diz sobre você, e não só o que ela causa.'],
  ['El problema lo concibió el físico William Newcomb; Nozick lo hizo público en un artículo de 1969. En el planteamiento popular se atribuye erróneamente a «Robert Newcomb».',
   'O problema foi concebido pelo físico William Newcomb; Nozick o tornou público em um artigo de 1969. Na versão popular é atribuído erroneamente a «Robert Newcomb».']);

X('habitacion-china', 'conocimiento', 'John Searle, «Minds, Brains, and Programs» (1980)', 'searle',
  ['La habitación china', 'Alguien que no sabe chino está en una habitación con un manual para responder símbolos chinos con otros símbolos. Desde fuera parece entender chino. Searle: manipular símbolos no es comprender.',
   '¿Basta ejecutar un programa para tener comprensión? ¿Entienden los sistemas actuales de IA lo que dicen?',
   'Distingue entre producir respuestas correctas y comprender: en tu estudio, ¿repites o entiendes?'],
  ['O quarto chinês', 'Alguém que não sabe chinês está num quarto com um manual para responder símbolos chineses com outros símbolos. De fora parece entender chinês. Searle: manipular símbolos não é compreender.',
   'Basta executar um programa para ter compreensão? Os sistemas atuais de IA entendem o que dizem?',
   'Distinga entre produzir respostas corretas e compreender: no seu estudo, você repete ou entende?']);

X('cuarto-de-mary', 'conocimiento', 'Frank Jackson, «Epiphenomenal Qualia» (1982)', null,
  ['La habitación de Mary', 'Mary, científica experta en la visión del color, ha vivido siempre en una habitación en blanco y negro. Al ver por primera vez un tomate rojo, ¿aprende algo nuevo?',
   'Si aprende algo, entonces el conocimiento físico no lo explica todo sobre la experiencia consciente.',
   'Saber sobre una experiencia no es lo mismo que vivirla: ten cuidado al juzgar lo que no has sentido.'],
  ['O quarto de Mary', 'Mary, cientista especialista em visão de cores, sempre viveu num quarto em preto e branco. Ao ver pela primeira vez um tomate vermelho, ela aprende algo novo?',
   'Se aprende algo, então o conhecimento físico não explica tudo sobre a experiência consciente.',
   'Saber sobre uma experiência não é o mesmo que vivê-la: tenha cuidado ao julgar o que você não sentiu.'],
  ['Jackson cambió más tarde de opinión y rechazó el argumento; sigue siendo muy discutido.',
   'Jackson mais tarde mudou de opinião e rejeitou o argumento; continua muito discutido.']);

X('abuelo', 'metafisica', 'René Barjavel, El viajero imprudente (1943)', null,
  ['La paradoja del abuelo', 'Viajas al pasado y matas a tu abuelo antes de que engendre a tu padre. Entonces no naces, y no podrías haber viajado para matarlo.',
   '¿Es lógicamente posible viajar al pasado? ¿Habría líneas temporales alternativas o el pasado es inmodificable?',
   'Invita a pensar qué partes de tu historia son modificables y cuáles no: ¿para qué sirve lamentar lo que ya pasó?'],
  ['O paradoxo do avô', 'Você viaja ao passado e mata seu avô antes que ele gere seu pai. Então você não nasce, e não poderia ter viajado para matá-lo.',
   'É logicamente possível viajar ao passado? Haveria linhas temporais alternativas ou o passado é imodificável?',
   'Convida a pensar que partes da sua história são modificáveis e quais não: para que serve lamentar o que já passou?'],
  ['Se atribuye a Barjavel (1943) como primera aparición en la ficción; la discusión filosófica y física posterior es extensa.',
   'É atribuído a Barjavel (1943) como primeira aparição na ficção; a discussão filosófica e física posterior é extensa.']);

X('omnipotencia', 'religion', 'Discusión escolástica medieval; cf. Tomás de Aquino, Suma Teológica I, q. 25, a. 3', 'aquino',
  ['La piedra que no puede levantar', '¿Puede un ser omnipotente crear una piedra tan pesada que él mismo no pueda levantarla? Si puede, hay algo que no puede levantar; si no puede, hay algo que no puede crear.',
   '¿Qué significa «todopoderoso»? Aquino responde que la omnipotencia no incluye lo lógicamente contradictorio.',
   'Aclara qué incluye una promesa absoluta («haré lo que sea»): pocas veces incluye lo imposible.'],
  ['A pedra que não consegue levantar', 'Um ser onipotente pode criar uma pedra tão pesada que ele mesmo não possa levantá-la? Se pode, há algo que não pode levantar; se não pode, há algo que não pode criar.',
   'O que significa «todo-poderoso»? Aquino responde que a onipotência não inclui o logicamente contraditório.',
   'Esclareça o que inclui uma promessa absoluta («farei o que for»): poucas vezes inclui o impossível.'],
  ['La formulación de la «piedra» es posterior; Aquino trata la cuestión de lo lógicamente imposible, no esa imagen exacta.',
   'A formulação da «pedra» é posterior; Aquino trata a questão do logicamente impossível, não essa imagem exata.']);

X('problema-del-mal', 'religion', 'Atribuido a Epicuro por Lactancio (De ira Dei 13); formulación de Hume, Diálogos sobre la religión natural X (1779)', 'epicuro',
  ['El problema del mal', '¿Quiere Dios evitar el mal pero no puede? Entonces no es omnipotente. ¿Puede pero no quiere? Entonces no es bueno. ¿Puede y quiere? Entonces, ¿de dónde viene el mal?',
   'Es un argumento clásico contra la existencia de un Dios omnipotente y bueno; ha generado teodiceas (Leibniz), la defensa del libre albedrío y otras respuestas.',
   'Ante un sufrimiento sin sentido aparente, caben la protesta, la humildad ante lo que no entendemos o la acción para remediarlo.'],
  ['O problema do mal', 'Deus quer evitar o mal mas não pode? Então não é onipotente. Pode mas não quer? Então não é bom. Pode e quer? Então, de onde vem o mal?',
   'É um argumento clássico contra a existência de um Deus onipotente e bom; gerou teodiceias (Leibniz), a defesa do livre-arbítrio e outras respostas.',
   'Diante de um sofrimento sem sentido aparente, cabem o protesto, a humildade diante do que não entendemos ou a ação para remediá-lo.'],
  ['La atribución a Epicuro es dudosa: viene de Lactancio, un autor cristiano que lo critica, y no aparece en los textos conservados de Epicuro. Hume lo desarrolla en sus Diálogos.',
   'A atribuição a Epicuro é duvidosa: vem de Lactâncio, um autor cristão que o critica, e não aparece nos textos conservados de Epicuro. Hume o desenvolve em seus Diálogos.']);

X('tolerancia', 'politica', 'Karl Popper, La sociedad abierta y sus enemigos (1945), cap. 7, nota 4', 'popper',
  ['La paradoja de la tolerancia', 'Si una sociedad tolera sin límites incluso a quienes quieren destruir la tolerancia, acabará destruida. Popper concluye que la sociedad tolerante tiene derecho a no tolerar a los intolerantes cuando estos rechazan el debate racional y recurren a la violencia.',
   '¿Dónde se fija el límite? ¿Quién lo decide sin caer en la intolerancia?',
   'Tolerar no es aceptarlo todo: pregúntate cuándo una opinión deja de ser debatible y se convierte en amenaza.'],
  ['O paradoxo da tolerância', 'Se uma sociedade tolera sem limites até quem quer destruir a tolerância, acabará destruída. Popper conclui que a sociedade tolerante tem o direito de não tolerar os intolerantes quando estes rejeitam o debate racional e recorrem à violência.',
   'Onde se fixa o limite? Quem o decide sem cair na intolerância?',
   'Tolerar não é aceitar tudo: pergunte-se quando uma opinião deixa de ser debatível e se torna ameaça.'],
  ['Popper matiza que debe preferirse el argumento y reservar la fuerza para quienes rechazan todo debate; no es licencia para silenciar opiniones incómodas.',
   'Popper matiza que se deve preferir o argumento e reservar a força para quem rejeita todo debate; não é licença para silenciar opiniões incômodas.']);

X('maquina-de-experiencias', 'etica', 'Robert Nozick, Anarquía, Estado y utopía (1974), cap. 3', 'nozick',
  ['La máquina de experiencias', 'Una máquina te permitiría vivir cualquier experiencia placentera que elijas, con la sensación perfecta de que es real. ¿Te conectarías de por vida?',
   'Si dices que no, quizá valoras algo más que sentirte bien: hacer cosas, ser alguien, contactar con la realidad.',
   'Cuando persigas bienestar, pregúntate si buscas la sensación o la cosa real que la causa.'],
  ['A máquina de experiências', 'Uma máquina permitiria viver qualquer experiência prazerosa que você escolher, com a sensação perfeita de que é real. Você se conectaria por toda a vida?',
   'Se você diz que não, talvez valorize algo além de sentir-se bem: fazer coisas, ser alguém, estar em contato com a realidade.',
   'Quando buscar bem-estar, pergunte-se se busca a sensação ou a coisa real que a causa.']);

X('asno-de-buridan', 'etica', 'Sátira atribuida a Juan Buridán; precedentes en Aristóteles (Sobre el cielo II.13) y Al-Gazali', null,
  ['El asno de Buridán', 'Un asno hambriento y sediento está exactamente a medio camino entre un montón de heno y un cubo de agua. Sin razón para preferir uno, muere de indecisión.',
   '¿Puede un agente racional elegir sin razón suficiente? Si no puede, ¿cómo elegir entre opciones equivalentes?',
   'Cuando dos opciones valen más o menos lo mismo, elegir rápido (aunque sea al azar) suele ser mejor que no elegir.'],
  ['O asno de Buridan', 'Um asno faminto e sedento está exatamente a meio caminho entre um monte de feno e um balde de água. Sem razão para preferir um, morre de indecisão.',
   'Pode um agente racional escolher sem razão suficiente? Se não pode, como escolher entre opções equivalentes?',
   'Quando duas opções valem mais ou menos o mesmo, escolher rápido (mesmo que ao acaso) costuma ser melhor do que não escolher.'],
  ['No aparece en las obras conservadas de Buridán: probablemente es una sátira de sus detractores contra su teoría de la voluntad.',
   'Não aparece nas obras conservadas de Buridan: provavelmente é uma sátira de seus detratores contra sua teoria da vontade.']);

X('hedonismo', 'etica', 'Henry Sidgwick, Los métodos de la ética (1874)', null,
  ['La paradoja del hedonismo', 'Quien busca directamente el placer tiende a no encontrarlo: el placer llega como consecuencia de ocuparse de otras cosas (un trabajo, un amigo, una afición).',
   '¿Es un error de la psicología o una verdad sobre la felicidad? Si perseguir la felicidad la aleja, ¿cómo buscarla?',
   'En lugar de preguntarte «¿soy feliz?», dedícate a algo que valga la pena y mira qué sientes.'],
  ['O paradoxo do hedonismo', 'Quem busca diretamente o prazer tende a não encontrá-lo: o prazer chega como consequência de ocupar-se de outras coisas (um trabalho, um amigo, um passatempo).',
   'É um erro da psicologia ou uma verdade sobre a felicidade? Se perseguir a felicidade a afasta, como buscá-la?',
   'Em vez de se perguntar «sou feliz?», dedique-se a algo que valha a pena e veja o que sente.']);

X('barbero-de-russell', 'logica', 'Bertrand Russell (1901); versión del barbero en Filosofía del atomismo lógico (1918)', 'russell',
  ['El barbero de Russell', 'En un pueblo, el barbero afeita a todos los que no se afeitan a sí mismos y solo a ellos. ¿Se afeita a sí mismo? Si lo hace, no debería; si no lo hace, debería.',
   'Russell lo usó para ilustrar su paradoja de los conjuntos: «el conjunto de todos los conjuntos que no se contienen a sí mismos». Obligó a rehacer los fundamentos de las matemáticas.',
   'Las definiciones demasiado amplias («todo», «nunca») pueden contradecirse: desconfía de los absolutos.'],
  ['O barbeiro de Russell', 'Numa aldeia, o barbeiro barbeia todos os que não se barbeiam a si mesmos e somente eles. Ele se barbeia? Se o faz, não deveria; se não o faz, deveria.',
   'Russell o usou para ilustrar seu paradoxo dos conjuntos: «o conjunto de todos os conjuntos que não contêm a si mesmos». Obrigou a refazer os fundamentos da matemática.',
   'As definições demasiado amplas («tudo», «nunca») podem se contradizer: desconfie dos absolutos.']);
