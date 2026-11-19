/**
 * Autores y su red de maestros.
 *
 *  teachers   → maestro directo: enseñó personalmente al autor (línea continua en el mapa)
 *  influences → influencia reconocida: lo leyó, dialogó con él o lo tomó como referencia
 *               (línea discontinua). Solo se registran relaciones bien documentadas.
 *
 * Una relación solo se añade si el maestro/influencia es anterior al discípulo.
 * Los autores sin conceptos propios (Tales, Leucipo, Teofrasto…) existen para completar
 * las cadenas de transmisión.
 *
 * Fechas: negativas = a.C. `approx` marca fechas aproximadas; `label` sustituye al
 * texto de fechas cuando solo se conoce el siglo o la tradición.
 */

const PHILOSOPHERS = [];

function _p(id, name, born, died, schools, teachers, influences, bio, opts = {}) {
    PHILOSOPHERS.push({
        id,
        name: Array.isArray(name) ? { es: name[0], pt: name[1] } : { es: name, pt: name },
        born, died, schools, teachers, influences,
        bio: { es: bio[0], pt: bio[1] },
        approx: Boolean(opts.approx),
        label: opts.label || null
    });
}

// ======================= GRECIA CLÁSICA =======================
_p('tales', 'Tales de Mileto', -624, -546, ['presocraticos'], [], [],
    ['Considerado el primer filósofo griego: buscó explicar la naturaleza sin mitos y propuso el agua como principio de todo.',
     'Considerado o primeiro filósofo grego: buscou explicar a natureza sem mitos e propôs a água como princípio de tudo.'], { approx: true });
_p('anaximandro', 'Anaximandro', -610, -546, ['presocraticos'], ['tales'], [],
    ['Discípulo de Tales según la tradición. Propuso el ápeiron (lo ilimitado) como origen de todas las cosas.',
     'Discípulo de Tales segundo a tradição. Propôs o ápeiron (o ilimitado) como origem de todas as coisas.'], { approx: true });
_p('anaximenes', 'Anaxímenes', -585, -525, ['presocraticos'], ['anaximandro'], [],
    ['Discípulo de Anaximandro. Defendió que el aire, al condensarse y enrarecerse, da lugar a todo lo demás.',
     'Discípulo de Anaximandro. Defendeu que o ar, ao condensar-se e rarefazer-se, dá origem a tudo o mais.'], { approx: true });
_p('heraclito', ['Heráclito de Éfeso', 'Heráclito de Éfeso'], -540, -480, ['presocraticos'], [], [],
    ['Filósofo del cambio y del logos. Solo se conservan fragmentos de su obra, escritos en un estilo deliberadamente enigmático.',
     'Filósofo da mudança e do logos. Só se conservam fragmentos de sua obra, escritos em estilo deliberadamente enigmático.'], { approx: true });
_p('parmenides', ['Parménides de Elea', 'Parmênides de Eleia'], -515, -450, ['presocraticos'], [], [],
    ['Fundador de la escuela eleática. Su poema defiende que el ser es uno e inmutable y que el cambio es apariencia.',
     'Fundador da escola eleática. Seu poema defende que o ser é uno e imutável e que a mudança é aparência.'], { approx: true });
_p('zenon-de-elea', ['Zenón de Elea', 'Zenão de Eleia'], -490, -430, ['presocraticos'], ['parmenides'], [],
    ['Discípulo de Parménides. Ideó paradojas sobre el movimiento y la pluralidad para defender a su maestro.',
     'Discípulo de Parmênides. Criou paradoxos sobre o movimento e a pluralidade para defender seu mestre.'], { approx: true });
_p('leucipo', 'Leucipo', -480, -420, ['atomismo'], [], [],
    ['Considerado el fundador del atomismo y maestro de Demócrito. De su vida se sabe muy poco.',
     'Considerado o fundador do atomismo e mestre de Demócrito. Sabe-se muito pouco de sua vida.'], { approx: true, label: 's. V a.C.' });
_p('democrito', ['Demócrito de Abdera', 'Demócrito de Abdera'], -460, -370, ['atomismo'], ['leucipo'], [],
    ['Desarrolló el atomismo: la realidad está hecha de átomos y vacío. También escribió sobre ética y serenidad del ánimo.',
     'Desenvolveu o atomismo: a realidade é feita de átomos e vazio. Também escreveu sobre ética e serenidade de ânimo.'], { approx: true });
_p('socrates', ['Sócrates', 'Sócrates'], -470, -399, ['socratica'], [], [],
    ['No escribió nada: lo conocemos por Platón y Jenofonte. Fue condenado a muerte en Atenas por impiedad y corrupción de la juventud.',
     'Não escreveu nada: o conhecemos por Platão e Xenofonte. Foi condenado à morte em Atenas por impiedade e corrupção da juventude.']);
_p('platon', ['Platón', 'Platão'], -428, -348, ['platonismo'], ['socrates'], [],
    ['Discípulo de Sócrates y fundador de la Academia. Sus diálogos fijaron la agenda de la filosofía occidental.',
     'Discípulo de Sócrates e fundador da Academia. Seus diálogos fixaram a agenda da filosofia ocidental.']);
