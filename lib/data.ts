// ============================================================
//  ✦ EDITA TU INFORMACIÓN AQUÍ · EDIT YOUR INFO HERE ✦
//  Contenido bilingüe (EN/ES). Lo neutral (email, redes, links,
//  niveles, emojis) va una sola vez; lo textual va en ambos idiomas.
// ============================================================

import type { Lang } from "./i18n";

// ---------- Datos neutrales (no cambian con el idioma) ----------
export const profile = {
  name: "Camila Quimbaya",
  firstName: "Camila",
  alias: "@camila.dev",
  email: "camila111paco@gmail.com",
  whatsapp: {
    display: "+57 315 079 0005",
    link: "https://wa.me/573150790005",
  },
  available: true,
  socials: [
    { label: "WhatsApp", href: "https://wa.me/573150790005", icon: "whatsapp" },
    { label: "GitHub", href: "https://github.com/camilaquimbaya", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/camila-quimbaya/", icon: "linkedin" },
    { label: "Discord: camilaquimbaya", href: "https://discord.com/users/camilaquimbaya", icon: "discord" },
    { label: "Email", href: "mailto:camila111paco@gmail.com", icon: "mail" },
  ],
};

// Base neutral de proyectos (tags, emoji, gradiente, links).
// El título y la descripción se traducen abajo en cada idioma.
// link = demo en vivo (omitir si está caído). repo = código en GitHub.
// enterprise = trabajo privado sin link público.
const projectsBase = [
  {
    tags: ["Angular", "TypeScript", "Azure DevOps", "PrimeNG"],
    icon: "building",
    iconColor: "#c084fc",
    gradient: "from-neon-purple/40 to-neon-cyan/30",
    enterprise: true,
  },
  {
    tags: ["React", "TypeScript", "API"],
    icon: "film",
    iconColor: "#ff4fd8",
    gradient: "from-neon-pink/40 to-neon-purple/30",
    link: "https://movieview-one.vercel.app",
    repo: "https://github.com/CamilaQuimbaya/movieview",
  },
  {
    tags: ["TypeScript", "Frontend", "React"],
    icon: "briefcase",
    iconColor: "#22d3ee",
    gradient: "from-neon-cyan/40 to-neon-pink/30",
    link: "https://prueba-tecnica-nttdata.vercel.app",
    repo: "https://github.com/CamilaQuimbaya/Prueba-tecnica-nttdata",
  },
  {
    tags: ["Angular", "TypeScript", "SPA"],
    icon: "note",
    iconColor: "#e0aaff",
    gradient: "from-neon-violet/40 to-neon-cyan/30",
    repo: "https://github.com/CamilaQuimbaya/appnotitas",
  },
  {
    tags: ["Solidity", "Next.js", "Web3"],
    icon: "chain",
    iconColor: "#22d3ee",
    gradient: "from-neon-cyan/40 to-neon-violet/30",
    repo: "https://github.com/CamilaQuimbaya/kiichain",
  },
  {
    tags: ["Node.js", "Express", "JWT", "REST"],
    icon: "server",
    iconColor: "#ff8fe0",
    gradient: "from-neon-pink/40 to-neon-violet/30",
    repo: "https://github.com/CamilaQuimbaya/Backend-crud-y-jwt",
  },
];

// ---------- Tipos ----------
export type Skill = { name: string; level: number; emoji: string };
export type SkillGroup = { key: string; title: string; skills: Skill[] };
export type Project = {
  title: string;
  description: string;
  tags: string[];
  icon: string;
  iconColor: string;
  gradient: string;
  link?: string;
  repo?: string;
  enterprise?: boolean;
};

// ---------- Diccionarios bilingües ----------
const dictionaries = {
  en: {
    nav: [
      { label: "Home", href: "#inicio" },
      { label: "About", href: "#sobre-mi" },
      { label: "Skills", href: "#skills" },
      { label: "Projects", href: "#proyectos" },
      { label: "Contact", href: "#contacto" },
    ],
    ui: {
      cta: "Let's talk",
      available: "Available for new projects",
      greeting: (name: string) => `Hi, I'm ${name}`,
      heroTitle: ["Full Stack", "Tech Lead", "UX/UI", "Designer"],
      tagline:
        "I build beautiful, fast and accessible digital products end to end — and I teach others to do the same.",
      viewProjects: "View projects",
      contactMe: "Contact me",
      downloadCV: "Download CV",
      navHint: "Use the cat or the ← → keys to navigate",
      location: "Latin America · Remote",
    },
    about: {
      kicker: "about me",
      title: "About me",
      paragraphs: [
        "I'm a full stack developer and UX/UI designer who cares about the exact point where clean code meets a design people fall in love with.",
        "I design in Figma, prototype, and ship to production with React, Angular and Next.js on the front, and Node.js, C#/.NET and Go on the back — backed by SQL and NoSQL databases and well-thought-out APIs. The details matter to me: a microinteraction, a perfect gradient, a loading state that feels right.",
        "I'm also a programming teacher. I help people learn to code from scratch and design interfaces that delight — and nothing beats watching a difficult concept finally click.",
        "When I'm not coding or teaching, I'm usually sketching interfaces, playing something retro, or collecting color palettes.",
      ],
      stats: [
        { value: "+30", label: "Projects delivered" },
        { value: "+200", label: "Students taught" },
        { value: "+5", label: "Years creating" },
        { value: "∞", label: "Cups of coffee" },
      ],
      fact: {
        title: "Fact sheet",
        availability: "Available for work",
        rows: [
          { k: "Role", v: "Full Stack · UX/UI · Teacher" },
          { k: "Location", v: "Latin America · Remote" },
          { k: "Experience", v: "5+ years" },
          { k: "Languages", v: "Spanish, English" },
          { k: "Focus", v: "React · Node · C# · SQL/NoSQL" },
          { k: "Email", v: "camila111paco@gmail.com" },
        ],
      },
    },
    skills: {
      kicker: "my stack",
      title: "Skills & Tools",
      subtitle: "The kit I use to design and build end to end.",
      groups: [
        {
          key: "frontend",
          title: "Frontend",
          skills: [
            { name: "React / Next.js", level: 95, emoji: "⚛️" },
            { name: "Angular", level: 92, emoji: "🅰️" },
            { name: "TypeScript", level: 92, emoji: "🔷" },
            { name: "Tailwind CSS", level: 95, emoji: "💨" },
            { name: "Bootstrap", level: 88, emoji: "🅱️" },
            { name: "Redux", level: 85, emoji: "🔄" },
          ],
        },
        {
          key: "backend",
          title: "Backend",
          skills: [
            { name: "Node.js", level: 90, emoji: "🟢" },
            { name: "C# / .NET", level: 85, emoji: "💠" },
            { name: "Golang", level: 80, emoji: "🐹" },
            { name: "PHP", level: 80, emoji: "🐘" },
            { name: "REST / GraphQL", level: 85, emoji: "🔗" },
            { name: "RabbitMQ / Kafka", level: 78, emoji: "📨" },
          ],
        },
        {
          key: "databases",
          title: "Databases",
          skills: [
            { name: "PostgreSQL", level: 88, emoji: "🗄️" },
            { name: "MySQL", level: 85, emoji: "🗃️" },
            { name: "MongoDB", level: 85, emoji: "🍃" },
            { name: "Redis", level: 80, emoji: "⚡" },
          ],
        },
        {
          key: "devops",
          title: "DevOps & Tools",
          skills: [
            { name: "Azure DevOps", level: 88, emoji: "☁️" },
            { name: "Docker", level: 85, emoji: "🐳" },
            { name: "Kubernetes", level: 78, emoji: "☸️" },
            { name: "Git", level: 92, emoji: "🌿" },
            { name: "CI/CD", level: 85, emoji: "🔁" },
          ],
        },
        {
          key: "design",
          title: "UX/UI Design",
          skills: [
            { name: "Figma", level: 95, emoji: "🎯" },
            { name: "Design Systems", level: 90, emoji: "🧩" },
            { name: "Prototyping", level: 88, emoji: "🪄" },
            { name: "User Research", level: 80, emoji: "🔍" },
          ],
        },
        {
          key: "teaching",
          title: "Teaching",
          skills: [
            { name: "Teaching code", level: 95, emoji: "📚" },
            { name: "1:1 Mentoring", level: 92, emoji: "🤝" },
            { name: "Course creation", level: 88, emoji: "🎓" },
            { name: "Public speaking", level: 85, emoji: "🎤" },
          ],
        },
      ] as SkillGroup[],
    },
    projects: {
      kicker: "my work",
      title: "Featured projects",
      subtitle: "A selection of work I'm proud of — from enterprise apps to personal builds.",
      enterprise: "Enterprise · private",
      items: [
        {
          title: "Conecta",
          description:
            "Enterprise Angular platform I lead as Frontend Tech Lead — architecture, CI/CD with Azure DevOps and a scalable component system.",
        },
        {
          title: "MovieView",
          description:
            "Movie discovery app built with React + TypeScript, consuming a movies API with search and detail views.",
        },
        {
          title: "NTT Data Technical Test",
          description:
            "Frontend technical challenge solved with TypeScript — clean architecture, API consumption and a polished UI.",
        },
        {
          title: "Appnotitas",
          description:
            "Notes app built with Angular — create, edit and organize notes with a clean, reactive interface.",
        },
        {
          title: "KiiChain",
          description:
            "Smart contract in Solidity with a Next.js frontend — my dive into Web3 and blockchain development.",
        },
        {
          title: "Backend CRUD + JWT",
          description:
            "REST API with Node.js & Express: full CRUD plus JWT authentication and protected routes.",
        },
      ],
    },
    contact: {
      kicker: "say hi",
      title: "Let's work together",
      text: "Tell me about your idea or project — or just say hi. I reply quickly and with genuine enthusiasm.",
      form: {
        name: "Your name",
        email: "Your email",
        message: "Your message",
        send: "Send message",
        sending: "Sending...",
        thanks: "Thank you!",
        success: "Message sent! I'll get back to you soon.",
        error: "Something went wrong. Try WhatsApp or email below.",
        orEmail: "or write me directly:",
      },
      quick: "Quick contact",
      orForm: "or send me a message",
      prefill: "Hi Camila, I saw your portfolio and I'd love to talk.",
    },
    footer: {
      made: "Built with Next.js & Tailwind",
      coffee: "",
      tagline: "stay kawaii · keep coding",
    },
    music: {
      play: "Play lofi music",
      pause: "Pause music",
      hint: "Add your track at public/music/lofi.mp3",
    },
    cv: {
      labels: {
        profile: "Profile",
        experience: "Experience",
        education: "Education",
        skills: "Skills",
        projects: "Projects",
        contact: "Contact",
        languages: "Languages",
      },
      languages: ["Spanish (native)", "English (professional)"],
      experience: [
        {
          role: "Senior Frontend Developer · Tech Lead",
          company: "Fondo de Empleados Cavipetrol",
          period: "Sep 2025 — Present",
          bullets: [
            "Frontend Tech Lead for Conecta, an enterprise-grade Angular app — I own the architecture, technical vision and delivery.",
            "Lead and mentor the frontend team; drive Agile ceremonies and code reviews to keep a scalable, high-quality codebase.",
            "Design and maintain CI/CD pipelines with Azure DevOps (builds, tests, deploys) plus branching and release workflows.",
          ],
        },
        {
          role: "Software Development Teacher",
          company: "BIT — Bogotá Institute of Technology",
          period: "May 2023 — Present",
          bullets: [
            "Teach HTML, CSS, JavaScript, React and PHP, equipping 200+ students with versatile, job-ready tech skills.",
          ],
        },
        {
          role: "Backend Developer",
          company: "Osnet Wireless",
          period: "Jan 2025 — Sep 2025",
          bullets: [
            "Built scalable, high-performance APIs and microservices with Golang and Node.js (concurrency, workers, event-driven).",
            "Worked with MongoDB, PostgreSQL and Redis, plus RabbitMQ/Kafka; deployed with Docker, Kubernetes and CI/CD.",
            "Applied Clean Code, DDD and SOLID for maintainable, secure systems.",
          ],
        },
        {
          role: "Frontend Developer",
          company: "Osnet Wireless",
          period: "Mar 2024 — Sep 2025",
          bullets: [
            "Developed frontend web apps with Next.js and Angular (Dockerized), building and maintaining client solutions.",
          ],
        },
        {
          role: "Junior Software Developer",
          company: "Software Company",
          period: "Jun 2022 — Mar 2024",
          bullets: [
            "Built React.js, TypeScript and Redux apps with a Node.js backend; worked in Scrum and designed UIs in Figma.",
          ],
        },
        {
          role: "Freelance Graphic Designer",
          company: "Self-employed",
          period: "Oct 2019 — Jul 2023",
          bullets: [
            "Designed branding and graphic assets for clients with Adobe Illustrator.",
          ],
        },
      ],
      education: [
        { title: "Software Engineering (Engineer's Degree)", place: "Politécnico Grancolombiano", period: "Feb 2023 — Dec 2025" },
        { title: "Software Development Technologist", place: "SENA", period: "Nov 2022 — Nov 2025" },
        { title: "Programming Technician · Python, Java, SQL", place: "Universidad Autónoma de Bucaramanga", period: "2022" },
        { title: "Fullstack Bootcamp · Angular, Node.js, MongoDB", place: "BIT — Bogotá Institute of Technology", period: "2021 — 2022" },
        { title: "Frontend Dev & UX/UI Design", place: "Platzi", period: "Jun 2021 — Present" },
        { title: "Graphic Design", place: "Universidad Santo Tomás", period: "2017 — 2021" },
      ],
    },
    marquee: [
      "React", "Next.js", "Angular", "TypeScript", "Node.js", "C#", "Golang",
      "SQL", "NoSQL", "MongoDB", "Tailwind", "Bootstrap", "Figma",
      "UX Research", "Design Systems", "Teaching", "GraphQL", "Accessibility",
    ],
    langButton: "ES",
  },

  es: {
    nav: [
      { label: "Inicio", href: "#inicio" },
      { label: "Sobre mí", href: "#sobre-mi" },
      { label: "Skills", href: "#skills" },
      { label: "Proyectos", href: "#proyectos" },
      { label: "Contacto", href: "#contacto" },
    ],
    ui: {
      cta: "Hablemos",
      available: "Disponible para proyectos nuevos",
      greeting: (name: string) => `Hola, soy ${name}`,
      heroTitle: ["Full Stack", "Tech Lead", "UX/UI", "Designer"],
      tagline:
        "Construyo productos digitales bonitos, rápidos y accesibles de punta a punta — y enseño a otras personas a hacer lo mismo.",
      viewProjects: "Ver proyectos",
      contactMe: "Contáctame",
      downloadCV: "Descargar CV",
      navHint: "Usa el gatito o las flechas ← → para navegar",
      location: "Latinoamérica · Remoto",
    },
    about: {
      kicker: "about me",
      title: "Sobre mí",
      paragraphs: [
        "Soy desarrolladora full stack y diseñadora UX/UI, y me importa el punto exacto donde el código limpio se encuentra con un diseño que enamora.",
        "Diseño en Figma, prototipo y llevo a producción con React, Angular y Next.js en el front, y Node.js, C#/.NET y Go en el back — con bases de datos SQL y NoSQL y APIs bien pensadas. Los detalles me importan: una microinteracción, un gradiente perfecto, un loading que se siente bien.",
        "También soy profesora de programación. Ayudo a otras personas a aprender a programar desde cero y a diseñar interfaces que enamoran, y nada se compara con ver caer la ficha de un concepto difícil.",
        "Cuando no estoy programando o enseñando, suelo estar bocetando interfaces, jugando algo retro o coleccionando paletas de colores.",
      ],
      stats: [
        { value: "+30", label: "Proyectos entregados" },
        { value: "+200", label: "Estudiantes enseñados" },
        { value: "+5", label: "Años creando" },
        { value: "∞", label: "Tazas de café" },
      ],
      fact: {
        title: "Ficha técnica",
        availability: "Disponible para trabajar",
        rows: [
          { k: "Rol", v: "Full Stack · UX/UI · Profe" },
          { k: "Ubicación", v: "Latinoamérica · Remoto" },
          { k: "Experiencia", v: "+5 años" },
          { k: "Idiomas", v: "Español, Inglés" },
          { k: "Enfoque", v: "React · Node · C# · SQL/NoSQL" },
          { k: "Email", v: "camila111paco@gmail.com" },
        ],
      },
    },
    skills: {
      kicker: "my stack",
      title: "Skills & Herramientas",
      subtitle: "El kit con el que diseño y construyo de punta a punta.",
      groups: [
        {
          key: "frontend",
          title: "Frontend",
          skills: [
            { name: "React / Next.js", level: 95, emoji: "⚛️" },
            { name: "Angular", level: 92, emoji: "🅰️" },
            { name: "TypeScript", level: 92, emoji: "🔷" },
            { name: "Tailwind CSS", level: 95, emoji: "💨" },
            { name: "Bootstrap", level: 88, emoji: "🅱️" },
            { name: "Redux", level: 85, emoji: "🔄" },
          ],
        },
        {
          key: "backend",
          title: "Backend",
          skills: [
            { name: "Node.js", level: 90, emoji: "🟢" },
            { name: "C# / .NET", level: 85, emoji: "💠" },
            { name: "Golang", level: 80, emoji: "🐹" },
            { name: "PHP", level: 80, emoji: "🐘" },
            { name: "REST / GraphQL", level: 85, emoji: "🔗" },
            { name: "RabbitMQ / Kafka", level: 78, emoji: "📨" },
          ],
        },
        {
          key: "databases",
          title: "Bases de datos",
          skills: [
            { name: "PostgreSQL", level: 88, emoji: "🗄️" },
            { name: "MySQL", level: 85, emoji: "🗃️" },
            { name: "MongoDB", level: 85, emoji: "🍃" },
            { name: "Redis", level: 80, emoji: "⚡" },
          ],
        },
        {
          key: "devops",
          title: "DevOps & Tools",
          skills: [
            { name: "Azure DevOps", level: 88, emoji: "☁️" },
            { name: "Docker", level: 85, emoji: "🐳" },
            { name: "Kubernetes", level: 78, emoji: "☸️" },
            { name: "Git", level: 92, emoji: "🌿" },
            { name: "CI/CD", level: 85, emoji: "🔁" },
          ],
        },
        {
          key: "design",
          title: "Diseño UX/UI",
          skills: [
            { name: "Figma", level: 95, emoji: "🎯" },
            { name: "Design Systems", level: 90, emoji: "🧩" },
            { name: "Prototipado", level: 88, emoji: "🪄" },
            { name: "User Research", level: 80, emoji: "🔍" },
          ],
        },
        {
          key: "teaching",
          title: "Docencia",
          skills: [
            { name: "Enseñanza de código", level: 95, emoji: "📚" },
            { name: "Mentoría 1:1", level: 92, emoji: "🤝" },
            { name: "Creación de cursos", level: 88, emoji: "🎓" },
            { name: "Oratoria / charlas", level: 85, emoji: "🎤" },
          ],
        },
      ] as SkillGroup[],
    },
    projects: {
      kicker: "my work",
      title: "Proyectos destacados",
      subtitle: "Una selección de la que estoy orgullosa — desde apps empresariales hasta proyectos personales.",
      enterprise: "Empresarial · privado",
      items: [
        {
          title: "Conecta",
          description:
            "Plataforma empresarial en Angular que lidero como Tech Lead de frontend — arquitectura, CI/CD con Azure DevOps y un sistema de componentes escalable.",
        },
        {
          title: "MovieView",
          description:
            "App para descubrir películas hecha con React + TypeScript, consumiendo una API de cine con búsqueda y vistas de detalle.",
        },
        {
          title: "Prueba Técnica NTT Data",
          description:
            "Reto técnico de frontend resuelto con TypeScript — arquitectura limpia, consumo de API e interfaz cuidada.",
        },
        {
          title: "Appnotitas",
          description:
            "App de notas hecha con Angular — crea, edita y organiza notas con una interfaz limpia y reactiva.",
        },
        {
          title: "KiiChain",
          description:
            "Contrato inteligente en Solidity con frontend en Next.js — mi inmersión en Web3 y desarrollo blockchain.",
        },
        {
          title: "Backend CRUD + JWT",
          description:
            "API REST con Node.js y Express: CRUD completo más autenticación con JWT y rutas protegidas.",
        },
      ],
    },
    contact: {
      kicker: "say hi",
      title: "Trabajemos juntas",
      text: "Cuéntame tu idea o proyecto, o solo salúdame. Respondo rápido y con muchas ganas.",
      form: {
        name: "Tu nombre",
        email: "Tu correo",
        message: "Tu mensaje",
        send: "Enviar mensaje",
        sending: "Enviando...",
        thanks: "¡Gracias!",
        success: "¡Mensaje enviado! Te respondo muy pronto.",
        error: "Algo falló. Prueba con WhatsApp o el correo de abajo.",
        orEmail: "o escríbeme directo:",
      },
      quick: "Contacto rápido",
      orForm: "o envíame un mensaje",
      prefill: "Hola Camila, vi tu portafolio y me encantaría conversar.",
    },
    footer: {
      made: "Hecho con Next.js y Tailwind",
      coffee: "",
      tagline: "stay kawaii · keep coding",
    },
    music: {
      play: "Poner música lofi",
      pause: "Pausar música",
      hint: "Pon tu pista en public/music/lofi.mp3",
    },
    cv: {
      labels: {
        profile: "Perfil",
        experience: "Experiencia",
        education: "Educación",
        skills: "Habilidades",
        projects: "Proyectos",
        contact: "Contacto",
        languages: "Idiomas",
      },
      languages: ["Español (nativo)", "Inglés (profesional)"],
      experience: [
        {
          role: "Senior Frontend Developer · Tech Lead",
          company: "Fondo de Empleados Cavipetrol",
          period: "Sept 2025 — Actualidad",
          bullets: [
            "Tech Lead de frontend de Conecta, una app empresarial en Angular — soy dueña de la arquitectura, la visión técnica y la entrega.",
            "Lidero y mentoreo al equipo de frontend; impulso las ceremonias ágiles y los code reviews para mantener un código escalable y de calidad.",
            "Diseño y mantengo pipelines CI/CD con Azure DevOps (builds, pruebas y despliegues) y los flujos de ramas y releases.",
          ],
        },
        {
          role: "Profesora de Desarrollo de Software",
          company: "BIT — Bogotá Institute of Technology",
          period: "May 2023 — Actualidad",
          bullets: [
            "Enseño HTML, CSS, JavaScript, React y PHP, dando a más de 200 estudiantes habilidades versátiles y listas para el trabajo.",
          ],
        },
        {
          role: "Backend Developer",
          company: "Osnet Wireless",
          period: "Ene 2025 — Sept 2025",
          bullets: [
            "Construí APIs y microservicios escalables y de alto rendimiento con Golang y Node.js (concurrencia, workers, event-driven).",
            "Trabajé con MongoDB, PostgreSQL y Redis, además de RabbitMQ/Kafka; desplegué con Docker, Kubernetes y CI/CD.",
            "Apliqué Clean Code, DDD y SOLID para sistemas mantenibles y seguros.",
          ],
        },
        {
          role: "Frontend Developer",
          company: "Osnet Wireless",
          period: "Mar 2024 — Sept 2025",
          bullets: [
            "Desarrollé aplicaciones web frontend con Next.js y Angular (con Docker), creando y manteniendo soluciones para clientes.",
          ],
        },
        {
          role: "Desarrolladora de Software Junior",
          company: "Empresa de software",
          period: "Jun 2022 — Mar 2024",
          bullets: [
            "Construí apps con React.js, TypeScript y Redux y backend en Node.js; trabajé en Scrum y diseñé interfaces en Figma.",
          ],
        },
        {
          role: "Diseñadora Gráfica Freelance",
          company: "Independiente",
          period: "Oct 2019 — Jul 2023",
          bullets: [
            "Diseñé identidad de marca y piezas gráficas para clientes con Adobe Illustrator.",
          ],
        },
      ],
      education: [
        { title: "Ingeniería de Software", place: "Politécnico Grancolombiano", period: "Feb 2023 — Dic 2025" },
        { title: "Tecnóloga en Desarrollo de Software", place: "SENA", period: "Nov 2022 — Nov 2025" },
        { title: "Técnica en Programación · Python, Java, SQL", place: "Universidad Autónoma de Bucaramanga", period: "2022" },
        { title: "Bootcamp Fullstack · Angular, Node.js, MongoDB", place: "BIT — Bogotá Institute of Technology", period: "2021 — 2022" },
        { title: "Front End & Diseño UX/UI", place: "Platzi", period: "Jun 2021 — Actualidad" },
        { title: "Diseño Gráfico", place: "Universidad Santo Tomás", period: "2017 — 2021" },
      ],
    },
    marquee: [
      "React", "Next.js", "Angular", "TypeScript", "Node.js", "C#", "Golang",
      "SQL", "NoSQL", "MongoDB", "Tailwind", "Bootstrap", "Figma",
      "UX Research", "Design Systems", "Docencia", "GraphQL", "Accesibilidad",
    ],
    langButton: "EN",
  },
};

// ---------- Selector: arma el contenido del idioma activo ----------
export function getContent(lang: Lang) {
  const d = dictionaries[lang];
  // Combina la base neutral de proyectos con el texto traducido
  const projects: Project[] = projectsBase.map((base, i) => ({
    ...base,
    title: d.projects.items[i].title,
    description: d.projects.items[i].description,
  }));

  return {
    nav: d.nav,
    ui: d.ui,
    about: d.about,
    skills: d.skills,
    projects: { ...d.projects, items: projects },
    contact: d.contact,
    footer: d.footer,
    music: d.music,
    cv: d.cv,
    marquee: d.marquee,
    langButton: d.langButton,
  };
}
