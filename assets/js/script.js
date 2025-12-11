// Projetos Data
const landingPages = [
  {
    id: 1,
    title: "Gym Products",
    category: "ecommerce",
    categories: ["E-commerce", "Fitness"],
    description: "Landing page moderna para produtos de academia com design profissional e foco em conversão.",
    link: "https://lp-gym-iota.vercel.app/",
    badge: "Novo",
    color: "#ff6b35",
    image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 2,
    title: "Bianca Santana",
    category: "portfolio",
    categories: ["Portfólio", "Design"],
    description: "Site portfólio profissional para designer de interiores com apresentação de serviços, projetos e experiência.",
    link: "https://www.biancassantana.com.br/",
    color: "#8B6F47",
    image: "./assets/images/bianca-santana.png",
  },
  {
    id: 3,
    title: "Todo List",
    category: "saas",
    categories: ["ReactJS", "Aplicação Web"],
    description: "Aplicação web de lista de tarefas desenvolvida em ReactJS e TypeScript com interface moderna e funcional.",
    link: "https://todo-list-reactjs-ts-git-main-vinioliveirar.vercel.app/",
    color: "#6366f1",
    image: "./assets/images/todo-list.png",
  },
  {
    id: 4,
    title: "Pomodoro Timer PWA",
    category: "saas",
    categories: ["PWA", "Produtividade"],
    description: "Aplicação PWA de Pomodoro Timer com lista de tarefas integrada, design moderno e funcionalidades completas de produtividade.",
    link: "https://pomodorotimer-pwa.netlify.app/",
    color: "#4f46e5",
    image: "./assets/images/pomodoro-timer.png",
  },
  {
    id: 5,
    title: "Gerador de Orçamentos",
    category: "business",
    categories: ["Aplicação Web", "Negócios"],
    description: "Sistema completo para geração de orçamentos online com criação de PDF customizado, gestão de produtos e informações do cliente.",
    link: "https://gerador-de-orcamento-blank.vercel.app/",
    color: "#2563eb",
    image: "./assets/images/gerador-orcamento.png",
  },
];

let currentFilter = "all";

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderStats();
  renderFilters();
  renderCards();
  setupFilters();
  setupScrollTop();
  setupThemeToggle();
  setupScrollReveal();
  setupMagneticCards();
  setupAnimatedCounter();
  setupMagneticCodeWindow();
});

// Render stats
function renderStats() {
  const statsContainer = document.getElementById("statsGrid");
  if (!statsContainer) return;

  const totalLPs = landingPages.length;
  const categories = new Set(landingPages.map((lp) => lp.category)).size;

  statsContainer.innerHTML = `
    <div class="stat-item">
      <span class="stat-number">${totalLPs}</span>
      <span class="stat-label">Projetos</span>
    </div>
    <div class="stat-item">
      <span class="stat-number">${categories}</span>
      <span class="stat-label">Categorias</span>
    </div>
    <div class="stat-item">
      <span class="stat-number">100%</span>
      <span class="stat-label">Responsivo</span>
    </div>
    <div class="stat-item">
      <span class="stat-number">∞</span>
      <span class="stat-label">Em Expansão</span>
    </div>
  `;
}

// Generate filters dynamically based on project categories
function renderFilters() {
  const filtersContainer = document.querySelector(".filters");
  if (!filtersContainer) return;

  // Get all unique categories from projects
  const allCategories = new Set();
  landingPages.forEach((lp) => {
    if (lp.category) {
      allCategories.add(lp.category);
    }
  });

  // Map category keys to display names
  const categoryNames = {
    all: "Todas",
    business: "Negócios",
    ecommerce: "E-commerce",
    portfolio: "Portfólio",
    saas: "SAAS",
    landing: "Landing",
    onepage: "One-Page",
    creative: "Criativo",
    health: "Saúde",
    food: "Comida",
    travel: "Viagem",
    events: "Eventos",
    fitness: "Fitness",
  };

  // Create filter buttons
  const filterRow = document.createElement("div");
  filterRow.className = "filter-row";

  // Always add "Todas" button
  const allBtn = document.createElement("button");
  allBtn.className = "filter-btn active";
  allBtn.dataset.filter = "all";
  allBtn.textContent = "Todas";
  filterRow.appendChild(allBtn);

  // Add buttons for each category found in LPs
  Array.from(allCategories)
    .sort()
    .forEach((category) => {
      const btn = document.createElement("button");
      btn.className = "filter-btn";
      btn.dataset.filter = category;
      btn.textContent = categoryNames[category] || category;
      filterRow.appendChild(btn);
    });

  // Clear existing filters and add new ones
  filtersContainer.innerHTML = "";
  filtersContainer.appendChild(filterRow);
}

// Render cards
let isInitialLoad = true;