_p('aristoteles', ['Aristóteles', 'Aristóteles'], -384, -322, ['aristotelismo'], ['platon'], [],
    ['Veinte años discípulo de Platón, fundó el Liceo. Escribió sobre lógica, física, biología, ética y política.',
     'Vinte anos discípulo de Platão, fundou o Liceu. Escreveu sobre lógica, física, biologia, ética e política.']);
_p('teofrasto', 'Teofrasto', -371, -287, ['aristotelismo'], ['aristoteles'], [],
    ['Discípulo y sucesor de Aristóteles al frente del Liceo; destacó en botánica y en el estudio de los caracteres.',
     'Discípulo e sucessor de Aristóteles à frente do Liceu; destacou-se na botânica e no estudo dos caracteres.'], { approx: true });

// ======================= HELENISMO Y ROMA =======================
_p('antistenes', ['Antístenes', 'Antístenes'], -446, -366, ['cinismo'], ['socrates'], [],
    ['Discípulo de Sócrates, considerado precursor del cinismo por su insistencia en la virtud y la vida sencilla.',
     'Discípulo de Sócrates, considerado precursor do cinismo por sua insistência na virtude e na vida simples.'], { approx: true });
_p('diogenes', ['Diógenes de Sinope', 'Diógenes de Sinope'], -412, -323, ['cinismo'], ['antistenes'], [],
    ['El cínico más célebre: vivió sin posesiones y convirtió su propio modo de vida en una crítica de las convenciones.',
     'O cínico mais célebre: viveu sem posses e converteu seu próprio modo de vida em uma crítica das convenções.'], { approx: true });
_p('crates', ['Crates de Tebas', 'Crates de Tebas'], -365, -285, ['cinismo'], ['diogenes'], [],
    ['Discípulo de Diógenes y maestro de Zenón de Citio, con lo que conecta el cinismo con el estoicismo.',
     'Discípulo de Diógenes e mestre de Zenão de Cítio, o que liga o cinismo ao estoicismo.'], { approx: true });
_p('zenon-de-citio', ['Zenón de Citio', 'Zenão de Cítio'], -334, -262, ['estoicismo'], ['crates'], [],
    ['Fundador del estoicismo hacia el 300 a.C., llamado así por el pórtico (stoa) de Atenas donde enseñaba.',
     'Fundador do estoicismo por volta de 300 a.C., assim chamado pelo pórtico (stoa) de Atenas onde ensinava.'], { approx: true });
_p('cleantes', ['Cleantes de Aso', 'Cleantes de Assos'], -331, -232, ['estoicismo'], ['zenon-de-citio'], [],
    ['Segundo director de la escuela estoica; autor del célebre «Himno a Zeus».',
     'Segundo diretor da escola estoica; autor do célebre «Hino a Zeus».'], { approx: true });
_p('crisipo', ['Crisipo de Solos', 'Crisipo de Solos'], -279, -206, ['estoicismo'], ['cleantes'], [],
    ['Tercer director de la escuela: sistematizó la lógica y la doctrina estoicas. Casi toda su obra se ha perdido.',
     'Terceiro diretor da escola: sistematizou a lógica e a doutrina estoicas. Quase toda a sua obra se perdeu.'], { approx: true });
_p('epicuro', 'Epicuro', -341, -270, ['epicureismo'], [], ['democrito'],
    ['Fundó el Jardín en Atenas. Para él la filosofía es una terapia: vencer el miedo y vivir sin dolor entre amigos.',
     'Fundou o Jardim em Atenas. Para ele a filosofia é uma terapia: vencer o medo e viver sem dor entre amigos.']);
_p('seneca', ['Séneca', 'Sêneca'], -4, 65, ['estoicismo'], [], [],
    ['Filósofo, dramaturgo y consejero de Nerón, que lo forzó al suicidio. Sus «Cartas a Lucilio» son un manual de vida estoica.',
     'Filósofo, dramaturgo e conselheiro de Nero, que o forçou ao suicídio. Suas «Cartas a Lucílio» são um manual de vida estoica.']);
_p('musonio', 'Musonio Rufo', 30, 101, ['estoicismo'], [], [],
    ['Estoico romano que defendió la práctica diaria de la virtud y la educación de las mujeres. Maestro de Epicteto.',
     'Estoico romano que defendeu a prática diária da virtude e a educação das mulheres. Mestre de Epicteto.'], { approx: true });
_p('epicteto', 'Epicteto', 50, 135, ['estoicismo'], ['musonio'], [],
    ['Nació esclavo y llegó a ser un maestro estoico. No escribió: sus alumnos recogieron sus «Disertaciones» y el «Enquiridión».',
     'Nasceu escravo e tornou-se mestre estoico. Não escreveu: seus alunos recolheram as «Diatribes» e o «Encheiridion».'], { approx: true });
_p('marco-aurelio', ['Marco Aurelio', 'Marco Aurélio'], 121, 180, ['estoicismo'], [], ['epicteto', 'seneca'],
    ['Emperador romano. Sus «Meditaciones» son notas personales de ejercicio estoico, escritas en griego durante las campañas militares.',
     'Imperador romano. Suas «Meditações» são notas pessoais de exercício estoico, escritas em grego durante as campanhas militares.']);
