/**
 * Taxonomía: épocas, carriles del mapa de linaje y corrientes (escuelas).
 * Todos los textos son bilingües { es, pt }.
 *
 * La época de cada autor se deduce de su año de nacimiento (ver core/atlas.js):
 *   antigua < 300 · medieval 300–1449 · moderna 1450–1769 · contemporánea ≥ 1770
 */

const ERAS = [
    {
        id: 'antigua',
        name: { es: 'Antigüedad', pt: 'Antiguidade' },
        range: { es: 'hasta el s. III d.C.', pt: 'até o séc. III d.C.' },
        desc: {
            es: 'El nacimiento de la filosofía en Grecia y las grandes tradiciones de China e India: del mito al logos, la vida buena y el cuidado del alma.',
            pt: 'O nascimento da filosofia na Grécia e as grandes tradições da China e da Índia: do mito ao logos, a vida boa e o cuidado da alma.'
        }
    },
    {
        id: 'medieval',
        name: { es: 'Edad Media', pt: 'Idade Média' },
        range: { es: 's. IV – XV', pt: 'séc. IV – XV' },
        desc: {
            es: 'Fe y razón: el pensamiento cristiano dialoga con Platón y Aristóteles, de San Agustín a la escolástica, mientras el budismo se extiende por Asia.',
            pt: 'Fé e razão: o pensamento cristão dialoga com Platão e Aristóteles, de Santo Agostinho à escolástica, enquanto o budismo se expande pela Ásia.'
        }
    },
    {
        id: 'moderna',
        name: { es: 'Edad Moderna', pt: 'Idade Moderna' },
        range: { es: 's. XVI – XVIII', pt: 'séc. XVI – XVIII' },
        desc: {
            es: 'La ciencia nueva y la Ilustración: el sujeto, los límites de la razón, la experiencia y el origen del poder político.',
            pt: 'A ciência nova e o Iluminismo: o sujeito, os limites da razão, a experiência e a origem do poder político.'
        }
    },
    {
        id: 'contemporanea',
        name: { es: 'Edad Contemporánea', pt: 'Idade Contemporânea' },
        range: { es: 's. XIX – XXI', pt: 'séc. XIX – XXI' },
        desc: {
            es: 'Historia, existencia, lenguaje, ciencia y crítica social: de Hegel y Marx a la fenomenología, la filosofía analítica y el postestructuralismo.',
            pt: 'História, existência, linguagem, ciência e crítica social: de Hegel e Marx à fenomenologia, à filosofia analítica e ao pós-estruturalismo.'
        }
    }
];

/** Carriles horizontales del mapa de linaje (agrupan corrientes afines). */
const LANES = [
    { id: 'grecia', name: { es: 'Grecia clásica', pt: 'Grécia clássica' } },
    { id: 'helenismo', name: { es: 'Helenismo y Roma', pt: 'Helenismo e Roma' } },
    { id: 'china', name: { es: 'China', pt: 'China' } },
    { id: 'india', name: { es: 'India y budismo', pt: 'Índia e budismo' } },
    { id: 'medieval', name: { es: 'Medieval', pt: 'Medieval' } },
    { id: 'moderna', name: { es: 'Razón, experiencia y política', pt: 'Razão, experiência e política' } },
    { id: 'existencia', name: { es: 'Existencia, fenomenología y hermenéutica', pt: 'Existência, fenomenologia e hermenêutica' } },
    { id: 'analitica', name: { es: 'Lenguaje, ciencia y pragmatismo', pt: 'Linguagem, ciência e pragmatismo' } },
    { id: 'critica', name: { es: 'Crítica social y estructuralismo', pt: 'Crítica social e estruturalismo' } }
];

function _school(id, lane, name, period, desc) {
    return { id, lane, name: { es: name[0], pt: name[1] }, period: { es: period[0], pt: period[1] }, desc: { es: desc[0], pt: desc[1] } };
}

