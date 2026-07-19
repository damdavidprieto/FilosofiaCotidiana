/**
 * Translations - Español / Português
 */

const TRANSLATIONS = {
    es: {
        header_title: "📖 Filosofía Cotidiana",
        header_subtitle: "500+ Conceptos de Sabiduría Aplicados",
        header_tagline: "Explora el pensamiento de los grandes filósofos y aplícalo a tu vida diaria",
        featured_label: "✨ Concepto del Día",
        featured_philosopher: "Filósofo",
        featured_school: "Escuela",
        featured_application: "Aplicación",
        btn_another_concept: "Otro Concepto",
        btn_favorite: "♡ Favorito",
        btn_favorite_active: "♥ Favorito",
        stat_concepts: "Conceptos",
        stat_categories: "Categorías",
        stat_streak: "Racha 🔥",
        stat_favorites: "Favoritos",
        search_concepts: "Buscar conceptos, filósofos...",
        section_concepts: "📚 Conceptos Filosóficos",
        section_paradoxes: "🎭 Paradojas Filosóficas",
        paradoxes_subtitle: "Dilemas clásicos que desafían tu lógica",
        search_paradoxes: "Buscar paradojas...",
        section_journal: "📝 Mi Bitácora de Reflexión",
        journal_prompt: "Pregunta del día: ¿Cómo puedes aplicar la sabiduría a tu vida hoy?",
        journal_placeholder: "Escribe tu reflexión aquí. Solo tú lo verás...",
        btn_save_reflection: "Guardar Reflexión",
        btn_view_history: "Ver Historial",
        privacy_note: "🔒 Privacidad total: Tus datos nunca salen de este navegador.",
        journal_title: "Mis Reflexiones",
        section_about: "📚 Sobre Este Proyecto",
        about_description: "Filosofía Cotidiana es un proyecto dedicado a acercar el pensamiento profundo a la vida real. Cada concepto incluye:",
        about_verified: "✓ Una cita verificada del filósofo original",
        about_context: "✓ Contexto histórico y escuela de pensamiento",
        about_practical: "✓ Aplicación práctica para tu vida hoy",
        about_questions: "✓ Preguntas para tu reflexión personal",
        about_references: "✓ Referencias académicas y fuentes",
        about_footer: "Creado con rigor por David Prieto | MIT License",
        footer_quote: "\"La filosofía no es solo para académicos. Es para todos los que se hacen preguntas.\"",
        footer_copyright: "&copy; 2026 Filosofía Cotidiana",
        btn_previous: "← Anterior",
        btn_next: "Siguiente →",
        pagination_page: "Página {page} de {total}",
        no_concepts_found: "No se encontraron conceptos. Intenta otra búsqueda.",
        no_paradoxes_found: "No se encontraron paradoxes.",
        paradox_dilemma: "🤔 El Dilema",
        paradox_reflection: "💭 Reflexión",
        paradox_application: "🎯 Aplicación",
        paradox_origin: "📚 Origen",
        btn_close: "Cerrar",
        alert_reflection_saved: "Reflexión guardada. ¡Excelente trabajo!",
        alert_write_reflection: "Por favor escribe algo en tu reflexión."
    },
    pt: {
        header_title: "📖 Filosofia Cotidiana",
        header_subtitle: "500+ Conceitos de Sabedoria Aplicados",
        header_tagline: "Explore o pensamento dos grandes filósofos e aplique à sua vida diária",
        featured_label: "✨ Conceito do Dia",
        featured_philosopher: "Filósofo",
        featured_school: "Escola",
        featured_application: "Aplicação",
        btn_another_concept: "Outro Conceito",
        btn_favorite: "♡ Favorito",
        btn_favorite_active: "♥ Favorito",
        stat_concepts: "Conceitos",
        stat_categories: "Categorias",
        stat_streak: "Sequência 🔥",
        stat_favorites: "Favoritos",
        search_concepts: "Buscar conceitos, filósofos...",
        section_concepts: "📚 Conceitos Filosóficos",
        section_paradoxes: "🎭 Paradoxos Filosóficos",
        paradoxes_subtitle: "Dilemas clássicos que desafiam sua lógica",
        search_paradoxes: "Buscar paradoxos...",
        section_journal: "📝 Meu Diário de Reflexão",
        journal_prompt: "Pergunta do dia: Como você pode aplicar a sabedoria à sua vida hoje?",
        journal_placeholder: "Escreva sua reflexão aqui. Apenas você verá...",
        btn_save_reflection: "Salvar Reflexão",
        btn_view_history: "Ver Histórico",
        privacy_note: "🔒 Privacidade total: Seus dados nunca saem deste navegador.",
        journal_title: "Minhas Reflexões",
        section_about: "📚 Sobre Este Projeto",
        about_description: "Filosofia Cotidiana é um projeto dedicado a aproximar o pensamento profundo da vida real. Cada conceito inclui:",
        about_verified: "✓ Uma citação verificada do filósofo original",
        about_context: "✓ Contexto histórico e escola de pensamento",
        about_practical: "✓ Aplicação prática para sua vida hoje",
        about_questions: "✓ Questões para sua reflexão pessoal",
        about_references: "✓ Referências acadêmicas e fontes",
        about_footer: "Criado com rigor por David Prieto | Licença MIT",
        footer_quote: "\"A filosofia não é apenas para acadêmicos. É para todos os que fazem perguntas.\"",
        footer_copyright: "&copy; 2026 Filosofia Cotidiana",
        btn_previous: "← Anterior",
        btn_next: "Próximo →",
        pagination_page: "Página {page} de {total}",
        no_concepts_found: "Nenhum conceito encontrado. Tente outra busca.",
        no_paradoxes_found: "Nenhum paradoxo encontrado.",
        paradox_dilemma: "🤔 O Dilema",
        paradox_reflection: "💭 Reflexão",
        paradox_application: "🎯 Aplicação",
        paradox_origin: "📚 Origem",
        btn_close: "Fechar",
        alert_reflection_saved: "Reflexão salva. Excelente trabalho!",
        alert_write_reflection: "Por favor, escreva algo em sua reflexão."
    }
};

// Obtener idioma actual
function getCurrentLanguage() {
    return localStorage.getItem('philosophy-language') || 'es';
}

// Establecer idioma
function setLanguage(lang) {
    if (TRANSLATIONS[lang]) {
        localStorage.setItem('philosophy-language', lang);
        location.reload();
    }
}

// Obtener traducción
function t(key) {
    const lang = getCurrentLanguage();
    return TRANSLATIONS[lang][key] || TRANSLATIONS['es'][key] || key;
}