_p('amonio', 'Amonio Saccas', 175, 242, ['neoplatonismo'], [], [],
    ['Maestro en Alejandría; apenas se conoce su vida y no dejó escritos. Es célebre por haber sido maestro de Plotino.',
     'Mestre em Alexandria; sua vida é pouco conhecida e não deixou escritos. É célebre por ter sido mestre de Plotino.'], { approx: true });
_p('plotino', 'Plotino', 204, 270, ['neoplatonismo'], ['amonio'], ['platon'],
    ['Fundador del neoplatonismo. Sus «Enéadas», editadas por Porfirio, describen la emanación de todo desde lo Uno.',
     'Fundador do neoplatonismo. Suas «Enéadas», editadas por Porfírio, descrevem a emanação de tudo a partir do Uno.']);
_p('porfirio', 'Porfirio de Tiro', 234, 305, ['neoplatonismo'], ['plotino'], [],
    ['Discípulo y editor de Plotino. Su «Isagoge» fue el manual de lógica más leído de la Edad Media.',
     'Discípulo e editor de Plotino. Sua «Isagoge» foi o manual de lógica mais lido da Idade Média.'], { approx: true });

// ======================= CHINA =======================
_p('laozi', ['Lao Tsé (Laozi)', 'Lao Tsé (Laozi)'], -550, null, ['taoismo'], [], [],
    ['Figura semilegendaria a quien se atribuye el «Tao Te Ching». Los estudiosos discuten si existió y cuándo se compuso la obra.',
     'Figura semilendária a quem se atribui o «Tao Te Ching». Os estudiosos discutem se existiu e quando a obra foi composta.'],
    { approx: true, label: 's. VI a.C. (tradicional)' });
_p('zhuangzi', ['Zhuangzi', 'Zhuangzi'], -369, -286, ['taoismo'], [], ['laozi'],
    ['Segundo gran clásico del taoísmo. Su libro combina humor, parábolas y escepticismo sobre el lenguaje y la identidad.',
     'Segundo grande clássico do taoísmo. Seu livro combina humor, parábolas e ceticismo sobre a linguagem e a identidade.'], { approx: true });
_p('confucio', ['Confucio', 'Confúcio'], -551, -479, ['confucianismo'], [], [],
    ['Maestro y reformador moral. Sus enseñanzas fueron recogidas por sus discípulos en los «Analectas».',
     'Mestre e reformador moral. Seus ensinamentos foram reunidos por seus discípulos nos «Analectos».']);
_p('mencio', ['Mencio', 'Mêncio'], -372, -289, ['confucianismo'], [], ['confucio'],
    ['El principal continuador de Confucio. Defendió que la naturaleza humana tiene una inclinación innata al bien.',
     'O principal continuador de Confúcio. Defendeu que a natureza humana tem uma inclinação inata ao bem.'], { approx: true });

// ======================= INDIA Y BUDISMO =======================
_p('buda', ['Buda (Siddhartha Gautama)', 'Buda (Sidarta Gautama)'], -480, -400, ['budismo'], [], [],
    ['Fundador del budismo. Las fechas de su vida son discutidas; sus enseñanzas se transmitieron oralmente antes de ponerse por escrito.',
     'Fundador do budismo. As datas de sua vida são discutidas; seus ensinamentos foram transmitidos oralmente antes de serem escritos.'],
    { approx: true, label: 'c. s. V a.C. (fechas discutidas)' });
_p('nagarjuna', ['Nagarjuna', 'Nagarjuna'], 150, 250, ['budismo'], [], ['buda'],
    ['Fundador de la escuela Madhyamaka. Su análisis de la «vacuidad» es central en el budismo Mahayana.',
     'Fundador da escola Madhyamaka. Sua análise da «vacuidade» é central no budismo Mahayana.'], { approx: true });
_p('shantideva', ['Shantideva', 'Shantideva'], 685, 763, ['budismo'], [], ['nagarjuna'],
    ['Monje indio autor de la «Guía del estilo de vida del bodisatva», texto fundamental de la compasión mahayana.',
     'Monge indiano autor do «Guia do estilo de vida do bodisatva», texto fundamental da compaixão mahayana.'], { approx: true });
_p('gita', ['Bhagavad Gita', 'Bhagavad Gita'], -400, null, ['hinduismo'], [], [],
    ['Texto del Mahabharata, tradicionalmente atribuido a Vyasa. Es un diálogo entre Arjuna y Krishna sobre el deber y la acción.',
     'Texto do Mahabharata, tradicionalmente atribuído a Vyasa. É um diálogo entre Arjuna e Krishna sobre o dever e a ação.'],
    { approx: true, label: 's. V – II a.C. (texto de autoría tradicional)' });
_p('patanjali', ['Patanjali', 'Patanjali'], -150, null, ['hinduismo'], [], [],
    ['Se le atribuye la compilación de los «Yoga Sutras». La fecha es incierta: entre el s. II a.C. y el s. IV d.C.',
     'Atribui-se a ele a compilação dos «Yoga Sutras». A data é incerta: entre o séc. II a.C. e o séc. IV d.C.'],
    { approx: true, label: 'entre s. II a.C. y s. IV d.C.' });

