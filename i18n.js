/**
 * Site Beto — i18n (Internationalization Engine)
 * Handles PT-BR and EN bilingual translation switching dynamically.
 */

const translations = {
  pt: {
    // Navigation
    "nav.brand": "I'm Beto.",
    "nav.about": "Sobre mim",
    "nav.projects": "Cases & Projetos",
    "nav.contact": "Fale comigo",

    // Hero Section
    "hero.badge": "Product Design & UX Leadership",
    "hero.title_start": "Transformando problemas complexos em experiências digitais intuitivas e de alto desempenho — ",
    "hero.title_accent": "com orgulho.",
    "hero.subtitle": "Designer de Produto Sênior focado em Design Systems, arquitetura de informação e soluções escaláveis para produtos de grande impacto.",
    "hero.watermark": "Product Designer",

    // Marquee Ticker
    "marquee.text1": "Mais de 20 sistemas end-to-end projetados",
    "marquee.text2": "Transformando necessidades de negócios em experiências intuitivas",
    "marquee.text3": "Design Systems escaláveis e documentação pronta para desenvolvimento",
    "marquee.text4": "Mais de 10 facilitações e dinâmicas de Discovery realizadas",

    // Bio & Stats (Card Bege)
    "bio.tag": "Sobre minha abordagem",
    "bio.quote": "Design não é apenas como algo se parece ou se sente. Design é sobre como algo realmente funciona no dia a dia do usuário.",
    "bio.author": "— Beto, Lead Product Designer",
    "stats.systems_num": "20+",
    "stats.systems_label": "Sistemas completos projetados do zero ao lançamento.",
    "stats.discovery_num": "10+",
    "stats.discovery_label": "Workshops de Discovery, teste com usuários e ideação.",
    "stats.leadership_num": "3+",
    "stats.leadership_label": "Anos liderando times de design e governança de Design Systems.",

    // Cases / Projects
    "projects.label": "Trabalhos Selecionados",
    "projects.headline": "Estudos de caso reais focados em impacto, clareza e valor de negócio.",

    "project.mulvipay.title": "Mulvipay — Plataforma de Pagamentos",
    "project.mulvipay.desc": "Reestruturação da experiência de checkout e dashboard financeiro. Simplificação da jornada do usuário e aumento na taxa de conversão de transações em 32%.",
    "project.mulvipay.tag1": "Fintech",
    "project.mulvipay.tag2": "Design System",
    "project.mulvipay.tag3": "UX/UI",

    "project.hellius.title": "Hellius — Design System & Dashboard",
    "project.hellius.desc": "Criação do ecossistema de componentes e tokens para suite de produtos enterprise. Redução de 45% no tempo de desenvolvimento front-end.",
    "project.hellius.tag1": "Enterprise",
    "project.hellius.tag2": "UI Kit",
    "project.hellius.tag3": "Component Library",

    "project.extract.title": "Extract — Gestão de Cronograma & Dependências",
    "project.extract.desc": "Arquitetura visual de dados complexos para gestão de projetos executivos. Mapeamento claro de dependências e linha do tempo de entregas.",
    "project.extract.tag1": "SaaS",
    "project.extract.tag2": "Data Viz",
    "project.extract.tag3": "Workflow",

    "project.view_details": "Ver detalhes do case →",

    // Footer
    "footer.signoff": "Obrigado por ler sobre mim <span>:)</span>",
    "footer.rights": "© 2026 uxbeto. Todos os direitos reservados."
  },

  en: {
    // Navigation
    "nav.brand": "I'm Beto.",
    "nav.about": "About me",
    "nav.projects": "Cases & Projects",
    "nav.contact": "Talk to me",

    // Hero Section
    "hero.badge": "Product Design & UX Leadership",
    "hero.title_start": "Turning complex problems into intuitive, high-performing digital experiences — ",
    "hero.title_accent": "with pride.",
    "hero.subtitle": "Senior Product Designer focused on Design Systems, information architecture, and scalable solutions for high-impact products.",
    "hero.watermark": "Product Designer",

    // Marquee Ticker
    "marquee.text1": "Designed 20+ end-to-end systems from strategy to launch",
    "marquee.text2": "Transforming complex business needs into intuitive experiences",
    "marquee.text3": "Scalable Design Systems & implementation-ready documentation",
    "marquee.text4": "10+ Discovery facilitations and user research workshops",

    // Bio & Stats (Warm Beige Card)
    "bio.tag": "About my approach",
    "bio.quote": "Design is not just what it looks like and feels like. Design is how it actually works in the user's daily life.",
    "bio.author": "— Beto, Lead Product Designer",
    "stats.systems_num": "20+",
    "stats.systems_label": "End-to-end systems designed from scratch to launch.",
    "stats.discovery_num": "10+",
    "stats.discovery_label": "Discovery workshops, user testing, and ideation sessions.",
    "stats.leadership_num": "3+",
    "stats.leadership_label": "Years leading design teams and Design System governance.",

    // Cases / Projects
    "projects.label": "Selected Work",
    "projects.headline": "Real-world case studies focused on impact, clarity, and business value.",

    "project.mulvipay.title": "Mulvipay — Payment Platform",
    "project.mulvipay.desc": "Restructuring of the checkout experience and financial dashboard. Streamlined user journey resulting in a 32% increase in transaction conversion rate.",
    "project.mulvipay.tag1": "Fintech",
    "project.mulvipay.tag2": "Design System",
    "project.mulvipay.tag3": "UX/UI",

    "project.hellius.title": "Hellius — Design System & Dashboard",
    "project.hellius.desc": "Creation of component ecosystem and design tokens for an enterprise product suite. Reduced front-end development time by 45%.",
    "project.hellius.tag1": "Enterprise",
    "project.hellius.tag2": "UI Kit",
    "project.hellius.tag3": "Component Library",

    "project.extract.title": "Extract — Schedule & Dependency Management",
    "project.extract.desc": "Visual architecture for complex data in executive project management. Clear mapping of deliverables, timelines, and inter-dependencies.",
    "project.extract.tag1": "SaaS",
    "project.extract.tag2": "Data Viz",
    "project.extract.tag3": "Workflow",

    "project.view_details": "View case details →",

    // Footer
    "footer.signoff": "tks to read about me <span>:)</span>",
    "footer.rights": "© 2026 uxbeto. All rights reserved."
  }
};

class I18nManager {
  constructor() {
    this.currentLang = localStorage.getItem('site_lang') || this.detectBrowserLang();
  }

  detectBrowserLang() {
    const lang = navigator.language || navigator.userLanguage;
    return lang.startsWith('pt') ? 'pt' : 'en';
  }

  setLanguage(lang) {
    if (!translations[lang]) return;
    this.currentLang = lang;
    localStorage.setItem('site_lang', lang);
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    this.updateDOM();
    this.updateSwitcherButtons();
  }

  t(key) {
    return translations[this.currentLang][key] || key;
  }

  updateDOM() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = this.t(key);
      
      if (el.hasAttribute('data-i18n-html')) {
        el.innerHTML = translation;
      } else {
        el.textContent = translation;
      }
    });
  }

  updateSwitcherButtons() {
    const btns = document.querySelectorAll('.lang-btn');
    btns.forEach(btn => {
      const lang = btn.getAttribute('data-lang');
      btn.classList.toggle('active', lang === this.currentLang);
    });
  }

  init() {
    this.setLanguage(this.currentLang);

    // Event listeners for language switcher buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        this.setLanguage(lang);
      });
    });
  }
}

// Global instance
window.i18n = new I18nManager();
document.addEventListener('DOMContentLoaded', () => {
  window.i18n.init();
});
