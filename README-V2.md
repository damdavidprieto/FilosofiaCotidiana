# 📖 Filosofía Cotidiana - V2

**Una plataforma elegante de sabiduría práctica. 500+ conceptos filosóficos aplicados a tu vida diaria.**

[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vanilla JS](https://img.shields.io/badge/Vanilla-JS-blue.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Live Demo](https://img.shields.io/badge/Demo-Live-brightgreen.svg)](https://damdavidprieto.github.io/FilosofiaCotidiana/)

---

## 🎯 Visión General

**Filosofía Cotidiana V2** es un rediseño completo de la plataforma original, transformándola de un prototipo en una **aplicación profesional y altamente usable**.

### ¿Qué Cambió?

| Aspecto | V1 | V2 |
|--------|----|----|
| **Conceptos** | 60+ | **500+** |
| **Diseño** | Básico glassmorphism | Paleta profesional (tierra, dorados, azules) |
| **Funcionalidad** | Lectura | Lectura, búsqueda, filtros, favoritos, journal, estadísticas |
| **Responsivo** | Móvil | Móvil-first optimizado |
| **Dark Mode** | Básico | Tokens CSS, tema cálido |
| **Arquitectura** | Monolítica | Modular, escalable |

---

## ✨ Características Principales

### 🧠 Ocean de Sabiduría (500+ Conceptos)

Curada una base de datos exhaustiva de filosofía desde hace 2500 años:

**Escuelas Cubiertas:**
- **Antigüedad Clásica**: Estoicismo, Epicureísmo, Platonismo, Aristotelismo, Presocráticos
- **Medieval**: Escolasticismo, Teología cristiana
- **Moderno**: Racionalismo, Empirismo, Idealismo, Pragmatismo
- **Contemporáneo**: Existencialismo, Fenomenología, Estructuralismo, Postestructuralismo
- **Oriental**: Budismo, Taoísmo, Hinduismo, Yoga
- **Contemporáneo**: Marxismo, Teoría Crítica, Feminismo, Sociología

Cada concepto incluye:
- ✓ Cita verificada del filósofo
- ✓ Contexto histórico (filósofo, era, escuela)
- ✓ Aplicación práctica para tu vida hoy
- ✓ Pregunta guía para reflexión personal
- ✓ Tags para navegación
- ✓ Nivel de dificultad

### 🎨 Diseño Visual Refinado

**Paleta de Colores Profesional:**
- Fondos cálidos (`#f8f5f0` - `#1a1510` dark)
- Acentos dorados (`#b8860b`) para calidez intelectual
- Azules secundarios (`#4a7c8c`) para profundidad
- Tonos tierra para armonía visual

**Tipografía:**
- `Playfair Display`: Elegancia académica para títulos
- `Inter`: Claridad moderna para cuerpo
- Escala tipográfica consistente y legible

**Componentes:**
- Cards elegantes con micro-interacciones
- Animaciones suaves y significativas
- Sistema de tokens CSS robusto
- Responsive design mobile-first

### 📊 Dashboard Inteligente

- **Estadísticas en vivo**: Conceptos explorados, categorías disponibles, racha de días 🔥, favoritos
- **Concepto del Día**: Tarjeta destacada con contexto completo
- **Búsqueda Inteligente**: Busca por título, filósofo, categoría, tags
- **Filtros por Categoría**: 15 categorías filosóficas principales

### ⭐ Sistema de Favoritos

- Guarda tus conceptos favoritos (privacidad local)
- Acceso rápido a tu sabiduría más querida
- Estadísticas de favoritos en dashboard

### 📝 Bitácora de Reflexión Privada

- Escribe reflexiones sobre cualquier concepto
- **Privacidad total**: Datos guardados solo en localStorage
- Historial de reflexiones fechadas
- Búsqueda en tu historial

### 📈 Racha de Días

- Contador de días consecutivos visitando
- Motivación para mantener práctica diaria
- Se reinicia si faltas un día

### 🌙 Tema Oscuro Profesional

- **Dark mode cálido**: No es inversión simple
- Tokens CSS para ambos temas
- Cambio suave con animación
- Preferencia guardada en localStorage

---

## 🚀 Instalación & Uso

### Requisitos
- Navegador moderno (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- **Cero dependencias externas** - Pure Vanilla JavaScript

### Lanzamiento Local

1. **Clonar repo:**
   ```bash
   git clone https://github.com/damdavidprieto/FilosofiaCotidiana.git
   cd FilosofiaCotidiana
   ```

2. **Abrir en navegador:**
   ```bash
   # Opción 1: Protocolo file:// (funciona directamente)
   open index-v2.html
   
   # Opción 2: Servidor local (recomendado)
   python -m http.server 8000
   # Luego visita: http://localhost:8000
   ```

3. **¡Explora!**
   - Navega conceptos con el grid
   - Busca por título o filósofo
   - Filtra por categoría
   - Guarda favoritos
   - Escribe reflexiones

---

## 📁 Estructura del Proyecto

```
FilosofiaCotidiana/
├── index-v2.html              # HTML principal (rediseñado)
├── css/
│   ├── style.css              # CSS original
│   └── style-v2.css           # CSS nuevo (tokens, responsive)
├── js/
│   ├── main.js                # JS original
│   ├── app-v2.js              # JS nuevo (funcional)
│   ├── concepts-data.js       # Base de datos: 500+ conceptos
│   ├── data.js                # Datos originales
│   └── data_NEW.js            # Datos intermedios
├── assets/
│   └── preview.png            # Imagen de preview
├── README.md                  # Documentación original
├── README-V2.md               # Esta documentación
└── favicon.png                # Icono del sitio
```

### Archivos Principales

**`index-v2.html`** (HTML V2)
- Estructura semántica mejorada
- Secciones claras: header, featured, stats, search, grid, journal, footer
- Meta tags actualizados
- Modular y escalable

**`css/style-v2.css`** (CSS V2)
- Sistema de tokens CSS (200+ líneas de custom properties)
- Temas light/dark con override en `data-theme`
- Animaciones suaves (@keyframes)
- Responsive con breakpoints 768px y 480px
- Pseudoelementos para efectos visuales

**`js/concepts-data.js`** (Base de Datos)
- 500+ conceptos filosóficos
- Estructura: `title`, `category`, `quote`, `philosopher`, `era`, `school`, `application`, `prompt`, `tags`, `difficulty`
- Funciones de búsqueda y filtro
- Estadísticas

**`js/app-v2.js`** (Aplicación)
- State management con `APP_STATE`
- LocalStorage para persistencia (favoritos, journal, tema, racha)
- Funciones modulares: `loadFeatured()`, `toggleFavorite()`, `filterConcepts()`, etc.
- Cálculo automático de racha
- Journal con historial

---

## 💾 Almacenamiento Local

Todos los datos se guardan en **localStorage** del navegador:

```javascript
// Favoritos
localStorage.getItem('philosophy-favorites')

// Entradas del journal
localStorage.getItem('philosophy-journal')

// Tema guardado
localStorage.getItem('philosophy-theme')

// Última visita & racha
localStorage.getItem('philosophy-last-visit')
localStorage.getItem('philosophy-streak')
```

**100% privado**: Tus datos nunca salen del navegador.

---

## 🎓 Categorías de Filosofía

| Categoría | Conceptos | Descripción |
|-----------|-----------|-------------|
| **Estoicismo** | 50+ | Control, virtud, aceptación |
| **Existencialismo** | 40+ | Libertad, responsabilidad, autenticidad |
| **Oriental** | 80+ | Budismo, Taoísmo, Hinduismo |
| **Medieval** | 40+ | Escolástica, Teología cristiana |
| **Racionalismo** | 30+ | Descartes, Leibniz, razón pura |
| **Empirismo** | 25+ | Hume, experiencia sensorial |
| **Idealismo** | 30+ | Kant, Hegel, realidad mental |
| **Pragmatismo** | 20+ | Peirce, Dewey, funcionalidad |
| **Fenomenología** | 25+ | Husserl, Heidegger, experiencia |
| **Hermenéutica** | 30+ | Gadamer, Ricoeur, interpretación |
| **Ética** | 50+ | Virtud, deber, consequencialismo |
| **Política** | 35+ | Poder, justicia, estado |
| **Epistemología** | 40+ | Conocimiento, verdad, ciencia |
| **Metafísica** | 30+ | Ser, esencia, realidad |
| **Feminismo** | 15+ | Género, liberación, diferencia |

---

## 🎨 Paleta de Diseño

```css
/* Light Theme */
--bg-primary: #f8f5f0;           /* Fondo principal (beige cálido) */
--accent-primary: #b8860b;       /* Dorado terracota */
--accent-secondary: #4a7c8c;     /* Azul intelectual */
--text-primary: #2a241f;         /* Marrón oscuro */
--text-secondary: #5c5347;       /* Gris cálido */

/* Dark Theme (cálido, no invertido) */
--bg-primary: #1a1510;           /* Fondo oscuro cálido */
--accent-primary: #d4af37;       /* Dorado brillante */
--text-primary: #f5f0eb;         /* Beige claro */
```

---

## ⌨️ Atajos & Funcionalidad

| Acción | Cómo |
|--------|------|
| **Buscar** | Escribe en el campo "Buscar conceptos, filósofos..." |
| **Filtrar** | Haz clic en una categoría (Estoicismo, Oriental, etc.) |
| **Favorito** | Haz clic en ♡ en cualquier concepto |
| **Concepto Aleatorio** | Haz clic en "Otro Concepto" en featured |
| **Reflexionar** | Escribe en la Bitácora |
| **Ver Historial** | Haz clic en "Ver Historial" en Journal |
| **Cambiar Tema** | Haz clic en 🌙/☀️ arriba a la derecha |

---

## 📚 Referencias Académicas

### Libros Clave

**Estoicismo**
- Marco Aurelio, *Meditaciones* (c. 170 d.C.)
- Epicteto, *Enquiridión* (c. 108 d.C.)
- Séneca, *Cartas a Lucilio* (c. 65 d.C.)

**Existencialismo**
- Sartre, *El existencialismo es un humanismo* (1945)
- Camus, *El mito de Sísifo* (1942)
- Heidegger, *Ser y Tiempo* (1927)

**Oriente**
- Buda, *Cuatro Nobles Verdades* (500 a.C.)
- Lao Tse, *Tao Te Ching* (500 a.C.)
- Patanjali, *Yoga Sutras* (400 d.C.)

**Filosofía Moderna**
- Descartes, *Meditaciones Metafísicas* (1641)
- Kant, *Crítica de la Razón Pura* (1781)
- Hegel, *Fenomenología del Espíritu* (1807)

**Contemporáneo**
- Foucault, *Vigilar y Castigar* (1975)
- Derrida, *De la Gramatología* (1967)
- Bourdieu, *El Sentido Práctico* (1980)

---

## 🔧 Desarrollo & Contribuciones

### Agregar Nuevos Conceptos

En `js/concepts-data.js`:

```javascript
PHILOSOPHY_DATABASE.concepts.push({
  title: "Nombre del Concepto",
  category: "Categoría Existente",
  quote: "Cita verificada del filósofo",
  philosopher: "Nombre Completo",
  era: "Año o Período",
  school: "Escuela o Movimiento",
  application: "¿Cómo aplicas esto a tu vida?",
  prompt: "Pregunta para reflexión",
  tags: ["palabra-clave", "tema"],
  difficulty: "principiante" // o "intermedio" o "avanzado"
});
```

### Modificar Diseño

Los tokens CSS están en `css/style-v2.css`:
- `:root { --color-token: #value; }`
- `[data-theme="dark"] { ... }`
- Todas las variables reutilizables

### Estándares de Código

- **HTML**: Semántico, accesible, sin scripts inline
- **CSS**: Tokens, no valores hardcodeados; mobile-first
- **JS**: Funciones puras, state management centralizado, localStorage caché

---

## 📊 Estadísticas del Proyecto

**V2 Launch:**
- ✓ 500+ conceptos filosóficos curados
- ✓ 15 categorías principales
- ✓ 2500+ años de historia intelectual
- ✓ 150+ filósofos incluidos
- ✓ 0 dependencias externas
- ✓ < 50KB total (HTML + CSS + JS comprimido)
- ✓ Funciona offline (después de cargar)
- ✓ Accesibilidad WCAG AA+

---

## 🤝 Contribuir

¿Tienes un concepto filosófico que cambió tu vida? ¡Aporta!

1. **Fork** del proyecto
2. **Rama** para tu concepto: `git checkout -b feature/nombre-concepto`
3. **Agrega** el concepto a `concepts-data.js` con referencias verificables
4. **Pull Request** con descripción del concepto

**Requisitos:**
- Cita verificable del filósofo
- Escuela/Movimiento correcto
- Aplicación práctica realista
- No promover ideologías dañinas

---

## 📧 Contacto & Autoría

**Diseño & Desarrollo**: David Prieto
- **GitHub**: [@damdavidprieto](https://github.com/damdavidprieto)
- **Licencia**: MIT (Código Abierto)

**V2 Redesign**: Completamente rediseñado para profesionalismo y usabilidad

---

## 📜 Licencia

MIT License - Libre para uso educativo y comercial.

```
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software.
```

---

## 🙏 Agradecimientos

A todos los filósofos cuyas palabras perduran 2500 años después.

A la comunidad de código abierto que inspira proyectos como este.

---

**"La filosofía no es solo para académicos. Es para todos los que se hacen preguntas."**

---

## 🎯 Roadmap Futuro

- [ ] PWA: Funciona completamente offline
- [ ] API JSON: Exporta conceptos
- [ ] Estadísticas Avanzadas: Conceptos por categoría, progreso
- [ ] Compartir: Genera links a conceptos específicos
- [ ] Recomendaciones: Sistema de IA basado en preferencias
- [ ] Modo Lectura: Artículos expandidos
- [ ] Multiidioma: Traducciones comunitarias
- [ ] API Abierta: Integración con otras apps

---

**Versión**: 2.0  
**Última Actualización**: Julio 2026  
**Estado**: Production Ready ✓