// ======================= MEDIEVAL =======================
_p('agustin', ['Agustín de Hipona', 'Agostinho de Hipona'], 354, 430, ['patristica'], [], ['plotino'],
    ['Obispo de Hipona. Leyó a los neoplatónicos y los integró en el cristianismo. Sus «Confesiones» inauguran la autobiografía interior.',
     'Bispo de Hipona. Leu os neoplatônicos e os integrou ao cristianismo. Suas «Confissões» inauguram a autobiografia interior.']);
_p('anselmo', ['Anselmo de Canterbury', 'Anselmo de Cantuária'], 1033, 1109, ['escolastica'], [], ['agustin'],
    ['Benedictino y arzobispo. Formuló el argumento ontológico de la existencia de Dios en su «Proslogion».',
     'Beneditino e arcebispo. Formulou o argumento ontológico da existência de Deus em seu «Proslogion».']);
_p('alberto-magno', 'Alberto Magno', 1200, 1280, ['escolastica'], [], ['aristoteles'],
    ['Dominico y naturalista que impulsó la recepción de Aristóteles en las universidades. Fue maestro de Tomás de Aquino.',
     'Dominicano e naturalista que impulsionou a recepção de Aristóteles nas universidades. Foi mestre de Tomás de Aquino.'], { approx: true });
_p('aquino', 'Tomás de Aquino', 1225, 1274, ['escolastica'], ['alberto-magno'], ['aristoteles', 'agustin'],
    ['Dominico. Su «Suma Teológica» sintetiza la fe cristiana con la filosofía de Aristóteles.',
     'Dominicano. Sua «Suma Teológica» sintetiza a fé cristã com a filosofia de Aristóteles.']);
_p('ockham', ['Guillermo de Ockham', 'Guilherme de Ockham'], 1287, 1347, ['escolastica'], [], [],
    ['Franciscano inglés, figura clave del nominalismo: solo existen individuos, los universales son nombres.',
     'Franciscano inglês, figura-chave do nominalismo: só existem indivíduos, os universais são nomes.'], { approx: true });

// ======================= MODERNA =======================
_p('hobbes', 'Thomas Hobbes', 1588, 1679, ['filosofia-politica'], [], [],
    ['Su «Leviatán» (1651) defiende un poder soberano fuerte como remedio al estado de naturaleza.',
     'Seu «Leviatã» (1651) defende um poder soberano forte como remédio ao estado de natureza.']);
_p('descartes', ['René Descartes', 'René Descartes'], 1596, 1650, ['racionalismo'], [], [],
    ['Matemático y filósofo. Buscó un fundamento indudable para el conocimiento y separó radicalmente mente y cuerpo.',
     'Matemático e filósofo. Buscou um fundamento indubitável para o conhecimento e separou radicalmente mente e corpo.']);
_p('elisabeth', ['Isabel de Bohemia', 'Isabel da Boêmia'], 1618, 1680, ['racionalismo'], [], ['descartes'],
    ['Princesa y filósofa. Su correspondencia con Descartes (1643–49) planteó la objeción clásica al dualismo mente-cuerpo.',
     'Princesa e filósofa. Sua correspondência com Descartes (1643–49) levantou a objeção clássica ao dualismo mente-corpo.']);
_p('spinoza', ['Baruch Spinoza', 'Baruch Spinoza'], 1632, 1677, ['racionalismo'], [], ['descartes'],
    ['Expulsado de la comunidad judía de Ámsterdam. Su «Ética» demuestra, al modo geométrico, que Dios es la Naturaleza.',
     'Expulso da comunidade judaica de Amsterdã. Sua «Ética» demonstra, à maneira geométrica, que Deus é a Natureza.']);
_p('locke', 'John Locke', 1632, 1704, ['empirismo', 'filosofia-politica'], [], ['descartes', 'hobbes'],
    ['Padre del empirismo y del liberalismo. Sostuvo que la mente nace «en blanco» y que el poder político requiere consentimiento.',
     'Pai do empirismo e do liberalismo. Sustentou que a mente nasce «em branco» e que o poder político requer consentimento.']);
_p('leibniz', ['Gottfried W. Leibniz', 'Gottfried W. Leibniz'], 1646, 1716, ['racionalismo'], [], ['descartes', 'spinoza'],
    ['Polímata: cocreó el cálculo infinitesimal y defendió que vivimos en «el mejor de los mundos posibles».',
     'Polímata: cocriou o cálculo infinitesimal e defendeu que vivemos no «melhor dos mundos possíveis».']);
_p('berkeley', 'George Berkeley', 1685, 1753, ['empirismo'], [], ['locke'],
    ['Obispo irlandés. Defendió que solo existen mentes e ideas: «ser es ser percibido».',
     'Bispo irlandês. Defendeu que só existem mentes e ideias: «ser é ser percebido».']);
_p('hume', 'David Hume', 1711, 1776, ['empirismo'], [], ['locke', 'berkeley'],
    ['Filósofo escocés. Llevó el empirismo hasta el escepticismo sobre la causalidad, el yo y la razón como guía de la acción.',
     'Filósofo escocês. Levou o empirismo até o ceticismo sobre a causalidade, o eu e a razão como guia da ação.']);