const SCHOOLS = [
    // ----- Grecia clásica -----
    _school('presocraticos', 'grecia', ['Presocráticos', 'Pré-socráticos'], ['s. VI – V a.C.', 'séc. VI – V a.C.'],
        ['Los primeros pensadores griegos buscaron el principio (arché) de la naturaleza con razones en lugar de mitos: agua, ápeiron, fuego, ser.',
         'Os primeiros pensadores gregos buscaram o princípio (arché) da natureza com razões em vez de mitos: água, ápeiron, fogo, ser.']),
    _school('atomismo', 'grecia', ['Atomismo', 'Atomismo'], ['s. V a.C.', 'séc. V a.C.'],
        ['La realidad se compone de átomos indivisibles que se mueven en el vacío; todo lo demás es convención.',
         'A realidade se compõe de átomos indivisíveis que se movem no vazio; todo o resto é convenção.']),
    _school('socratica', 'grecia', ['Filosofía socrática', 'Filosofia socrática'], ['s. V a.C.', 'séc. V a.C.'],
        ['Sócrates desplaza la filosofía hacia la ética: examinar la vida, definir la virtud y dialogar para buscar la verdad.',
         'Sócrates desloca a filosofia para a ética: examinar a vida, definir a virtude e dialogar para buscar a verdade.']),
    _school('platonismo', 'grecia', ['Platonismo', 'Platonismo'], ['s. IV a.C.', 'séc. IV a.C.'],
        ['Más allá del mundo sensible existen Formas inteligibles y estables; conocer es ascender hacia ellas.',
         'Além do mundo sensível existem Formas inteligíveis e estáveis; conhecer é ascender até elas.']),
    _school('aristotelismo', 'grecia', ['Aristotelismo', 'Aristotelismo'], ['s. IV a.C.', 'séc. IV a.C.'],
        ['Una filosofía de la realidad concreta: sustancia, causas, virtud como hábito y felicidad como actividad plena.',
         'Uma filosofia da realidade concreta: substância, causas, virtude como hábito e felicidade como atividade plena.']),
    // ----- Helenismo y Roma -----
    _school('cinismo', 'helenismo', ['Cinismo', 'Cinismo'], ['s. IV a.C.', 'séc. IV a.C.'],
        ['Vivir conforme a la naturaleza, con autosuficiencia y libertad frente a convenciones, riqueza y poder.',
         'Viver conforme à natureza, com autossuficiência e liberdade diante de convenções, riqueza e poder.']),
    _school('estoicismo', 'helenismo', ['Estoicismo', 'Estoicismo'], ['s. III a.C. – s. II d.C.', 'séc. III a.C. – séc. II d.C.'],
        ['Vivir según la razón y la naturaleza: solo la virtud es un bien, y la serenidad nace de distinguir lo que depende de nosotros.',
         'Viver segundo a razão e a natureza: só a virtude é um bem, e a serenidade nasce de distinguir o que depende de nós.']),
    _school('epicureismo', 'helenismo', ['Epicureísmo', 'Epicurismo'], ['s. IV a.C. – s. II d.C.', 'séc. IV a.C. – séc. II d.C.'],
        ['El placer entendido como ausencia de dolor y de perturbación: deseos moderados, amistad y ciencia de la naturaleza contra el miedo.',
         'O prazer entendido como ausência de dor e de perturbação: desejos moderados, amizade e ciência da natureza contra o medo.']),
    _school('neoplatonismo', 'helenismo', ['Neoplatonismo', 'Neoplatonismo'], ['s. III – VI d.C.', 'séc. III – VI d.C.'],
        ['Todo procede de lo Uno y a él retorna: una lectura mística de Platón que marcó al cristianismo y al pensamiento medieval.',
         'Tudo procede do Uno e a ele retorna: uma leitura mística de Platão que marcou o cristianismo e o pensamento medieval.']),
    // ----- China -----
    _school('taoismo', 'china', ['Taoísmo', 'Taoísmo'], ['s. VI – III a.C.', 'séc. VI – III a.C.'],
        ['Armonizarse con el Tao, el curso natural de las cosas: acción sin forzar, sencillez y flexibilidad.',
         'Harmonizar-se com o Tao, o curso natural das coisas: ação sem forçar, simplicidade e flexibilidade.']),
    _school('confucianismo', 'china', ['Confucianismo', 'Confucionismo'], ['s. VI a.C. en adelante', 'séc. VI a.C. em diante'],
        ['Una ética de las relaciones: cultivarse mediante el aprendizaje, el ritual y la humanidad (ren) para gobernar y convivir bien.',
         'Uma ética das relações: cultivar-se por meio do aprendizado, do ritual e da humanidade (ren) para governar e conviver bem.']),
    // ----- India y budismo -----
    _school('budismo', 'india', ['Budismo', 'Budismo'], ['s. V a.C. en adelante', 'séc. V a.C. em diante'],
        ['Entender el sufrimiento, su origen y su cese: impermanencia, ausencia de yo fijo, atención plena y compasión.',
         'Entender o sofrimento, sua origem e sua cessação: impermanência, ausência de eu fixo, atenção plena e compaixão.']),
    _school('hinduismo', 'india', ['Filosofías de la India (Gita y Yoga)', 'Filosofias da Índia (Gita e Ioga)'], ['s. V a.C. en adelante', 'séc. V a.C. em diante'],
        ['Tradiciones védicas sobre la acción desinteresada, el dominio de la mente y la liberación (moksha).',
         'Tradições védicas sobre a ação desinteressada, o domínio da mente e a libertação (moksha).']),
    // ----- Medieval -----
    _school('patristica', 'medieval', ['Patrística', 'Patrística'], ['s. II – VIII', 'séc. II – VIII'],
        ['Los Padres de la Iglesia ponen la filosofía griega al servicio de la fe cristiana; su figura central es Agustín.',
         'Os Padres da Igreja põem a filosofia grega a serviço da fé cristã; sua figura central é Agostinho.']),
    _school('escolastica', 'medieval', ['Escolástica', 'Escolástica'], ['s. XI – XV', 'séc. XI – XV'],
        ['Filosofía de las universidades medievales: razón y fe, el método de la disputa y la recuperación de Aristóteles.',
         'Filosofia das universidades medievais: razão e fé, o método da disputa e a recuperação de Aristóteles.']),
    // ----- Razón, experiencia y política -----
    _school('racionalismo', 'moderna', ['Racionalismo', 'Racionalismo'], ['s. XVII', 'séc. XVII'],
        ['La razón es la fuente principal del conocimiento: deducir desde ideas claras y distintas, a imagen de las matemáticas.',
         'A razão é a principal fonte do conhecimento: deduzir de ideias claras e distintas, à imagem da matemática.']),
    _school('empirismo', 'moderna', ['Empirismo', 'Empirismo'], ['s. XVII – XVIII', 'séc. XVII – XVIII'],
        ['Todo conocimiento procede de la experiencia sensible; la mente no trae ideas innatas.',
         'Todo conhecimento procede da experiência sensível; a mente não traz ideias inatas.']),
    _school('filosofia-politica', 'moderna', ['Filosofía política', 'Filosofia política'], ['s. XVII en adelante', 'séc. XVII em diante'],
        ['Qué legitima el poder y cómo debemos convivir: contrato social, libertad, justicia y democracia.',
         'O que legitima o poder e como devemos conviver: contrato social, liberdade, justiça e democracia.']),
    _school('ilustracion', 'moderna', ['Ilustración', 'Iluminismo'], ['s. XVIII', 'séc. XVIII'],
        ['La confianza en la razón, la ciencia y la autonomía del individuo frente a la tradición y la autoridad.',
         'A confiança na razão, na ciência e na autonomia do indivíduo diante da tradição e da autoridade.']),
    _school('utilitarismo', 'moderna', ['Utilitarismo', 'Utilitarismo'], ['s. XVIII – XIX', 'séc. XVIII – XIX'],
        ['Una acción es buena si aumenta el bienestar general: la moral se mide por sus consecuencias.',
         'Uma ação é boa se aumenta o bem-estar geral: a moral se mede por suas consequências.']),
    _school('idealismo-aleman', 'moderna', ['Idealismo alemán', 'Idealismo alemão'], ['s. XVIII – XIX', 'séc. XVIII – XIX'],
        ['De Kant a Hegel: el sujeto estructura la experiencia y la historia es el despliegue de la razón y la libertad.',
         'De Kant a Hegel: o sujeito estrutura a experiência e a história é o desdobramento da razão e da liberdade.']),
    // ----- Existencia, fenomenología, hermenéutica -----
    _school('voluntarismo', 'existencia', ['Voluntarismo y filosofía de la vida', 'Voluntarismo e filosofia da vida'], ['s. XIX', 'séc. XIX'],
        ['La voluntad y la vida, no la razón pura, son el fondo de la realidad: de Schopenhauer a Nietzsche.',
         'A vontade e a vida, e não a razão pura, são o fundo da realidade: de Schopenhauer a Nietzsche.']),
    _school('existencialismo', 'existencia', ['Existencialismo', 'Existencialismo'], ['s. XIX – XX', 'séc. XIX – XX'],
        ['La existencia individual, la libertad, la angustia y la responsabilidad como puntos de partida de la filosofía.',
         'A existência individual, a liberdade, a angústia e a responsabilidade como pontos de partida da filosofia.']),
    _school('fenomenologia', 'existencia', ['Fenomenología', 'Fenomenologia'], ['s. XX', 'séc. XX'],
        ['Describir la experiencia tal como se da a la conciencia, volviendo «a las cosas mismas».',
         'Descrever a experiência tal como se dá à consciência, voltando «às coisas mesmas».']),
    _school('hermeneutica', 'existencia', ['Hermenéutica', 'Hermenêutica'], ['s. XX', 'séc. XX'],
        ['Comprender es interpretar: el lenguaje y la tradición son el horizonte en el que se da todo sentido.',
         'Compreender é interpretar: a linguagem e a tradição são o horizonte em que se dá todo sentido.']),
    _school('raciovitalismo', 'existencia', ['Raciovitalismo', 'Raciovitalismo'], ['s. XX', 'séc. XX'],
        ['La razón surge de la vida concreta: «yo soy yo y mi circunstancia». Corriente de Ortega y Gasset.',
         'A razão surge da vida concreta: «eu sou eu e a minha circunstância». Corrente de Ortega y Gasset.']),
    _school('moral-francesa', 'existencia', ['Filosofía moral francesa', 'Filosofia moral francesa'], ['s. XX', 'séc. XX'],
        ['Una filosofía de la atención, la voluntad y el compromiso con los demás, de Alain a Simone Weil.',
         'Uma filosofia da atenção, da vontade e do compromisso com os outros, de Alain a Simone Weil.']),
    // ----- Lenguaje, ciencia, pragmatismo -----
    _school('pragmatismo', 'analitica', ['Pragmatismo', 'Pragmatismo'], ['s. XIX – XX', 'séc. XIX – XX'],
        ['El significado y la verdad de una idea se miden por sus consecuencias prácticas en la experiencia.',
         'O significado e a verdade de uma ideia se medem por suas consequências práticas na experiência.']),
    _school('analitica', 'analitica', ['Filosofía analítica', 'Filosofia analítica'], ['s. XX', 'séc. XX'],
        ['Claridad lógica y análisis del lenguaje para disolver o resolver problemas: de Russell y Wittgenstein a la ética y la mente actuales.',
         'Clareza lógica e análise da linguagem para dissolver ou resolver problemas: de Russell e Wittgenstein à ética e à mente atuais.']),
    _school('ciencia', 'analitica', ['Filosofía de la ciencia', 'Filosofia da ciência'], ['s. XX', 'séc. XX'],
        ['Cómo se justifica el conocimiento científico: refutación, paradigmas, programas de investigación y pluralismo metodológico.',
         'Como se justifica o conhecimento científico: refutação, paradigmas, programas de pesquisa e pluralismo metodológico.']),
    // ----- Crítica social y estructuralismo -----
    _school('marxismo', 'critica', ['Marxismo', 'Marxismo'], ['s. XIX – XX', 'séc. XIX – XX'],
        ['Análisis del capitalismo, la historia como lucha de clases y la crítica de la ideología y la alienación.',
         'Análise do capitalismo, a história como luta de classes e a crítica da ideologia e da alienação.']),
    _school('teoria-critica', 'critica', ['Teoría crítica', 'Teoria crítica'], ['s. XX', 'séc. XX'],
        ['La Escuela de Fráncfort: crítica de la sociedad moderna, la razón instrumental y búsqueda de emancipación.',
         'A Escola de Frankfurt: crítica da sociedade moderna, da razão instrumental e busca de emancipação.']),
    _school('estructuralismo', 'critica', ['Estructuralismo', 'Estruturalismo'], ['s. XX', 'séc. XX'],
        ['El sentido surge de sistemas de relaciones (signos, parentesco, mitos) más que de sujetos individuales.',
         'O sentido surge de sistemas de relações (signos, parentesco, mitos) mais do que de sujeitos individuais.']),
    _school('postestructuralismo', 'critica', ['Postestructuralismo', 'Pós-estruturalismo'], ['s. XX', 'séc. XX'],
        ['Desconfianza ante las estructuras estables: poder, discurso, diferencia y deconstrucción.',
         'Desconfiança diante das estruturas estáveis: poder, discurso, diferença e desconstrução.']),
    _school('sociologia', 'critica', ['Teoría social y sociología', 'Teoria social e sociologia'], ['s. XIX – XX', 'séc. XIX – XX'],
        ['Pensadores de la sociedad: poder, democracia, racionalización y reproducción de las desigualdades.',
         'Pensadores da sociedade: poder, democracia, racionalização e reprodução das desigualdades.']),
    _school('etica-feminista', 'critica', ['Feminismo y ética del cuidado', 'Feminismo e ética do cuidado'], ['s. XX', 'séc. XX'],
        ['Cuestiona los supuestos de género en la filosofía y propone una ética basada en la relación y el cuidado.',
         'Questiona os pressupostos de gênero na filosofia e propõe uma ética baseada na relação e no cuidado.'])
];