function renderCards() {
  const grid = document.getElementById("cardsGrid");
  const filtered = currentFilter === "all" ? landingPages : landingPages.filter((lp) => lp.category === currentFilter);

  // Animate out existing cards (skip on initial load)
  const existingCards = grid.querySelectorAll(".card");
  if (existingCards.length > 0 && !isInitialLoad) {
    existingCards.forEach((card, index) => {
      card.classList.add("fade-out");
    });

    // Wait for fade out animation to complete before updating content
    setTimeout(() => {
      updateCardsContent(grid, filtered);
    }, 300);
  } else {
    updateCardsContent(grid, filtered);
    isInitialLoad = false;
  }
}

function updateCardsContent(grid, filtered) {
  if (filtered.length === 0) {
    grid.innerHTML = '<div class="card-empty">Nenhum projeto encontrado nesta categoria.</div>';
    return;
  }

  grid.innerHTML = filtered
    .map(
      (lp, index) => `
    <div class="card" style="animation-delay: ${index * 0.05}s;" onclick="window.open('${lp.link}', '_blank')">
      <div class="card-preview" style="background-image: url('${lp.image || ""}'); background-size: cover; background-position: center; ${
        !lp.image ? `background: linear-gradient(135deg, ${lp.color} 0%, ${lp.color}dd 100%);` : ""
      }">
        ${!lp.image ? `<div class="card-preview-placeholder">${lp.title.charAt(0)}</div>` : ""}
      </div>
      <div class="card-content">
        <div class="card-header">
          <div>
            <div class="card-title">${lp.title}</div>
            <div class="card-categories">${lp.categories.join(", ")}</div>
          </div>
          ${lp.badge ? `<span class="card-badge">${lp.badge}</span>` : ""}
        </div>
        <div class="card-description">${lp.description}</div>
        <div class="card-footer">
          <a href="${lp.link}" class="card-link" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();">Ver LP →</a>
        </div>
      </div>
    </div>
  `
    )
    .join("");
  
  // Re-apply magnetic effect after cards are rendered
  setTimeout(() => {
    magneticCardsInitialized = false;
    setupMagneticCards();
  }, 100);
}

// Setup filters
function setupFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function(e) {
      // Prevent multiple rapid clicks
      if (this.classList.contains("active")) return;

      // Remove active class from all buttons with animation
      filterBtns.forEach((b) => {
        b.classList.remove("active");
      });

      // Add active class to clicked button with slight delay for smooth transition
      setTimeout(() => {
        btn.classList.add("active");
      }, 50);

      // Update current filter
      currentFilter = btn.dataset.filter;
      
      // Re-render cards with animation
      renderCards();
    });
  });
}

// Setup scroll to top
function setupScrollTop() {
  const scrollTopBtn = document.getElementById("scrollTop");

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Theme management
function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  } else if (prefersDark) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
}

function setupThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });
}

// Scroll Reveal Animation
function setupScrollReveal() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe stats
  const statItems = document.querySelectorAll(".stat-item");
  statItems.forEach((item) => observer.observe(item));

  // Observe section titles
  const sectionTitles = document.querySelectorAll(".section-title");
  sectionTitles.forEach((title) => observer.observe(title));
}

// Animated Counter for Stats
function setupAnimatedCounter() {
  const statNumbers = document.querySelectorAll(".stat-number");
  
  const observerOptions = {
    threshold: 0.5
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = "true";
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  statNumbers.forEach((stat) => {
    if (stat.textContent !== "∞" && stat.textContent !== "100%") {
      counterObserver.observe(stat);
    }
  });
}

function animateCounter(element) {
  const target = parseInt(element.textContent);
  const duration = 2000;
  const steps = 60;
  const increment = target / steps;
  let current = 0;
  const stepDuration = duration / steps;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, stepDuration);
}

// Magnetic Card Effect
let magneticCardsInitialized = false;

function setupMagneticCards() {
  const cards = document.querySelectorAll(".card");
  
  // Only add listeners if not already initialized
  if (magneticCardsInitialized) return;
  
  cards.forEach((card) => {
    if (card.dataset.magnetic === "true") return;
    card.dataset.magnetic = "true";
    
    card.addEventListener("mousemove", function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const moveX = (x - centerX) / 15;
      const moveY = (y - centerY) / 15;

      this.style.transform = `translateY(-8px) translateX(${moveX}px) translateY(${moveY}px) rotateX(${-moveY / 8}deg) rotateY(${moveX / 8}deg) scale(1.02)`;
      this.style.transition = "none";
    });

    card.addEventListener("mouseleave", function() {
      this.style.transform = "";
      this.style.transition = "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
    });
  });
  
  magneticCardsInitialized = true;
}

// Magnetic Code Window Effect
function setupMagneticCodeWindow() {
  const codeWindow = document.querySelector(".code-window");
  if (!codeWindow) return;

  codeWindow.addEventListener("mousemove", function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const moveX = (x - centerX) / 20;
    const moveY = (y - centerY) / 20;

    this.style.transform = `translateX(${moveX}px) translateY(${moveY}px) rotateX(${-moveY / 12}deg) rotateY(${moveX / 12}deg)`;
    this.style.transition = "none";
  });

  codeWindow.addEventListener("mouseleave", function() {
    this.style.transform = "";
    this.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
  });
}