_p('rousseau', ['Jean-Jacques Rousseau', 'Jean-Jacques Rousseau'], 1712, 1778, ['filosofia-politica', 'ilustracion'], [], ['hobbes', 'locke'],
    ['Ginebrino. Criticó la desigualdad social y formuló la idea de voluntad general en «El contrato social» (1762).',
     'Genebrino. Criticou a desigualdade social e formulou a ideia de vontade geral em «O contrato social» (1762).']);
_p('knutzen', 'Martin Knutzen', 1713, 1751, ['ilustracion'], [], [],
    ['Profesor en Königsberg que introdujo a Kant en la física de Newton y en la filosofía de Leibniz y Wolff.',
     'Professor em Königsberg que introduziu Kant na física de Newton e na filosofia de Leibniz e Wolff.']);
_p('kant', ['Immanuel Kant', 'Immanuel Kant'], 1724, 1804, ['idealismo-aleman', 'ilustracion'], ['knutzen'], ['hume', 'rousseau', 'leibniz'],
    ['Profesor en Königsberg. Sus tres «Críticas» fijan los límites del conocimiento y fundan la moral en la autonomía de la razón.',
     'Professor em Königsberg. Suas três «Críticas» fixam os limites do conhecimento e fundam a moral na autonomia da razão.']);
_p('bentham', ['Jeremy Bentham', 'Jeremy Bentham'], 1748, 1832, ['utilitarismo'], [], ['hume'],
    ['Reformador jurídico. Fundó el utilitarismo moderno: lo correcto es lo que maximiza la felicidad.',
     'Reformador jurídico. Fundou o utilitarismo moderno: o correto é o que maximiza a felicidade.']);
_p('laplace', ['Pierre-Simon Laplace', 'Pierre-Simon Laplace'], 1749, 1827, ['ilustracion'], [], [],
    ['Matemático y astrónomo. Su «Ensayo filosófico sobre las probabilidades» expone la idea clásica del determinismo.',
     'Matemático e astrônomo. Seu «Ensaio filosófico sobre as probabilidades» expõe a ideia clássica do determinismo.']);

// ======================= CONTEMPORÁNEA (s. XIX) =======================
_p('hegel', ['G. W. F. Hegel', 'G. W. F. Hegel'], 1770, 1831, ['idealismo-aleman'], [], ['kant', 'spinoza'],
    ['Máximo representante del idealismo alemán. Entiende la historia y el pensamiento como procesos dialécticos de desarrollo.',
     'Máximo representante do idealismo alemão. Entende a história e o pensamento como processos dialéticos de desenvolvimento.']);
_p('schopenhauer', ['Arthur Schopenhauer', 'Arthur Schopenhauer'], 1788, 1860, ['voluntarismo'], [], ['kant', 'platon'],
    ['Heredero crítico de Kant que interpretó el mundo como voluntad ciega; influyó en Nietzsche, Wittgenstein y Freud.',
     'Herdeiro crítico de Kant que interpretou o mundo como vontade cega; influenciou Nietzsche, Wittgenstein e Freud.']);
_p('tocqueville', ['Alexis de Tocqueville', 'Alexis de Tocqueville'], 1805, 1859, ['sociologia', 'filosofia-politica'], [], [],
    ['Aristócrata francés. «La democracia en América» analiza las virtudes y riesgos de la igualdad.',
     'Aristocrata francês. «A democracia na América» analisa as virtudes e os riscos da igualdade.']);
_p('mill', ['John Stuart Mill', 'John Stuart Mill'], 1806, 1873, ['utilitarismo'], [], ['bentham'],
    ['Refinó el utilitarismo de Bentham y escribió «Sobre la libertad» (1859), clásico del liberalismo.',
     'Refinou o utilitarismo de Bentham e escreveu «Sobre a liberdade» (1859), clássico do liberalismo.']);
_p('kierkegaard', ['Søren Kierkegaard', 'Søren Kierkegaard'], 1813, 1855, ['existencialismo'], [], ['hegel', 'socrates'],
    ['Danés, crítico del sistema de Hegel. Pensó la existencia individual, la angustia y la fe como cuestiones de elección personal.',
     'Dinamarquês, crítico do sistema de Hegel. Pensou a existência individual, a angústia e a fé como questões de escolha pessoal.']);
_p('marx', ['Karl Marx', 'Karl Marx'], 1818, 1883, ['marxismo'], [], ['hegel'],
    ['Filósofo, economista y revolucionario. Analizó el capitalismo y entendió la historia como lucha de clases.',
     'Filósofo, economista e revolucionário. Analisou o capitalismo e entendeu a história como luta de classes.']);
_p('ritschl', 'Friedrich Ritschl', 1806, 1876, ['voluntarismo'], [], [],
    ['Filólogo clásico que fue mentor del joven Nietzsche en Bonn y Leipzig y lo recomendó para su cátedra en Basilea.',
     'Filólogo clássico que foi mentor do jovem Nietzsche em Bonn e Leipzig e o recomendou para sua cátedra em Basileia.']);
_p('nietzsche', ['Friedrich Nietzsche', 'Friedrich Nietzsche'], 1844, 1900, ['voluntarismo'], ['ritschl'], ['schopenhauer', 'heraclito'],
    ['Filólogo convertido en filósofo. Criticó la moral heredada y la metafísica; su salud lo obligó a dejar la universidad a los 34 años.',
     'Filólogo convertido em filósofo. Criticou a moral herdada e a metafísica; a saúde o obrigou a deixar a universidade aos 34 anos.']);
_p('brentano', 'Franz Brentano', 1838, 1917, ['fenomenologia'], [], ['aristoteles'],
    ['Recuperó de la escolástica la noción de intencionalidad para la psicología. Maestro de Husserl y de Freud.',
     'Recuperou da escolástica a noção de intencionalidade para a psicologia. Mestre de Husserl e de Freud.']);
_p('peirce', ['Charles S. Peirce', 'Charles S. Peirce'], 1839, 1914, ['pragmatismo'], [], ['kant'],
    ['Lógico y científico estadounidense; fundador del pragmatismo y de la semiótica.',
     'Lógico e cientista estadunidense; fundador do pragmatismo e da semiótica.']);
_p('james', 'William James', 1842, 1910, ['pragmatismo'], [], ['peirce'],
    ['Psicólogo y filósofo de Harvard. Popularizó el pragmatismo.',
     'Psicólogo e filósofo de Harvard. Popularizou o pragmatismo.']);
_p('saussure', ['Ferdinand de Saussure', 'Ferdinand de Saussure'], 1857, 1913, ['estructuralismo'], [], [],
    ['Lingüista suizo. Su «Curso de lingüística general» (1916) se publicó póstumamente a partir de apuntes de sus alumnos.',
     'Linguista suíço. Seu «Curso de linguística geral» (1916) foi publicado postumamente a partir de anotações de seus alunos.']);
_p('dewey', 'John Dewey', 1859, 1952, ['pragmatismo'], [], ['james', 'peirce', 'hegel'],
    ['Filósofo y pedagogo. Defendió una educación basada en la experiencia y una democracia entendida como forma de vida.',
     'Filósofo e pedagogo. Defendeu uma educação baseada na experiência e uma democracia entendida como forma de vida.']);
_p('husserl', ['Edmund Husserl', 'Edmund Husserl'], 1859, 1938, ['fenomenologia'], ['brentano'], [],
    ['Fundador de la fenomenología. Formado en matemáticas, asistió a las clases de Brentano en Viena.',
     'Fundador da fenomenologia. Formado em matemática, assistiu às aulas de Brentano em Viena.']);
_p('weber', ['Max Weber', 'Max Weber'], 1864, 1920, ['sociologia'], [], ['marx', 'nietzsche'],
    ['Uno de los fundadores de la sociología. Estudió la racionalización de la vida moderna, la autoridad y la política como profesión.',
     'Um dos fundadores da sociologia. Estudou a racionalização da vida moderna, a autoridade e a política como profissão.']);

// ======================= CONTEMPORÁNEA (s. XX) =======================
_p('alain', ['Alain (Émile Chartier)', 'Alain (Émile Chartier)'], 1868, 1951, ['moral-francesa'], [], [],
    ['Profesor de liceo y ensayista famoso por sus «Propos». Fue maestro de Simone Weil.',
     'Professor de liceu e ensaísta famoso por seus «Propos». Foi mestre de Simone Weil.']);
_p('russell', ['Bertrand Russell', 'Bertrand Russell'], 1872, 1970, ['analitica'], [], [],
    ['Lógico, filósofo y activista pacifista. Premio Nobel de Literatura en 1950. Fue maestro de Wittgenstein en Cambridge.',
     'Lógico, filósofo e ativista pacifista. Prêmio Nobel de Literatura em 1950. Foi mestre de Wittgenstein em Cambridge.']);
_p('jaspers', ['Karl Jaspers', 'Karl Jaspers'], 1883, 1969, ['existencialismo'], [], ['kierkegaard', 'nietzsche'],
    ['Psiquiatra convertido en filósofo. Pensó las «situaciones límite» y dirigió la tesis de Hannah Arendt.',
     'Psiquiatra convertido em filósofo. Pensou as «situações-limite» e orientou a tese de Hannah Arendt.']);
_p('ortega', ['José Ortega y Gasset', 'José Ortega y Gasset'], 1883, 1955, ['raciovitalismo'], [], ['kant'],
    ['Filósofo español formado en el neokantismo alemán. Autor de «La rebelión de las masas».',
     'Filósofo espanhol formado no neokantismo alemão. Autor de «A rebelião das massas».']);
_p('heidegger', ['Martin Heidegger', 'Martin Heidegger'], 1889, 1976, ['fenomenologia'], ['husserl'], ['aristoteles', 'kierkegaard'],
    ['Discípulo y ayudante de Husserl. «Ser y tiempo» (1927) es una de las obras más influyentes del siglo XX. Su adhesión al partido nazi (1933) sigue siendo muy debatida.',
     'Discípulo e assistente de Husserl. «Ser e tempo» (1927) é uma das obras mais influentes do século XX. Sua adesão ao partido nazista (1933) continua muito debatida.']);
_p('wittgenstein', ['Ludwig Wittgenstein', 'Ludwig Wittgenstein'], 1889, 1951, ['analitica'], ['russell'], ['schopenhauer'],
    ['Austriaco. Su «Tractatus» (1921) y sus «Investigaciones filosóficas» (1953) representan dos modos de entender el lenguaje.',
     'Austríaco. Seu «Tractatus» (1921) e suas «Investigações filosóficas» (1953) representam dois modos de entender a linguagem.']);
_p('gadamer', ['Hans-Georg Gadamer', 'Hans-Georg Gadamer'], 1900, 2002, ['hermeneutica'], ['heidegger'], [],
    ['Discípulo de Heidegger. «Verdad y método» (1960) es la obra fundamental de la hermenéutica filosófica.',
     'Discípulo de Heidegger. «Verdade e método» (1960) é a obra fundamental da hermenêutica filosófica.']);
_p('adorno', ['Theodor W. Adorno', 'Theodor W. Adorno'], 1903, 1969, ['teoria-critica'], [], ['marx', 'hegel'],
    ['Miembro de la Escuela de Fráncfort. Con Horkheimer escribió «Dialéctica de la Ilustración» (1944).',
     'Membro da Escola de Frankfurt. Com Horkheimer escreveu «Dialética do Esclarecimento» (1944).']);
_p('canguilhem', 'Georges Canguilhem', 1904, 1995, ['postestructuralismo'], [], [],
    ['Filósofo e historiador de la ciencia y la medicina; dirigió la tesis doctoral de Foucault.',
     'Filósofo e historiador da ciência e da medicina; orientou a tese de doutorado de Foucault.']);
_p('arendt', ['Hannah Arendt', 'Hannah Arendt'], 1906, 1975, ['filosofia-politica'], ['heidegger', 'jaspers'], [],
    ['Discípula de Heidegger y doctoranda de Jaspers. Analizó el totalitarismo y la condición humana de la acción política.',
     'Discípula de Heidegger e doutoranda de Jaspers. Analisou o totalitarismo e a condição humana da ação política.']);
_p('levinas', ['Emmanuel Levinas', 'Emmanuel Levinas'], 1906, 1995, ['fenomenologia'], ['husserl', 'heidegger'], [],
    ['Estudió con Husserl y Heidegger en Friburgo. Sitúa la ética como filosofía primera: el encuentro con el rostro del otro.',
     'Estudou com Husserl e Heidegger em Friburgo. Situa a ética como filosofia primeira: o encontro com o rosto do outro.']);
_p('sartre', ['Jean-Paul Sartre', 'Jean-Paul Sartre'], 1905, 1980, ['existencialismo'], [], ['husserl', 'heidegger'],
    ['Filósofo, novelista y dramaturgo. Rechazó el Nobel de 1964. Su obra clave es «El ser y la nada» (1943).',
     'Filósofo, romancista e dramaturgo. Recusou o Nobel de 1964. Sua obra-chave é «O ser e o nada» (1943).']);
_p('beauvoir', ['Simone de Beauvoir', 'Simone de Beauvoir'], 1908, 1986, ['existencialismo', 'etica-feminista'], [], ['sartre'],
    ['Su «El segundo sexo» (1949) es un texto fundacional del feminismo contemporáneo. Compañera intelectual de Sartre.',
     'Seu «O segundo sexo» (1949) é um texto fundador do feminismo contemporâneo. Companheira intelectual de Sartre.']);
_p('weil', ['Simone Weil', 'Simone Weil'], 1909, 1943, ['moral-francesa'], ['alain'], ['platon'],
    ['Alumna de Alain, filósofa, obrera y militante. Su pensamiento une ética, política y una mística de la atención.',
     'Aluna de Alain, filósofa, operária e militante. Seu pensamento une ética, política e uma mística da atenção.']);
_p('levi-strauss', ['Claude Lévi-Strauss', 'Claude Lévi-Strauss'], 1908, 2009, ['estructuralismo'], [], ['saussure'],
    ['Antropólogo, aplicó el modelo de la lingüística estructural a los mitos y al parentesco.',
     'Antropólogo, aplicou o modelo da linguística estrutural aos mitos e ao parentesco.']);
_p('camus', ['Albert Camus', 'Albert Camus'], 1913, 1960, ['existencialismo'], [], ['nietzsche', 'kierkegaard'],
    ['Escritor y filósofo, Nobel de Literatura 1957. Rechazó que lo llamaran existencialista y habló de «absurdo» y «revuelta».',
     'Escritor e filósofo, Nobel de Literatura 1957. Recusou ser chamado de existencialista e falou de «absurdo» e «revolta».']);
_p('popper', ['Karl Popper', 'Karl Popper'], 1902, 1994, ['ciencia'], [], ['hume', 'kant'],
    ['Austriaco nacionalizado británico. Propuso la falsabilidad como criterio de la ciencia y defendió la «sociedad abierta».',
     'Austríaco naturalizado britânico. Propôs a falseabilidade como critério da ciência e defendeu a «sociedade aberta».']);
_p('rawls', 'John Rawls', 1921, 2002, ['analitica', 'filosofia-politica'], [], ['kant', 'hume'],
    ['Su «Teoría de la justicia» (1971) renovó la filosofía política con la idea de justicia como equidad.',
     'Sua «Teoria da justiça» (1971) renovou a filosofia política com a ideia de justiça como equidade.']);
_p('foot', 'Philippa Foot', 1920, 2010, ['analitica'], [], [],
    ['Filósofa británica, renovadora de la ética de la virtud. Formuló en 1967 el dilema del tranvía.',
     'Filósofa britânica, renovadora da ética da virtude. Formulou em 1967 o dilema do bonde.']);
_p('lakatos', ['Imre Lakatos', 'Imre Lakatos'], 1922, 1974, ['ciencia'], [], ['popper'],
    ['Húngaro. Matizó el falsacionismo de Popper con su metodología de los programas de investigación científica.',
     'Húngaro. Matizou o falseacionismo de Popper com sua metodologia dos programas de pesquisa científica.']);
_p('kuhn', ['Thomas S. Kuhn', 'Thomas S. Kuhn'], 1922, 1996, ['ciencia'], [], [],
    ['Historiador de la ciencia. «La estructura de las revoluciones científicas» (1962) popularizó la noción de paradigma.',
     'Historiador da ciência. «A estrutura das revoluções científicas» (1962) popularizou a noção de paradigma.']);
_p('feyerabend', ['Paul Feyerabend', 'Paul Feyerabend'], 1924, 1994, ['ciencia'], [], ['popper'],
    ['Austriaco. «Contra el método» (1975) defiende el pluralismo metodológico frente a cualquier método único.',
     'Austríaco. «Contra o método» (1975) defende o pluralismo metodológico frente a qualquer método único.']);
_p('foucault', ['Michel Foucault', 'Michel Foucault'], 1926, 1984, ['postestructuralismo'], ['canguilhem'], ['nietzsche', 'heidegger'],
    ['Historiador de las ideas. Estudió cómo el poder y el saber se conforman mutuamente en las prisiones, la medicina y la sexualidad.',
     'Historiador das ideias. Estudou como o poder e o saber se constituem mutuamente nas prisões, na medicina e na sexualidade.']);
_p('gettier', 'Edmund Gettier', 1927, 2021, ['analitica'], [], [],
    ['Su artículo de tres páginas de 1963 cuestionó la definición del conocimiento como creencia verdadera justificada.',
     'Seu artigo de três páginas de 1963 questionou a definição do conhecimento como crença verdadeira justificada.']);
_p('habermas', 'Jürgen Habermas', 1929, null, ['teoria-critica'], ['adorno'], [],
    ['Fue ayudante de Adorno. Desarrolló una teoría de la acción comunicativa y de la esfera pública democrática.',
     'Foi assistente de Adorno. Desenvolveu uma teoria da ação comunicativa e da esfera pública democrática.']);
_p('derrida', ['Jacques Derrida', 'Jacques Derrida'], 1930, 2004, ['postestructuralismo'], [], ['husserl', 'heidegger', 'levinas'],
    ['Creador de la deconstrucción: leer los textos atendiendo a las oposiciones y exclusiones que los sostienen.',
     'Criador da desconstrução: ler os textos atentando às oposições e exclusões que os sustentam.']);
_p('bourdieu', ['Pierre Bourdieu', 'Pierre Bourdieu'], 1930, 2002, ['sociologia'], [], ['weber', 'marx', 'levi-strauss'],
    ['Sociólogo francés. Estudió cómo la cultura y la educación reproducen las desigualdades sociales.',
     'Sociólogo francês. Estudou como a cultura e a educação reproduzem as desigualdades sociais.']);
_p('gilligan', 'Carol Gilligan', 1936, null, ['etica-feminista'], [], [],
    ['Psicóloga estadounidense. «La moral y la teoría» (1982) abrió el debate sobre la ética del cuidado.',
     'Psicóloga estadunidense. «Uma voz diferente» (1982) abriu o debate sobre a ética do cuidado.']);
_p('vattimo', 'Gianni Vattimo', 1936, 2023, ['hermeneutica'], ['gadamer'], ['nietzsche', 'heidegger'],
    ['Italiano, discípulo de Gadamer y de Pareyson. Con el «pensamiento débil» propone una filosofía sin fundamentos últimos.',
     'Italiano, discípulo de Gadamer e de Pareyson. Com o «pensamento fraco» propõe uma filosofia sem fundamentos últimos.']);
_p('nozick', 'Robert Nozick', 1938, 2002, ['analitica'], [], [],
    ['Autor de «Anarquía, Estado y utopía» (1974) y de la «máquina de experiencias». Publicó en 1969 el problema de Newcomb.',
     'Autor de «Anarquia, Estado e utopia» (1974) e da «máquina de experiências». Publicou em 1969 o problema de Newcomb.']);
_p('searle', 'John Searle', 1932, null, ['analitica'], [], [],
    ['Filósofo del lenguaje y de la mente. Propuso en 1980 el argumento de la habitación china.',
     'Filósofo da linguagem e da mente. Propôs em 1980 o argumento do quarto chinês.']);
_p('chalmers', 'David Chalmers', 1966, null, ['analitica'], [], [],
    ['Filósofo de la mente. Formuló en 1995 el «problema difícil de la conciencia».',
     'Filósofo da mente. Formulou em 1995 o «problema difícil da consciência».']);
